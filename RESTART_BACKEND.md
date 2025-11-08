# 🔄 Backend Server Restart Required

## Issue
The authentication routes were just added, but the backend server needs to be restarted to load them.

## Solution

### Step 1: Stop the Backend Server
Find and stop the running backend process:

**Option A: Using Task Manager**
1. Open Task Manager (Ctrl + Shift + Esc)
2. Find "Node.js" processes
3. End the one running from the `backend` folder

**Option B: Using PowerShell**
```powershell
# Find Node processes
Get-Process -Name node

# Kill specific process (replace PID with actual process ID)
Stop-Process -Id <PID> -Force
```

**Option C: Using Terminal**
If you have the terminal where backend is running:
- Press `Ctrl + C` to stop the server

### Step 2: Restart the Backend Server
```bash
cd backend
npm run dev
```

You should see:
```
🚀 Server running on http://localhost:3000
📊 Loaded 29 places, 31 restaurants, 36 hotels
✨ JSON-based dynamic system - easily expandable!
```

### Step 3: Verify Authentication Works
Run the test script:
```bash
node test-auth.js
```

Expected output:
```
🧪 Testing Authentication Endpoints...

1️⃣ Testing Registration...
✅ Registration: SUCCESS

2️⃣ Testing Token Verification...
✅ Verification: SUCCESS

3️⃣ Testing Get User...
✅ Get User: SUCCESS
   User: Test User - test@example.com
```

### Step 4: Test in Browser
1. Open http://localhost:5173
2. Click "Sign in" button
3. Try to register or login
4. Check browser console - errors should be gone!

## Common Issues

### Port 3000 Already in Use
```bash
# Windows: Find what's using port 3000
netstat -ano | findstr :3000

# Kill the process
taskkill /PID <PID> /F
```

### Module Not Found Errors
```bash
cd backend
npm install
```

### CORS Errors Still Appearing
1. Make sure frontend is on http://localhost:5173
2. Clear browser cache (Ctrl + Shift + Delete)
3. Hard refresh (Ctrl + F5)

## Quick Commands

### Kill all Node processes (⚠️ Use with caution)
```powershell
Get-Process -Name node | Stop-Process -Force
```

### Restart both servers
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

## Verification Checklist
- [ ] Backend server restarted
- [ ] No errors in backend console
- [ ] Test script passes
- [ ] Frontend can connect
- [ ] Login/Register works
- [ ] No CORS errors in browser console
