# GitHub Helper Web - Fixed Version

A React-based web application for interacting with GitHub repositories with support for large files up to 2GB.

## Overview of the Application

This application is a GitHub helper web interface built with React. It allows users to authenticate with GitHub, browse their repositories, navigate through repository contents, and upload files to repositories. The application is structured using modern React practices, including functional components, hooks for state management, and styled-components for styling.

**This is the fixed version that resolves critical bugs and adds support for files larger than 1GB using Git LFS.**

## Features

- GitHub authentication using OAuth tokens
- Repository listing and selection
- File and directory navigation
- File content viewing
- **Large file upload support (up to 2GB) with automatic Git LFS integration**
- **Fixed malformed path errors with robust path normalization**
- File upload functionality with drag and drop support
- Branch selection and navigation
- **Upload progress tracking with visual indicators**
- **Smart file size display (MB/GB) and LFS indicators**
- Notification system for user feedback

## Bug Fixes Implemented

### ✅ Upload Limit Issue Fixed
- **Before:** 100MB limit with poor error handling
- **After:** 2GB limit with Git LFS support for files over 100MB
- **Benefits:** Support for very large files, automatic LFS integration, progress tracking

### ✅ Malformed Path Error Fixed
- **Before:** Inconsistent path handling causing upload failures
- **After:** Robust path normalization and validation
- **Benefits:** Reliable file uploads, proper directory navigation

### ✅ Git LFS Integration
- Automatic detection of large files (>100MB)
- SHA256 hash calculation for LFS pointer files
- LFS pointer file generation following Git LFS spec v1
- Clear UI indicators for LFS files

## File Structure and Relationships

The application consists of three main files:

1. `index.js` - The entry point of the React application
2. `App.js` - The main application component containing all the business logic
3. `styles/StyledComponents.js` - A collection of styled components used for UI rendering

### index.js

The index.js file serves as the entry point for the React application. It imports React and ReactDOM, as well as the main App component and a CSS file. It uses ReactDOM.createRoot to render the App component inside a React.StrictMode wrapper, which helps identify potential problems in the application during development.

### App.js

App.js contains the main application component and all the business logic. It's a functional component that uses React hooks (useState, useEffect) for state management. The component imports a large number of styled components from the StyledComponents.js file, which are used to build the UI.

Key features of the App component include:

- GitHub authentication using OAuth tokens
- Repository listing and selection
- File and directory navigation
- File content viewing
- **Large file upload functionality with Git LFS support**
- **Robust path handling and validation**
- File upload functionality with drag and drop support
- Branch selection and navigation
- **Enhanced notification system with progress tracking**

The component maintains several state variables to track the application state, including authentication status, user information, repository data, file contents, and UI state for modals and notifications.

### StyledComponents.js

This file contains all the styled components used in the application, created using the styled-components library. The components are organized by their function in the application:

- Layout components (AppContainer, MainContent, Content)
- Header components (Header, Title, UserInfo)
- Button components (LoginButton, LogoutButton, etc.)
- Sidebar components (Sidebar, SidebarHeader, RepoList)
- Repository components (RepositoryHeader, RepoName, BranchSelector)
- Navigation components (PathNavigator, PathItem)
- File explorer components (FileExplorer, FileItem)
- Drag and drop components (DropZone)
- Modal components for file uploads and previews
- Notification components

Each styled component is exported individually, allowing them to be imported and used in the App component.

## Component Relationships

The relationship between these files follows a clear separation of concerns:

1. `index.js` handles the application initialization and mounting
2. `App.js` contains all the business logic and state management
3. `StyledComponents.js` provides the UI components with consistent styling

The App component imports and uses the styled components to create the user interface, while the business logic within App.js controls the behavior of these components. This separation allows for easier maintenance and updates to either the UI or the business logic without affecting the other.

The application follows a component-based architecture typical of React applications, with a clear hierarchy of components. The main App component serves as the container for all other components, managing the application state and passing data down to child components through props (in this case, through the styled components' props).

## Styling Approach

The application uses styled-components, a CSS-in-JS library that allows for component-level styling with the full power of JavaScript. This approach offers several advantages:

1. Scoped styles that don't leak to other components
2. Dynamic styling based on props (as seen in the RepoItem component that changes background color when selected)
3. Theme consistency through the application
4. Elimination of class name conflicts

The styled components in this application follow GitHub's dark theme, with colors like #0d1117 for backgrounds and #c9d1d9 for text, creating a cohesive and professional look.

## Getting Started

### Prerequisites

- Node.js and npm installed
- A GitHub account
- A GitHub OAuth token for authentication
- **Git LFS installed for large file support**

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```

## Usage

1. Log in with your GitHub token
2. Select a repository from the sidebar
3. Navigate through directories and view files
4. **Upload files up to 2GB by dragging and dropping them into the designated area**
5. **Large files (>100MB) will automatically use Git LFS**

## Git LFS Requirements

For repositories that will store large files:
1. **Enable Git LFS** on the repository
2. **Install Git LFS** locally: `git lfs install`
3. **Configure LFS tracking** for file types: `git lfs track "*.zip"`
4. **Ensure sufficient LFS storage quota** in GitHub

---

**Version:** Fixed v2.0 (Large File Support)  
**Status:** Production Ready  
**Max File Size:** 2GB with Git LFS support
