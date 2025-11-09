# 🚀 Deployment Checklist for Explore SDN

## For Developers (Before Sending to Client)

### 1. Test Docker Build Locally
```bash
# Build the Docker image
docker-compose build

# Start the application
docker-compose up -d

# Check if it's running
docker-compose ps

# Test the application
# Open browser: http://localhost:5173
# Check backend: http://localhost:3000/api/health

# Stop and clean up
docker-compose down
```

### 2. Create Client Package
```bash
# Run the package creation script
CREATE-CLIENT-PACKAGE.bat

# This creates: Explore_SDN_Client_Package.zip
```

### 3. Verify Package Contents
The ZIP should contain:
- ✅ frontend/ folder
- ✅ backend/ folder
- ✅ Dockerfile
- ✅ docker-compose.yml
- ✅ docker-start.sh
- ✅ .dockerignore
- ✅ SETUP.bat
- ✅ START-DOCKER.bat
- ✅ STOP-DOCKER.bat
- ✅ README.txt (CLIENT-SETUP-GUIDE.md)

### 4. Test Package on Clean Machine (Optional but Recommended)
- Extract ZIP on a test machine
- Follow client setup instructions
- Verify everything works

---

## For Clients (Setup Instructions)

### Prerequisites
- Windows 10/11 (64-bit)
- 4GB RAM minimum (8GB recommended)
- 2GB free disk space
- Internet connection (for initial setup)

### Installation Steps

1. **Install Docker Desktop**
   - Download from: https://www.docker.com/products/docker-desktop
   - Run installer
   - Restart computer if prompted
   - Open Docker Desktop and wait for it to start

2. **Extract the Package**
   - Extract `Explore_SDN_Client_Package.zip`
   - Place in a permanent location (e.g., `C:\Explore_SDN`)

3. **Run Setup**
   - Double-click `SETUP.bat`
   - Wait for completion (5-10 minutes first time)
   - Look for "✅ Setup Complete!" message

4. **Open Application**
   - Open browser
   - Go to: http://localhost:5173
   - Bookmark this URL for easy access

### Daily Usage

**Starting:**
- Double-click `START-DOCKER.bat`
- Wait for "✅ Application started successfully!"
- Open browser to http://localhost:5173

**Stopping:**
- Double-click `STOP-DOCKER.bat`
- Wait for confirmation

---

## Troubleshooting

### Common Issues

**"Docker is not installed"**
- Solution: Install Docker Desktop and restart computer

**"Docker is not running"**
- Solution: Open Docker Desktop from Start menu

**"Port already in use"**
- Solution: Run STOP-DOCKER.bat first, then START-DOCKER.bat

**Application won't load**
- Wait 30 seconds after starting
- Refresh browser
- Check Docker Desktop shows container is running

**Slow performance**
- Close other applications
- Increase Docker memory in Docker Desktop settings
- Restart Docker Desktop

---

## Technical Details

### Architecture
- **Frontend**: Vue.js 3 + Vite (Port 5173)
- **Backend**: Node.js + Express (Port 3000)
- **Container**: Docker + Docker Compose

### Data Storage
- Backend data: `./backend/data/`
- Persists between restarts
- Backed up automatically in Docker volume

### Updating
1. Stop application (STOP-DOCKER.bat)
2. Replace files with new version
3. Run SETUP.bat again
4. Start application (START-DOCKER.bat)

### Backup
To backup data:
1. Stop application
2. Copy `backend/data/` folder
3. Store safely

To restore:
1. Stop application
2. Replace `backend/data/` folder
3. Start application

---

## Support

### For Clients
- Read CLIENT-SETUP-GUIDE.md (README.txt)
- Contact your system administrator
- Contact development team

### For Developers
- Check Docker logs: `docker-compose logs -f`
- Rebuild: `docker-compose up -d --build`
- Clean slate: `docker-compose down -v && docker-compose up -d --build`

---

## Security Notes

- Application runs locally only (localhost)
- No external network access required after setup
- Data stored locally on client machine
- No cloud services or external APIs

---

## Performance Optimization

### For Better Performance:
1. **Docker Desktop Settings**
   - Memory: 4GB minimum
   - CPUs: 2 minimum
   - Disk: 20GB

2. **System Requirements**
   - Close unnecessary applications
   - Ensure SSD if possible
   - Keep Windows updated

---

*Last updated: November 2025*
