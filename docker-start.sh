#!/bin/sh

# Startup script for Docker container

echo "🚀 Starting Explore SDN Application..."

# Start backend in background
echo "📡 Starting Backend API on port 3000..."
cd /app/backend && node server.js &

# Wait for backend to be ready
echo "⏳ Waiting for backend to be ready..."
sleep 5

# Start frontend
echo "🌐 Starting Frontend on port 5173..."
cd /app/frontend && serve -s dist -l 5173 &

echo "✅ Explore SDN is running!"
echo "🌐 Frontend: http://localhost:5173"
echo "📡 Backend API: http://localhost:3000"

# Keep container running
wait
