@echo off
echo ========================================
echo   Starting Explore SDN
echo ========================================
echo.

docker-compose up -d

if %errorlevel% equ 0 (
    echo.
    echo ✅ Application started successfully!
    echo.
    echo 🌐 Open your browser and go to:
    echo    http://localhost:5173
    echo.
    echo To stop the application, run: STOP-DOCKER.bat
    echo.
) else (
    echo.
    echo [ERROR] Failed to start!
    echo Make sure Docker Desktop is running.
    echo.
)

pause
