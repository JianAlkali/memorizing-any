@echo off
chcp 65001 >nul
cd /d "%~dp0"
if not exist index.html (
  echo Missing index.html. Please keep this file with index.html.
  pause
  exit /b 1
)
if not exist local-server.cjs (
  echo Missing local-server.cjs. Please keep this file with index.html.
  pause
  exit /b 1
)
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found.
  echo Please install Node.js LTS: https://nodejs.org/
  pause
  exit /b 1
)
echo Starting Zizhuj local web app...
echo If the browser does not open, visit http://127.0.0.1:8765/
echo Close this window to stop the server.
node "%~dp0local-server.cjs"
pause
