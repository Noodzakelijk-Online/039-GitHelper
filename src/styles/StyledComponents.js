import styled, { keyframes, css } from 'styled-components';

// Theme colors
const colors = {
  background: {
    primary: '#0d1117',
    secondary: '#161b22',
    tertiary: '#21262d',
    header: 'linear-gradient(to right, #24292e, #1a1f24)'
  },
  text: {
    primary: '#f0f6fc',
    secondary: '#c9d1d9',
    muted: '#8b949e'
  },
  border: {
    primary: '#30363d',
    secondary: '#21262d'
  },
  accent: {
    blue: '#58a6ff',
    green: '#2ea043',
    red: '#f85149',
    purple: '#8957e5',
    yellow: '#d29922'
  },
  button: {
    primary: 'linear-gradient(to bottom, #238636, #2ea043)',
    secondary: 'linear-gradient(to bottom, #30363d, #21262d)',
    hover: {
      primary: 'linear-gradient(to bottom, #2ea043, #238636)',
      secondary: 'linear-gradient(to bottom, #3c444d, #30363d)'
    }
  }
};

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(-10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(88, 166, 255, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(88, 166, 255, 0); }
  100% { box-shadow: 0 0 0 0 rgba(88, 166, 255, 0); }
`;

// Shared styles
const cardStyle = css`
  background-color: ${colors.background.secondary};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid ${colors.border.primary};
  transition: all 0.2s ease-in-out;
  
  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    border-color: ${colors.accent.blue};
  }
`;

const buttonBase = css`
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.3px;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(88, 166, 255, 0.4);
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

// App Container and Layout
export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: ${colors.background.primary};
  color: ${colors.text.secondary};
  animation: ${fadeIn} 0.3s ease-in-out;
  line-height: 1.5;
  letter-spacing: 0.2px;
`;

export const MainContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  animation: ${fadeIn} 0.4s ease-in-out;
`;

export const Content = styled.div`
  flex: 1;
  padding: 24px;
  background-color: ${colors.background.primary};
  color: ${colors.text.secondary};
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${colors.background.primary};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${colors.border.primary};
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: ${colors.border.secondary};
  }
`;

// Header Components
export const Header = styled.header`
  background: ${colors.background.header};
  color: ${colors.text.primary};
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  position: relative;
  z-index: 10;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 22px;
  font-weight: 600;
  background: linear-gradient(90deg, ${colors.text.primary}, ${colors.accent.blue});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  animation: ${slideIn} 0.3s ease-out;
`;

export const UserAvatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid ${colors.accent.blue};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
`;

export const UserName = styled.span`
  font-weight: 600;
  color: ${colors.text.primary};
