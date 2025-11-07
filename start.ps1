# Surigao Escapes - Start Script
# Runs both backend and frontend servers concurrently

Write-Host "🚀 Starting Surigao Escapes..." -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}

Write-Host "📦 Checking dependencies..." -ForegroundColor Yellow

# Check and install backend dependencies
if (-not (Test-Path ".\backend\node_modules")) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    Push-Location backend
    npm install
    Pop-Location
}

# Check and install frontend dependencies
if (-not (Test-Path ".\frontend\node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    Push-Location frontend
    npm install
    Pop-Location
}

Write-Host ""
Write-Host "✅ Dependencies ready!" -ForegroundColor Green
Write-Host ""
Write-Host "🔥 Starting servers..." -ForegroundColor Cyan
Write-Host "   Backend:  http://localhost:3000" -ForegroundColor Gray
Write-Host "   Frontend: http://localhost:5173" -ForegroundColor Gray
Write-Host ""
Write-Host "Press Ctrl+C to stop both servers" -ForegroundColor Yellow
Write-Host ""

# Start backend in a new process
$backend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; Write-Host '🔧 Backend Server' -ForegroundColor Blue; npm run dev" -PassThru

# Wait a moment for backend to start
Start-Sleep -Seconds 2

# Start frontend in a new process
$frontend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\frontend'; Write-Host '🎨 Frontend Server' -ForegroundColor Magenta; npm run dev" -PassThru

Write-Host "✨ Both servers are running!" -ForegroundColor Green
Write-Host ""
Write-Host "To stop servers:" -ForegroundColor Yellow
Write-Host "  - Close the terminal windows, or" -ForegroundColor Gray
Write-Host "  - Press Ctrl+C in each window" -ForegroundColor Gray
Write-Host ""

# Wait for user input to keep this window open
Write-Host "Press any key to stop all servers and exit..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Clean up processes
Write-Host ""
Write-Host "🛑 Stopping servers..." -ForegroundColor Yellow
Stop-Process -Id $backend.Id -Force -ErrorAction SilentlyContinue
Stop-Process -Id $frontend.Id -Force -ErrorAction SilentlyContinue
Write-Host "✅ Servers stopped!" -ForegroundColor Green
