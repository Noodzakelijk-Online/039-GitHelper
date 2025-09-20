@echo off
title Git Helper - Starting...
color 0A

echo.
echo ========================================
echo    Git Helper Tool - Easy Launcher
echo ========================================
echo.
echo Starting Git Helper Tool...
echo.

echo Serving Git Helper Web Application...
echo The app will open at http://localhost:3000
echo.

REM Open browser
start "" "http://localhost:3000"

REM Run serve directly from node_modules
node node_modules\serve\build\main.js -s build -l 3000

REM If we get here, the server stopped
echo.
echo Git Helper has stopped.
pause