`;

// Button Components
export const LoginButton = styled.button`
  ${buttonBase}
  background: ${colors.button.primary};
  color: white;
  border: none;
  padding: 10px 18px;
  font-size: 14px;
  
  &:hover {
    background: ${colors.button.hover.primary};
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  &::before {
    content: '🔒 ';
    margin-right: 6px;
  }
`;

export const LogoutButton = styled.button`
  ${buttonBase}
  background: transparent;
  color: ${colors.text.secondary};
  border: 1px solid ${colors.border.primary};
  padding: 8px 14px;
  font-size: 13px;
  
  &:hover {
    background-color: ${colors.background.tertiary};
    border-color: ${colors.accent.blue};
    color: ${colors.text.primary};
  }
`;

export const CancelButton = styled.button`
  ${buttonBase}
  background: ${colors.button.secondary};
  color: ${colors.text.secondary};
  border: 1px solid ${colors.border.primary};
  padding: 10px 16px;
  
  &:hover {
    background: ${colors.button.hover.secondary};
    color: ${colors.text.primary};
  }
`;

export const UploadButton = styled.button`
  ${buttonBase}
  background: ${colors.button.primary};
  color: white;
  border: none;
  padding: 10px 16px;
  
  &:hover {
    background: ${colors.button.hover.primary};
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  &::before {
    content: '⬆️ ';
    margin-right: 6px;
  }
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: ${colors.text.muted};
  cursor: pointer;
  transition: all 0.2s ease;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  
  &:hover {
    color: ${colors.text.primary};
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${colors.accent.blue};
  }
`;

// Sidebar Components
export const Sidebar = styled.div`
  width: 280px;
  background-color: ${colors.background.secondary};
  color: ${colors.text.secondary};
  border-right: 1px solid ${colors.border.primary};
  overflow-y: auto;
  transition: width 0.3s ease;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${colors.background.secondary};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${colors.border.primary};
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: ${colors.border.secondary};
  }
`;

export const SidebarHeader = styled.h2`
  font-size: 16px;
  padding: 20px;
  margin: 0;
  border-bottom: 1px solid ${colors.border.primary};
  color: ${colors.text.primary};
  font-weight: 600;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  
  &::before {
    content: '📚';
    margin-right: 8px;
    font-size: 18px;
  }
`;

export const RepoList = styled.ul`
  list-style: none;
  padding: 8px 0;
  margin: 0;
`;

export const RepoItem = styled.li`
  padding: 12px 20px;
  cursor: pointer;
  border-bottom: 1px solid ${colors.border.secondary};
  background-color: ${props => props.selected ? colors.background.tertiary : 'transparent'};
  transition: all 0.2s ease;
  position: relative;
  
  ${props => props.selected && `
    border-left: 3px solid ${colors.accent.blue};
    padding-left: 17px;
  `}
  
  &:hover {
    background-color: ${colors.background.tertiary};
  }
  
  &::before {
    content: '📁';
    margin-right: 8px;
    opacity: 0.8;
  }
  
  ${props => props.selected && `
    &::before {
      content: '📂';
      opacity: 1;
    }
  `}
`;

// Repository Components
export const RepositoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${colors.border.primary};
`;

export const RepoName = styled.h2`
  margin: 0;
  font-size: 28px;
  font-weight: 600;
  color: ${colors.text.primary};
  display: flex;
  align-items: center;
  
  &::before {
    content: '📂';
    margin-right: 12px;
    font-size: 24px;
  }
`;

export const BranchSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  
  label {
    color: ${colors.text.muted};
    font-size: 14px;
  }
  
  select {
    padding: 8px 12px;
    border-radius: 6px;
    background-color: ${colors.background.tertiary};
    color: ${colors.text.secondary};
    border: 1px solid ${colors.border.primary};
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%238b949e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 8px center;
    background-size: 16px;
    padding-right: 32px;
    
    &:hover, &:focus {
      border-color: ${colors.accent.blue};
      outline: none;
    }
  }
`;

// Path Navigation
export const PathNavigator = styled.div`
  display: flex;
  align-items: center;
  background-color: ${colors.background.secondary};
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  overflow-x: auto;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid ${colors.border.primary};
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${colors.border.primary};
    border-radius: 2px;
  }
`;

export const PathItem = styled.span`
  cursor: pointer;
  color: ${colors.accent.blue};
  transition: all 0.2s ease;
  font-weight: 500;
  
  &:hover {
    color: ${colors.text.primary};
    text-decoration: underline;
  }
`;

export const PathSeparator = styled.span`
  margin: 0 8px;
  color: ${colors.text.muted};
`;

// File Explorer
export const FileExplorer = styled.div`
  margin-bottom: 20px;
  max-height: 500px; /* Set a maximum height to enable scrolling */
  overflow-y: auto; /* Enable vertical scrolling */
  border-radius: 8px;
  border: 1px solid #30363d;
  background-color: #161b22;
  
  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #0d1117;
    border-radius: 0 8px 8px 0;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #30363d;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #58a6ff;
  }
`;


export const FileItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid ${colors.border.secondary};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: ${colors.background.tertiary};
    transform: translateX(4px);
  }
`;

export const FileIcon = styled.span`
  margin-right: 12px;
  font-size: 18px;
  opacity: 0.9;
  transition: all 0.2s ease;
  
  ${FileItem}:hover & {
    opacity: 1;
    transform: scale(1.1);
  }
`;

export const FileName = styled.span`
  font-weight: 500;
  transition: all 0.2s ease;
  
  ${FileItem}:hover & {
    color: ${colors.text.primary};
  }
`;

