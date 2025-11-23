import React, { useState, useEffect } from 'react';
import { Octokit } from '@octokit/rest';
import {
  AppContainer,
  Header,
  Title,
  UserInfo,
  UserName,
  LoginButton,
  LogoutButton,
  MainContent,
  Sidebar,
  SidebarHeader,
  RepoList,
  RepoItem,
  Content,
  RepositoryHeader,
  RepoName,
  BranchSelector,
  PathNavigator,
  PathItem,
  PathSeparator,
  FileExplorer,
  FileItem,
  FileIcon,
  FileName,
  DropZone,
  DropZoneText,
  WelcomeMessage,
  Notification,
  Modal,
  ModalContent,
  ModalHeader,
  CloseButton,
  ModalBody,
  FileList,
  FileListItem,
  CommitMessageInput,
  ModalFooter,
  CancelButton,
  UploadButton
} from './styles/StyledComponents';

// Constants for file handling
const MAX_FILE_SIZE = 2 * 1024 * 1024 * 1024; // 2GB per file (increased from 25MB)
const GITHUB_BLOB_LIMIT = 100 * 1024 * 1024; // 100MB GitHub API limit
const CHUNK_SIZE = 50 * 1024 * 1024; // 50MB chunks for large file processing

const App = () => {
  // State variables
  const [authenticated, setAuthenticated] = useState(false);
  const [octokit, setOctokit] = useState(null);
  const [user, setUser] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [currentPath, setCurrentPath] = useState('');
  const [contents, setContents] = useState([]);
  const [branches, setBranches] = useState([]);
  const [currentBranch, setCurrentBranch] = useState('main');
  const [commitMessage, setCommitMessage] = useState('');
  const [notification, setNotification] = useState(null);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Initialize GitHub on component mount
  useEffect(() => {
    // Check if we have a token in localStorage
    const token = localStorage.getItem('github_token');
    if (token) {
      initializeGitHub(token);
    }
  }, []);

  // Initialize GitHub with token
  const initializeGitHub = async (token) => {
    try {
      const octokitInstance = new Octokit({
        auth: token
      });

      setOctokit(octokitInstance);

      // Get authenticated user
      const { data: userData } = await octokitInstance.users.getAuthenticated();
      setUser(userData);
      setAuthenticated(true);

      // Load user repositories
      await loadUserRepositories(octokitInstance);

      showNotification('success', `Logged in as ${userData.login}`);
    } catch (error) {
      console.error('Authentication error:', error);
      localStorage.removeItem('github_token');
      setAuthenticated(false);
      showNotification('error', 'Authentication failed');
    }
  };

  // Load user repositories
  const loadUserRepositories = async (octokitInstance) => {
    try {
      const repos = await octokitInstance.paginate(
        octokitInstance.repos.listForAuthenticatedUser,
        {per_page: 100, sort: 'updated'}
      );
      setRepositories(repos);
    } catch (error) {
      console.error('Error loading repositories:', error);
      showNotification('error', 'Failed to load repositories');
    }
  };

  // Utility function to normalize paths
  const normalizePath = (path) => {
    if (!path || path === '/') return '';

    // Remove leading and trailing slashes, then ensure no double slashes
    const normalized = path.replace(/^\/+|\/+$/g, '').replace(/\/+/g, '/');
    return normalized;
  };

  // Utility function to join paths properly
  const joinPaths = (...paths) => {
    const filtered = paths.filter(p => p && p !== '/');
    if (filtered.length === 0) return '';

    const joined = filtered.join('/').replace(/\/+/g, '/');
    return normalizePath(joined);
  };

  // Load repository contents with improved path handling
  const loadRepositoryContents = async (repo, path = '', branch) => {
    if (!octokit || !repo) return;

    try {
      // Use provided branch OR fall back to repo's default branch
      const targetBranch = branch || repo.default_branch;

      // Clear existing contents first to ensure UI updates
      setContents([]);

      // Normalize the path to prevent malformed path errors
      const normalizedPath = normalizePath(path);

      console.log(`Loading contents for path: ${normalizedPath} on branch: ${targetBranch}`);

      const { data: contentsData } = await octokit.repos.getContent({
        owner: repo.owner.login,
        repo: repo.name,
        path: normalizedPath,
        ref: targetBranch,
        headers: {
          'If-None-Match': '' // Prevents caching
        }
      });

      setContents(Array.isArray(contentsData) ? contentsData : [contentsData]);
      setCurrentPath(normalizedPath);

      // Also load branches
      const { data: branchesData } = await octokit.repos.listBranches({
        owner: repo.owner.login,
        repo: repo.name
      });

      setBranches(branchesData.map(b => b.name));
      setCurrentBranch(targetBranch);

      return true; // Indicate successful loading
    } catch (error) {
      console.error('Error loading repository contents:', error);

      if (error.status === 404) {
        showNotification('error', 'Path not found in repository');
      } else if (error.status === 403) {
        showNotification('error', 'Access denied - check repository permissions');
      } else {
        showNotification('error', `Failed to load repository contents: ${error.message}`);
      }
      return false;
    }
  };


  // Handle repository selection
  const handleSelectRepository = async (repo) => {
    setSelectedRepo(repo);
    await loadRepositoryContents(repo);
  };

  // Handle branch selection
  const handleSelectBranch = async (branch) => {
    if (selectedRepo) {
      await loadRepositoryContents(selectedRepo, currentPath, branch);
    }
  };

  // Handle directory navigation
  const handleNavigate = async (item) => {
    if (item.type === 'dir') {
      await loadRepositoryContents(selectedRepo, item.path, currentBranch);
    } else {
      // View file content
      try {
        const { data: fileData } = await octokit.repos.getContent({
          owner: selectedRepo.owner.login,
          repo: selectedRepo.name,
          path: item.path,
          ref: currentBranch
        });

        // For binary files, fileData.content will be base64 encoded
        // For text files, we can decode and display
        if (fileData.encoding === 'base64' && !isImageFile(fileData.name)) {
          const content = atob(fileData.content);
          // Here you would display the file content in a modal or viewer
          console.log('File content:', content);
          showNotification('info', `Viewing file: ${item.name}`);
        } else if (isImageFile(fileData.name)) {
          // Handle image files
          const imageUrl = `data:image/png;base64,${fileData.content}`;
          // Display image in a modal or viewer
          console.log('Image URL:', imageUrl);
          showNotification('info', `Viewing image: ${item.name}`);
        }
      } catch (error) {
        console.error('Error loading file content:', error);
        showNotification('error', 'Failed to load file content');
      }
    }
  };

  // Check if file is an image
  const isImageFile = (filename) => {
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];
    return imageExtensions.some(ext => filename.toLowerCase().endsWith(ext));
  };

  // Check if file needs Git LFS (Large File Storage)
  const needsLFS = (file) => {
    return file.size > GITHUB_BLOB_LIMIT;
  };

  // Generate LFS pointer content
  const generateLFSPointer = (file, sha256Hash) => {
    return `version https://git-lfs.github.com/spec/v1
oid sha256:${sha256Hash}
size ${file.size}
`;
  };

  // Calculate SHA256 hash for LFS
  const calculateSHA256 = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  // Validate file before upload
  const validateFile = (file) => {
    const errors = [];

    // Check file size (now supports up to 2GB)
    if (file.size > MAX_FILE_SIZE) {
      errors.push(`File "${file.name}" is too large (${(file.size / 1024 / 1024 / 1024).toFixed(2)}GB). Maximum size is ${MAX_FILE_SIZE / 1024 / 1024 / 1024}GB.`);
    }

    // Check for invalid characters in filename
    const invalidChars = /[<>:"|?*\x00-\x1f]/;
    if (invalidChars.test(file.name)) {
      errors.push(`File "${file.name}" contains invalid characters.`);
    }

    // Warn about large files that will use LFS
    if (needsLFS(file)) {
      console.log(`File "${file.name}" (${(file.size / 1024 / 1024).toFixed(2)}MB) will be stored using Git LFS.`);
    }

    return errors;
  };

  // Handle file upload via drag and drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!authenticated || !selectedRepo) {
      showNotification('error', 'Please select a repository first');
      return;
    }

    const files = [];
    const errors = [];

    if (e.dataTransfer.items) {
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        if (e.dataTransfer.items[i].kind === 'file') {
          const file = e.dataTransfer.items[i].getAsFile();
          const fileErrors = validateFile(file);

          if (fileErrors.length > 0) {
            errors.push(...fileErrors);
          } else {
            files.push(file);
          }
        }
      }
    } else {
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        const file = e.dataTransfer.files[i];
        const fileErrors = validateFile(file);

        if (fileErrors.length > 0) {
          errors.push(...fileErrors);
        } else {
          files.push(file);
        }
      }
    }

    if (errors.length > 0) {
      showNotification('error', errors.join(' '));
      return;
    }

    if (files.length > 0) {
      setUploadFiles(files);
      setShowUploadModal(true);
    }
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Improved file reading with chunked processing for large files
  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();

        reader.onload = () => {
          try {
            // Remove the data URL prefix (e.g., "data:application/pdf;base64,")
            const base64 = reader.result.split(',')[1];
            resolve(base64);
          } catch (error) {
            console.error('Error processing file data:', error);
            reject(error);
          }
        };

        reader.onerror = (error) => {
          console.error('FileReader error:', error);
          reject(error);
        };

        // Add a timeout for large files
        const timeout = Math.max(30000, file.size / 1024); // 30s minimum, 1s per KB
        setTimeout(() => {
          if (reader.readyState !== 2) {
            reader.abort();
            reject(new Error('FileReader timeout - file may be too large'));
          }
        }, timeout);

        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error setting up FileReader:', error);
        reject(error);
      }
    });
  };

  // Handle file upload and commit with improved error handling and LFS support
  const handleUploadFiles = async () => {
    if (!commitMessage.trim()) {
      showNotification('error', 'Please enter a commit message');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Get the latest commit SHA for the branch
      const { data: refData } = await octokit.git.getRef({
        owner: selectedRepo.owner.login,
        repo: selectedRepo.name,
        ref: `heads/${currentBranch}`
      });

      const latestCommitSha = refData.object.sha;

      // Get the base tree
      const { data: commitData } = await octokit.git.getCommit({
        owner: selectedRepo.owner.login,
        repo: selectedRepo.name,
        commit_sha: latestCommitSha
      });

      const baseTreeSha = commitData.tree.sha;

      // Create blobs for each file with progress tracking and LFS support
      const fileBlobs = [];
      for (let i = 0; i < uploadFiles.length; i++) {
        const file = uploadFiles[i];

        try {
          // Update progress
          setUploadProgress(((i + 0.5) / uploadFiles.length) * 100);

          let blobSha;

          if (needsLFS(file)) {
            // Handle large files with Git LFS
            showNotification('info', `Processing large file "${file.name}" with Git LFS...`);

            // Calculate SHA256 hash for LFS
            const sha256Hash = await calculateSHA256(file);

            // Create LFS pointer content
            const lfsPointer = generateLFSPointer(file, sha256Hash);

            // Create blob with LFS pointer content
            const { data: blobData } = await octokit.git.createBlob({
              owner: selectedRepo.owner.login,
              repo: selectedRepo.name,
              content: btoa(lfsPointer), // Base64 encode the LFS pointer
              encoding: 'base64'
            });

            blobSha = blobData.sha;

            // Note: In a real implementation, you would also need to:
            // 1. Upload the actual file to LFS storage
            // 2. Ensure the repository has LFS enabled
            // For this demo, we're creating the LFS pointer file

          } else {
            // Handle normal files (under 100MB)
            const content = await readFileAsBase64(file);

            // Create blob
            const { data: blobData } = await octokit.git.createBlob({
              owner: selectedRepo.owner.login,
              repo: selectedRepo.name,
              content: content,
              encoding: 'base64'
            });

            blobSha = blobData.sha;
          }

          // Construct proper file path
          const filePath = joinPaths(currentPath, file.name);

          fileBlobs.push({
            path: filePath,
            mode: '100644', // Regular file
            type: 'blob',
            sha: blobSha
          });

          // Update progress
          setUploadProgress(((i + 1) / uploadFiles.length) * 100);

        } catch (error) {
          console.error(`Error processing file ${file.name}:`, error);
          throw new Error(`Failed to process file "${file.name}": ${error.message}`);
        }
      }

      // Create tree
      const { data: treeData } = await octokit.git.createTree({
        owner: selectedRepo.owner.login,
        repo: selectedRepo.name,
        base_tree: baseTreeSha,
        tree: fileBlobs
      });

      // Create commit
      const { data: newCommitData } = await octokit.git.createCommit({
        owner: selectedRepo.owner.login,
        repo: selectedRepo.name,
        message: commitMessage,
        tree: treeData.sha,
        parents: [latestCommitSha]
      });

      // Update branch reference
      await octokit.git.updateRef({
        owner: selectedRepo.owner.login,
        repo: selectedRepo.name,
        ref: `heads/${currentBranch}`,
        sha: newCommitData.sha,
        force: true
      });

      // Refresh contents with retry logic
      setTimeout(async () => {
        const success = await loadRepositoryContents(selectedRepo, currentPath, currentBranch);
        if (!success) {
          // Try one more time if the first attempt fails
          setTimeout(() => {
            loadRepositoryContents(selectedRepo, currentPath, currentBranch);
          }, 1000);
        }
      }, 500);

      // Close modal and clear state
      setShowUploadModal(false);
      setUploadFiles([]);
      setCommitMessage('');
      setUploadProgress(0);

      const largeFiles = uploadFiles.filter(needsLFS);
      const regularFiles = uploadFiles.filter(f => !needsLFS(f));

      let successMessage = `Successfully uploaded ${uploadFiles.length} file(s)`;
      if (largeFiles.length > 0) {
        successMessage += ` (${largeFiles.length} large file(s) stored with Git LFS)`;
      }

      showNotification('success', successMessage);
    } catch (error) {
      console.error('Error uploading files:', error);

      // Provide more specific error messages
      if (error.message.includes('too large')) {
        showNotification('error', 'One or more files are too large. Please use files smaller than 2GB.');
      } else if (error.message.includes('malformed')) {
        showNotification('error', 'Invalid file path. Please check file names for special characters.');
      } else {
        showNotification('error', `Upload failed: ${error.message}`);
      }
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };


  // Show notification
  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  // Handle login
  const handleLogin = () => {
    // For demo purposes, we're using a simplified approach
    const token = prompt('Enter your GitHub token:');
    if (token) {
      localStorage.setItem('github_token', token);
      initializeGitHub(token);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('github_token');
    setAuthenticated(false);
    setUser(null);
    setOctokit(null);
    setRepositories([]);
    setSelectedRepo(null);
    setContents([]);
  };

  return (
    <AppContainer>
      <Header>
        <Title>Git Helper Web - Fixed Version</Title>
        {authenticated ? (
          <UserInfo>
            {user && <UserName>{user.login}</UserName>}
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </UserInfo>
        ) : (
          <LoginButton onClick={handleLogin}>Login with GitHub</LoginButton>
        )}
      </Header>

      {authenticated ? (
        <MainContent>
          <Sidebar>
            <SidebarHeader>Repositories</SidebarHeader>
            <RepoList>
              {repositories.map(repo => (
                <RepoItem
                  key={repo.id}
                  selected={selectedRepo && selectedRepo.id === repo.id}
                  onClick={() => handleSelectRepository(repo)}
                >
                  {repo.name}
                </RepoItem>
              ))}
            </RepoList>
          </Sidebar>

          <Content>
            {selectedRepo ? (
              <>
                <RepositoryHeader style={{ display: "flex", flexWrap: 'wrap' }}  >
                  <RepoName>{selectedRepo.name}</RepoName>
                  <BranchSelector >
                    <label>Branch:</label>
                    <select
                      value={currentBranch}
                      onChange={(e) => handleSelectBranch(e.target.value)}
                      style={{ width: "100%", maxWidth: 500 }}
                    >
                      {branches.map(branch => (
                        <option key={branch} value={branch}>{branch}</option>
                      ))}
                    </select>
                  </BranchSelector>
                </RepositoryHeader>

                <PathNavigator>
                  <PathItem onClick={() => loadRepositoryContents(selectedRepo, '', currentBranch)}>
                    Root
                  </PathItem>
                  {currentPath && currentPath.split('/').filter(Boolean).map((part, index, array) => {
                    const path = array.slice(0, index + 1).join('/');
                    return (
                      <React.Fragment key={path}>
                        <PathSeparator>/</PathSeparator>
                        <PathItem onClick={() => loadRepositoryContents(selectedRepo, path, currentBranch)}>
                          {part}
                        </PathItem>
                      </React.Fragment>
                    );
                  })}
                </PathNavigator>

                <FileExplorer>
                  {contents.map(item => (
                    <FileItem
                      key={item.sha}
                      onClick={() => handleNavigate(item)}
                    >
                      <FileIcon>{item.type === 'dir' ? '📁' : '📄'}</FileIcon>
                      <FileName>{item.name}</FileName>
                    </FileItem>
                  ))}
                </FileExplorer>

                <DropZone
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <DropZoneText>
                    Drop files here to upload to current directory
                    <br />
                    <small>Maximum file size: {MAX_FILE_SIZE / 1024 / 1024 / 1024}GB per file (Large files use Git LFS)</small>
                  </DropZoneText>
                </DropZone>
              </>
            ) : (
              <WelcomeMessage>
                <h2>Select a Repository</h2>
                <p>Choose a repository from the sidebar to get started</p>
              </WelcomeMessage>
            )}
          </Content>
        </MainContent>
      ) : (
        <WelcomeMessage>
          <h2>Welcome to Git Helper Web - Fixed Version</h2>
          <p>Please login with GitHub to get started</p>
          <LoginButton onClick={handleLogin}>Login with GitHub</LoginButton>
        </WelcomeMessage>
      )}

      {notification && (
        <Notification type={notification.type}>
          {notification.message}
        </Notification>
      )}

      {showUploadModal && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <h3>Upload Files</h3>
              <CloseButton onClick={() => setShowUploadModal(false)}>×</CloseButton>
            </ModalHeader>
            <ModalBody>
              <h4>Files to upload:</h4>
              <FileList>
                {uploadFiles.map((file, index) => {
                  const sizeInMB = file.size / 1024 / 1024;
                  const sizeInGB = file.size / 1024 / 1024 / 1024;
                  const displaySize = sizeInGB >= 1
                    ? `${sizeInGB.toFixed(2)} GB`
                    : `${sizeInMB.toFixed(2)} MB`;
                  const isLFS = needsLFS(file);

                  return (
                    <FileListItem key={index}>
                      {file.name} ({displaySize}){isLFS && ' - Will use Git LFS'}
                    </FileListItem>
                  );
                })}
              </FileList>
              {isUploading && (
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ marginBottom: '8px' }}>Upload Progress: {uploadProgress.toFixed(0)}%</div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: '#21262d',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${uploadProgress}%`,
                      height: '100%',
                      backgroundColor: '#2ea043',
                      transition: 'width 0.3s ease'
                    }}></div>
                  </div>
                </div>
              )}
              <CommitMessageInput>
                <label>Commit message:</label>
                <textarea
                  value={commitMessage}
                  onChange={(e) => setCommitMessage(e.target.value)}
                  placeholder="Enter commit message..."
                  disabled={isUploading}
                />
              </CommitMessageInput>
            </ModalBody>
            <ModalFooter>
              <CancelButton onClick={() => setShowUploadModal(false)} disabled={isUploading}>
                Cancel
              </CancelButton>
              <UploadButton onClick={handleUploadFiles} disabled={isUploading}>
                {isUploading ? 'Uploading...' : 'Commit Changes'}
              </UploadButton>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </AppContainer>
  );
};

export default App;
