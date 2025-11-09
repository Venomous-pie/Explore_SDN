# 🏝️ Explore SDN - Client Setup Guide

## Quick Start (3 Easy Steps!)

### Step 1: Install Docker Desktop

1. Download Docker Desktop from: https://www.docker.com/products/docker-desktop
2. Run the installer
3. Restart your computer if prompted
4. Open Docker Desktop and wait for it to start (you'll see a whale icon in your system tray)

### Step 2: Run Setup

1. Double-click `SETUP.bat`
2. Wait for the setup to complete (first time may take 5-10 minutes)
3. You'll see a success message when done

### Step 3: Open the Application

1. Open your web browser (Chrome, Edge, or Firefox)
2. Go to: **http://localhost:5173**
3. Enjoy exploring Surigao del Norte!

---

## Daily Usage

### Starting the Application
- Double-click `START-DOCKER.bat`
- Wait a few seconds
- Open browser to: http://localhost:5173

### Stopping the Application
- Double-click `STOP-DOCKER.bat`
- Wait for confirmation

---

## Troubleshooting

### "Docker is not installed"
- Install Docker Desktop from the link in Step 1
- Restart your computer
- Try again

### "Docker is not running"
- Look for the Docker whale icon in your system tray (bottom-right corner)
- If not there, open Docker Desktop from your Start menu
- Wait for Docker to start (icon will stop animating)
- Try again

### Application won't open in browser
- Make sure you see "✅ Setup Complete!" or "✅ Application started successfully!"
- Wait 30 seconds after starting
- Try refreshing your browser
- Make sure you're using: http://localhost:5173 (not https)

### Port already in use
- Another application is using the same port
- Run `STOP-DOCKER.bat` first
- Close any other web servers
- Try `START-DOCKER.bat` again

---

## System Requirements

- **Operating System**: Windows 10/11 (64-bit)
- **RAM**: 4GB minimum (8GB recommended)
- **Disk Space**: 2GB free space
- **Internet**: Required for initial setup only

---

## What Gets Installed?

- **Docker Desktop**: Container platform (runs the application)
- **Explore SDN**: The tourism application (runs inside Docker)

**Note**: No other software needs to be installed. Everything runs inside Docker containers!

---

## Need Help?

Contact your system administrator or the development team.

---

## Technical Details (For IT Staff)

### Ports Used
- **5173**: Frontend (Vue.js application)
- **3000**: Backend API (Express.js server)

### Docker Commands
```bash
# Build and start
docker-compose up -d --build

# Start (already built)
docker-compose up -d

# Stop
docker-compose down

# View logs
docker-compose logs -f

# Restart
docker-compose restart

# Remove everything (including data)
docker-compose down -v
```

### Data Persistence
- Backend data is stored in: `./backend/data`
- This folder is mounted as a volume and persists between restarts

### Updating the Application
1. Stop the application: `STOP-DOCKER.bat`
2. Replace all files with new version
3. Run setup again: `SETUP.bat`

---

## Uninstalling

1. Run `STOP-DOCKER.bat`
2. Open Docker Desktop
3. Go to Containers and delete "explore-sdn-app"
4. Go to Images and delete "explore-sdn" image
5. Uninstall Docker Desktop from Windows Settings (optional)
6. Delete the Explore_SDN folder

---

*Last updated: November 2025*
