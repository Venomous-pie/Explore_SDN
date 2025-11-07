@echo off
REM Surigao Escapes - Start Script (Batch)
REM Runs both backend and frontend servers concurrently

echo.
echo ========================================
echo    Surigao Escapes - Starting Servers
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

echo [INFO] Checking dependencies...
echo.

REM Check and install backend dependencies
if not exist "backend\node_modules" (
    echo [INFO] Installing backend dependencies...
    cd backend
    call npm install
    cd ..
)

REM Check and install frontend dependencies
if not exist "frontend\node_modules" (
    echo [INFO] Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
)

echo.
echo [SUCCESS] Dependencies ready!
echo.
echo [INFO] Starting servers...
echo   Backend:  http://localhost:3000
echo   Frontend: http://localhost:5173
echo.
echo Press Ctrl+C in each window to stop servers
echo.

REM Start backend server in new window
start "Backend Server" cmd /k "cd /d %CD%\backend && echo [BACKEND] Starting... && npm run dev"

REM Wait 2 seconds for backend to start
timeout /t 2 /nobreak >nul

REM Start frontend server in new window
start "Frontend Server" cmd /k "cd /d %CD%\frontend && echo [FRONTEND] Starting... && npm run dev"

echo.
echo [SUCCESS] Both servers are running!
echo.
echo Close the server windows to stop them.
echo.
pause
