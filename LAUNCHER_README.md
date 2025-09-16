# 🚀 Git Helper - Easy Launcher Guide

This Git Helper tool now includes **noob-friendly** launcher scripts that make it super easy to start the application with just a double-click!

## 📁 Launcher Files

### For Windows Users:
- **`START_GIT_HELPER.bat`** - Double-click this file to start the application

### For Linux/Mac Users:
- **`start_git_helper.sh`** - Double-click this file to start the application

## 🎯 How to Use (Super Simple!)

### Windows:
1. **Double-click** `START_GIT_HELPER.bat`
2. Wait for the application to start (may take a moment on first run)
3. Your browser will automatically open to the Git Helper tool
4. Start using the tool!

### Linux/Mac:
1. **Double-click** `start_git_helper.sh`
2. If prompted, choose "Run in Terminal" or "Execute"
3. Wait for the application to start
4. Your browser will automatically open to the Git Helper tool
5. Start using the tool!

## ✨ What the Launchers Do Automatically

### 🔧 **Dependency Management:**
- Checks if Node.js is installed
- Automatically installs npm dependencies if needed
- Shows clear error messages if something is missing

### 🌐 **Browser Integration:**
- Automatically opens your default browser
- Navigates to the correct URL (http://localhost:3000)
- Provides fallback instructions if auto-open fails

### 📊 **User-Friendly Interface:**
- Colorful terminal output with clear status messages
- Progress indicators during installation
- Easy-to-understand error messages
- Graceful shutdown handling

### 🛡️ **Error Handling:**
- Checks for Node.js installation
- Validates npm availability
- Handles network issues during dependency installation
- Provides helpful troubleshooting information

## 📋 Prerequisites

### Required (Auto-checked by launchers):
- **Node.js** (version 14 or higher)
- **npm** (usually comes with Node.js)
- **Internet connection** (for first-time dependency installation)

### Installation Links:
- **Windows/Mac/Linux:** [Download Node.js](https://nodejs.org)
- **Ubuntu/Debian:** `sudo apt install nodejs npm`
- **macOS with Homebrew:** `brew install node`

## 🎮 First-Time Usage

1. **Extract** the Git Helper files to a folder
2. **Double-click** the appropriate launcher for your system:
   - Windows: `START_GIT_HELPER.bat`
   - Linux/Mac: `start_git_helper.sh`
3. **Wait** for automatic setup (first run may take 2-3 minutes)
4. **Browser opens** automatically with the Git Helper tool
5. **Login** with your GitHub token and start using!

## 🔄 Subsequent Usage

After the first run, starting the tool is even faster:
1. **Double-click** the launcher
2. **Browser opens** in seconds
3. **Start working** immediately!

## 🛠️ Troubleshooting

### "Node.js is not installed" Error:
- Install Node.js from [nodejs.org](https://nodejs.org)
- Restart your computer after installation
- Try running the launcher again

### "Failed to install dependencies" Error:
- Check your internet connection
- Try running the launcher again
- If persistent, delete `node_modules` folder and retry

### Browser doesn't open automatically:
- Manually go to: `http://localhost:3000`
- The application will be running there

### Permission denied (Linux/Mac):
- Right-click the `.sh` file → Properties → Permissions → Make executable
- Or run: `chmod +x start_git_helper.sh`

## 🎯 Advanced Users

If you prefer the traditional method:
```bash
npm install    # Install dependencies
npm start      # Start the application
```

## 🆘 Support

If you encounter any issues:
1. Check the error messages in the terminal window
2. Ensure Node.js is properly installed
3. Verify your internet connection
4. Try deleting `node_modules` and running the launcher again

---

**Now you can start the Git Helper tool with just a double-click! 🎉**