// Drag & Drop
export const DropZone = styled.div`
  border: 2px dashed ${colors.border.primary};
  border-radius: 10px;
  padding: 40px;
  text-align: center;
  margin-top: auto;
  background-color: ${colors.background.secondary};
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease-in-out;
  
  &:hover {
    border-color: ${colors.accent.blue};
    background-color: rgba(56, 139, 253, 0.1);
    animation: ${pulse} 2s infinite;
  }
`;

export const DropZoneText = styled.p`
  margin: 0;
  color: ${colors.text.muted};
  font-size: 16px;
  
  &::before {
    content: '📤';
    display: block;
    font-size: 32px;
    margin-bottom: 12px;
  }
  
  ${DropZone}:hover & {
    color: ${colors.text.primary};
  }
`;

// Welcome Message
export const WelcomeMessage = styled.div`
  text-align: center;
  padding: 60px 40px;
  max-width: 600px;
  margin: 40px auto;
  ${cardStyle}
  animation: ${fadeIn} 0.6s ease-in-out;
  
  h2 {
    margin-top: 0;
    font-size: 32px;
    margin-bottom: 16px;
    color: ${colors.text.primary};
    font-weight: 700;
  }
  
  p {
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 24px;
    color: ${colors.text.secondary};
  }
`;

// Notification
export const Notification = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  padding: 14px 20px;
  border-radius: 8px;
  color: white;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background-color: ${props => 
    props.type === 'success' ? colors.accent.green : 
    props.type === 'info' ? colors.accent.blue : 
    colors.accent.red};
  z-index: 1001;
  display: flex;
  align-items: center;
  animation: ${slideIn} 0.3s ease-out;
  
  &::before {
    content: ${props => 
      props.type === 'success' ? '"✅"' : 
      props.type === 'info' ? '"ℹ️"' : 
      '"❌"'};
    margin-right: 10px;
    font-size: 16px;
  }
`;

// Modal Components
export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(13, 17, 23, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

export const ModalContent = styled.div`
  background-color: ${colors.background.primary};
  border-radius: 10px;
  width: 550px;
  max-width: 90%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  border: 1px solid ${colors.border.primary};
  animation: ${slideIn} 0.3s ease-out;
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${colors.border.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to right, ${colors.background.secondary}, ${colors.background.primary});
  
  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: ${colors.text.primary};
  }
`;

export const ModalBody = styled.div`
  padding: 20px;
  max-height: 450px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${colors.background.primary};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${colors.border.primary};
    border-radius: 3px;
  }
`;

export const ModalFooter = styled.div`
  padding: 16px 20px;
  border-top: 1px solid ${colors.border.primary};
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  background-color: ${colors.background.secondary};
`;

// File List in Modal
export const FileList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
`;

export const FileListItem = styled.li`
  padding: 12px 16px;
  border-bottom: 1px solid ${colors.border.secondary};
  border-radius: 6px;
  margin-bottom: 8px;
  background-color: ${colors.background.secondary};
  display: flex;
  align-items: center;
  
  &::before {
    content: '📄';
    margin-right: 10px;
  }
`;

// Commit Message Input
export const CommitMessageInput = styled.div`
  margin-top: 20px;
  
  label {
    display: block;
    margin-bottom: 10px;
    font-weight: 500;
    color: ${colors.text.primary};
  }
  
  textarea {
    width: 100%;
    height: 90px;
    padding: 12px;
    border-radius: 8px;
    background-color: ${colors.background.secondary};
    color: ${colors.text.secondary};
    border: 1px solid ${colors.border.primary};
    resize: vertical;
    font-family: inherit;
    transition: all 0.2s ease;
    
    &:focus {
      border-color: ${colors.accent.blue};
      outline: none;
      box-shadow: 0 0 0 2px rgba(88, 166, 255, 0.2);
    }
    
    &::placeholder {
      color: ${colors.text.muted};
    }
  }
`;

// File Preview Components
export const FilePreviewModal = styled(Modal)``;

export const FilePreviewContent = styled(ModalContent)`
  width: 85%;
  max-width: 1100px;
  max-height: 90vh;
`;

export const FilePreviewHeader = styled(ModalHeader)``;

