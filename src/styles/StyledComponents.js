import styled from 'styled-components';

// App Container and Layout
export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: #0d1117;
  color: #c9d1d9;
`;

export const MainContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

export const Content = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #0d1117;
  color: #c9d1d9;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

// Header Components
export const Header = styled.header`
  background-color: #24292e;
  color: white;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 20px;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const UserAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

export const UserName = styled.span`
  font-weight: 500;
`;

// Button Components
export const LoginButton = styled.button`
  background-color: #2ea44f;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: #2c974b;
  }
`;

export const LogoutButton = styled.button`
  background-color: transparent;
  color: #c9d1d9;
  border: 1px solid #30363d;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 12px;
  cursor: pointer;
  
  &:hover {
    background-color: #30363d;
  }
`;

export const CancelButton = styled.button`
  background-color: transparent;
  color: #c9d1d9;
  border: 1px solid #30363d;
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
  
  &:hover {
    background-color: #21262d;
  }
`;

export const UploadButton = styled.button`
  background-color: #2ea44f;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
  
  &:hover {
    background-color: #2c974b;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #8b949e;
  cursor: pointer;
  
  &:hover {
    color: #c9d1d9;
  }
`;

// Sidebar Components
export const Sidebar = styled.div`
  width: 250px;
  background-color: #0d1117;
  color: #c9d1d9;
  border-right: 1px solid #30363d;
  overflow-y: auto;
`;

export const SidebarHeader = styled.h2`
  font-size: 16px;
  padding: 16px;
  margin: 0;
  border-bottom: 1px solid #30363d;
`;

export const RepoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const RepoItem = styled.li`
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #21262d;
  background-color: ${props => props.selected ? '#21262d' : 'transparent'};
  
  &:hover {
    background-color: #21262d;
  }
`;

// Repository Components
export const RepositoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const RepoName = styled.h2`
  margin: 0;
  font-size: 24px;
`;

export const BranchSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  select {
    padding: 8px;
    border-radius: 6px;
    background-color: #21262d;
    color: #c9d1d9;
    border: 1px solid #30363d;
  }
`;

// Path Navigation
export const PathNavigator = styled.div`
  display: flex;
  align-items: center;
  background-color: #161b22;
  padding: 8px 12px;
  border-radius: 6px;
  margin-bottom: 16px;
  overflow-x: auto;
  white-space: nowrap;
`;

export const PathItem = styled.span`
  cursor: pointer;
  color: #58a6ff;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const PathSeparator = styled.span`
  margin: 0 4px;
  color: #8b949e;
`;

// File Explorer
export const FileExplorer = styled.div`
  margin-bottom: 20px;
`;

export const FileItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-bottom: 1px solid #21262d;
  cursor: pointer;
  
  &:hover {
    background-color: #161b22;
  }
`;

export const FileIcon = styled.span`
  margin-right: 8px;
`;

export const FileName = styled.span``;

// Drag & Drop
export const DropZone = styled.div`
  border: 2px dashed #30363d;
  border-radius: 6px;
  padding: 40px;
  text-align: center;
  margin-top: auto;
  background-color: #161b22;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #58a6ff;
    background-color: rgba(56, 139, 253, 0.1);
  }
`;

export const DropZoneText = styled.p`
  margin: 0;
  color: #8b949e;
`;

// Welcome Message
export const WelcomeMessage = styled.div`
  text-align: center;
  padding: 40px;
  
  h2 {
    margin-top: 0;
  }
`;

// Notification
export const Notification = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 12px 16px;
  border-radius: 6px;
  color: white;
  font-weight: 500;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: ${props => props.type === 'success' ? '#2ea043' : props.type === 'info' ? '#58a6ff' : '#f85149'};
  z-index: 1000;
`;

// Modal Components
export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: #0d1117;
  border-radius: 6px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #30363d;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h3 {
    margin: 0;
  }
`;

export const ModalBody = styled.div`
  padding: 16px;
  max-height: 400px;
  overflow-y: auto;
`;

export const ModalFooter = styled.div`
  padding: 16px;
  border-top: 1px solid #30363d;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

// File List in Modal
export const FileList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 16px 0;
`;

export const FileListItem = styled.li`
  padding: 8px 0;
  border-bottom: 1px solid #21262d;
`;

// Commit Message Input
export const CommitMessageInput = styled.div`
  margin-top: 16px;
  
  label {
    display: block;
    margin-bottom: 8px;
  }
  
  textarea {
    width: 100%;
    height: 80px;
    padding: 8px;
    border-radius: 6px;
    background-color: #161b22;
    color: #c9d1d9;
    border: 1px solid #30363d;
    resize: vertical;
  }
`;
// Add these to StyledComponents.js if not already present
export const FilePreviewModal = styled(Modal)``;

export const FilePreviewContent = styled(ModalContent)`
  width: 80%;
  max-width: 1000px;
  max-height: 90vh;
`;

export const FilePreviewHeader = styled(ModalHeader)``;

export const FilePreviewBody = styled(ModalBody)`
  max-height: 70vh;
  overflow: auto;
  padding: 16px;
  background-color: #0d1117;
  border-radius: 6px;
  margin: 0 16px;
`;

export const CodeBlock = styled.pre`
  background-color: #161b22;
  border-radius: 6px;
  padding: 16px;
  overflow: auto;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 14px;
  line-height: 1.5;
  color: #c9d1d9;
  margin: 0;
`;

export const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 60vh;
  display: block;
  margin: 0 auto;
`;

