@echo off
echo ========================================
echo   Stopping Explore SDN
echo ========================================
echo.

docker-compose down

if %errorlevel% equ 0 (
    echo.
    echo ✅ Application stopped successfully!
    echo.
) else (
    echo.
    echo [ERROR] Failed to stop!
    echo.
)

pause
