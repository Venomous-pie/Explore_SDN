@echo off
echo ========================================
echo   Explore SDN - Easy Setup
echo ========================================
echo.

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker is not installed!
    echo.
    echo Please install Docker Desktop from:
    echo https://www.docker.com/products/docker-desktop
    echo.
    pause
    exit /b 1
)

echo [1/3] Docker is installed ✓
echo.

REM Check if Docker is running
docker ps >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker is not running!
    echo.
    echo Please start Docker Desktop and try again.
    echo.
    pause
    exit /b 1
)

echo [2/3] Docker is running ✓
echo.

echo [3/3] Building and starting Explore SDN...
echo This may take a few minutes on first run...
echo.

docker-compose up -d --build

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   ✅ Setup Complete!
    echo ========================================
    echo.
    echo The application is now running!
    echo.
    echo 🌐 Open your browser and go to:
    echo    http://localhost:5173
    echo.
    echo To stop the application, run: STOP.bat
    echo.
) else (
    echo.
    echo [ERROR] Setup failed!
    echo Please check the error messages above.
    echo.
)

pause
