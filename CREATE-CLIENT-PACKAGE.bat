@echo off
echo ========================================
echo   Creating Client Deployment Package
echo ========================================
echo.

REM Create package directory
set PACKAGE_DIR=Explore_SDN_Client_Package
if exist %PACKAGE_DIR% rmdir /s /q %PACKAGE_DIR%
mkdir %PACKAGE_DIR%

echo [1/5] Creating package directory...

REM Copy necessary files
echo [2/5] Copying application files...
xcopy /E /I /Y frontend %PACKAGE_DIR%\frontend
xcopy /E /I /Y backend %PACKAGE_DIR%\backend
copy Dockerfile %PACKAGE_DIR%\
copy docker-compose.yml %PACKAGE_DIR%\
copy docker-start.sh %PACKAGE_DIR%\
copy .dockerignore %PACKAGE_DIR%\

echo [3/5] Copying setup scripts...
copy SETUP.bat %PACKAGE_DIR%\
copy START-DOCKER.bat %PACKAGE_DIR%\
copy STOP-DOCKER.bat %PACKAGE_DIR%\
copy CLIENT-SETUP-GUIDE.md %PACKAGE_DIR%\README.txt

echo [4/5] Cleaning up unnecessary files...
REM Remove node_modules and build artifacts
if exist %PACKAGE_DIR%\frontend\node_modules rmdir /s /q %PACKAGE_DIR%\frontend\node_modules
if exist %PACKAGE_DIR%\backend\node_modules rmdir /s /q %PACKAGE_DIR%\backend\node_modules
if exist %PACKAGE_DIR%\frontend\dist rmdir /s /q %PACKAGE_DIR%\frontend\dist
if exist %PACKAGE_DIR%\frontend\.vite rmdir /s /q %PACKAGE_DIR%\frontend\.vite

echo [5/5] Creating ZIP archive...
powershell Compress-Archive -Path %PACKAGE_DIR% -DestinationPath Explore_SDN_Client_Package.zip -Force

echo.
echo ========================================
echo   ✅ Package Created Successfully!
echo ========================================
echo.
echo Package location:
echo   Explore_SDN_Client_Package.zip
echo.
echo Send this ZIP file to your client.
echo They just need to:
echo   1. Extract the ZIP
echo   2. Install Docker Desktop
echo   3. Run SETUP.bat
echo.

pause
