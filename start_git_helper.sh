#!/bin/bash

# Git Helper Tool - Easy Launcher for Linux/Mac
# This script automatically sets up and starts the Git Helper web application

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "========================================"
echo "   Git Helper Tool - Easy Launcher"
echo "========================================"
echo -e "${NC}"
echo
echo -e "${GREEN}Starting Git Helper Tool...${NC}"
echo "This may take a moment on first run."
echo

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if Node.js is installed
if ! command_exists node; then
    echo -e "${RED}ERROR: Node.js is not installed!${NC}"
    echo
    echo "Please install Node.js:"
    echo "- Ubuntu/Debian: sudo apt install nodejs npm"
    echo "- macOS: brew install node (requires Homebrew)"
    echo "- Or download from: https://nodejs.org"
    echo
    read -p "Press Enter to exit..."
    exit 1
fi

# Check if npm is available
if ! command_exists npm; then
    echo -e "${RED}ERROR: npm is not available!${NC}"
    echo "Please install npm or reinstall Node.js"
    echo
    read -p "Press Enter to exit..."
    exit 1
fi

echo -e "${GREEN}Node.js detected. Checking dependencies...${NC}"

# Check if node_modules exists, if not install dependencies
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing dependencies... This may take a few minutes.${NC}"
    echo
    npm install
    if [ $? -ne 0 ]; then
        echo
        echo -e "${RED}ERROR: Failed to install dependencies!${NC}"
        echo "Please check your internet connection and try again."
        echo
        read -p "Press Enter to exit..."
        exit 1
    fi
else
    echo -e "${GREEN}Dependencies already installed.${NC}"
fi

echo
echo -e "${GREEN}Starting Git Helper Web Application...${NC}"
echo
echo "The application will be available at: http://localhost:3000"
echo
echo -e "${YELLOW}Opening browser automatically...${NC}"
echo "If it doesn't open, manually go to: http://localhost:3000"
echo
echo -e "${RED}To stop the application, press Ctrl+C${NC}"
echo

# Function to open browser based on OS
open_browser() {
    local url="http://localhost:3000"
    
    # Wait a moment for the server to start
    sleep 3
    
    if command_exists xdg-open; then
        # Linux
        xdg-open "$url" >/dev/null 2>&1 &
    elif command_exists open; then
        # macOS
        open "$url" >/dev/null 2>&1 &
    elif command_exists python3; then
        # Fallback using Python
        python3 -c "import webbrowser; webbrowser.open('$url')" >/dev/null 2>&1 &
    else
        echo -e "${YELLOW}Could not auto-open browser. Please manually go to: $url${NC}"
    fi
}

# Start browser opener in background
open_browser &

# Start the React application
npm start

# If we get here, the server stopped
echo
echo -e "${BLUE}Git Helper has stopped.${NC}"
read -p "Press Enter to exit..."
