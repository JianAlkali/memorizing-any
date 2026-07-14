@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"
echo 正在启动自助记本地网页...
echo.
where npm >nul 2>nul
if errorlevel 1 (
  echo 未检测到 Node.js / npm。
  echo 请先安装 Node.js LTS: https://nodejs.org/
  echo.
  pause
  exit /b 1
)
if not exist node_modules (
  echo 首次启动，正在安装依赖。这一步只需要执行一次。
  npm install
  if errorlevel 1 (
    echo 依赖安装失败，请检查网络或 Node.js 环境。
    pause
    exit /b 1
  )
)
echo.
echo 启动成功后浏览器会打开 http://127.0.0.1:5173/
echo 如果没有自动打开，请手动复制该地址。
start "" "http://127.0.0.1:5173/"
npm run dev -- --host 127.0.0.1
pause
