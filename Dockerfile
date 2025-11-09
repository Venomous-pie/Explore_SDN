# Multi-stage build for production

# Stage 1: Build Frontend
FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy frontend package files
COPY frontend/package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy frontend source
COPY frontend/ ./

# Build frontend for production
RUN npm run build

# Stage 2: Build Backend
FROM node:20-alpine AS backend-builder

WORKDIR /app/backend

# Copy backend package files
COPY backend/package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy backend source
COPY backend/ ./

# Stage 3: Production Runtime
FROM node:20-alpine

WORKDIR /app

# Install serve to host frontend and node for backend
RUN npm install -g serve concurrently

# Copy built frontend from builder
COPY --from=frontend-builder /app/frontend/dist /app/frontend/dist

# Copy backend from builder
COPY --from=backend-builder /app/backend /app/backend

# Copy startup script
COPY docker-start.sh /app/docker-start.sh
RUN chmod +x /app/docker-start.sh

# Expose ports
# 3000 for backend API
# 5173 for frontend
EXPOSE 3000 5173

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start both services
CMD ["/app/docker-start.sh"]
