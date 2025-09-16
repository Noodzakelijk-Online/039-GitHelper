@echo off
title Git Helper - Starting...
color 0A

echo.
echo ========================================
echo    Git Helper Tool - Easy Launcher
echo ========================================
echo.
echo Starting Git Helper Tool...
echo This may take a moment on first run.
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org
    echo Then run this script again.
    echo.
    pause
    exit /b 1
)

REM Check if npm is available
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: npm is not available!
    echo Please reinstall Node.js from: https://nodejs.org
    echo.
    pause
    exit /b 1
)

echo Node.js detected. Checking dependencies...

REM Check if node_modules exists, if not install dependencies
if not exist "node_modules" (
    echo Installing dependencies... This may take a few minutes.
    echo.
    npm install
    if %errorlevel% neq 0 (
        echo.
        echo ERROR: Failed to install dependencies!
        echo Please check your internet connection and try again.
        echo.
        pause
        exit /b 1
    )
) else (
    echo Dependencies already installed.
)

echo.
echo Starting Git Helper Web Application...
echo.
echo The application will open in your default browser.
echo If it doesn't open automatically, go to: http://localhost:3000
echo.
echo To stop the application, close this window or press Ctrl+C
echo.

REM Start the React application
start "" "http://localhost:3000"
npm start

REM If we get here, the server stopped
echo.
echo Git Helper has stopped.
pause
