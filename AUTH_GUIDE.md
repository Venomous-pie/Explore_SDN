# Authentication System Guide

## Overview
The Surigao Escapes application now uses **JWT (JSON Web Token)** based authentication with **session persistence** and **HTTP-only cookies** for secure user authentication.

## Features

### ✅ Implemented Features
- **JWT Authentication**: Secure token-based authentication
- **Session Persistence**: Users stay logged in across browser sessions
- **HTTP-Only Cookies**: Tokens stored securely in cookies
- **Password Hashing**: Bcrypt for secure password storage
- **Token Expiration**: 7-day token validity
- **Auto-Verification**: Tokens verified on app load for persistent login

## Backend API Endpoints

### Base URL
```
http://localhost:3000/api/auth
```

### Endpoints

#### 1. Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 2. Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 3. Logout
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### 4. Verify Token (Persistent Login)
```http
GET /api/auth/verify
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### 5. Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2025-01-08T10:00:00.000Z"
  }
}
```

## Frontend Usage

### Initialize Authentication
```typescript
import { useAuth } from '@/composables/useAuth'

// In App.vue or main component
const { initAuth } = useAuth()

onMounted(async () => {
  await initAuth() // Verifies token and restores session
})
```

### Sign Up
```typescript
const { signUp } = useAuth()

const result = await signUp('John Doe', 'john@example.com', 'password123')
if (result.success) {
  // User registered and logged in
} else {
  console.error(result.error)
}
```

### Sign In
```typescript
const { signIn } = useAuth()

const result = await signIn('john@example.com', 'password123')
if (result.success) {
  // User logged in
} else {
  console.error(result.error)
}
```

### Sign Out
```typescript
const { signOut } = useAuth()

await signOut() // Clears token and session
```

### Check Authentication Status
```typescript
const { isAuthenticated, currentUser } = useAuth()

if (isAuthenticated.value) {
  console.log('User:', currentUser.value)
}
```

## Security Features

### 1. Password Hashing
- Passwords are hashed using **bcrypt** with salt rounds of 10
- Plain text passwords are never stored

### 2. JWT Tokens
- Tokens expire after **7 days**
- Signed with a secret key
- Include user ID, email, and name in payload

### 3. HTTP-Only Cookies
- Tokens stored in HTTP-only cookies
- Protected from XSS attacks
- Automatically sent with requests

### 4. CORS Configuration
- Credentials enabled for cookie support
- Origin restricted to frontend URL

## Data Storage

### Users Data
Location: `backend/data/users.json`

Structure:
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "password": "$2a$10$hashedpassword...",
    "createdAt": "2025-01-08T10:00:00.000Z"
  }
]
```

### Token Storage
- **Backend**: HTTP-only cookie named `token`
- **Frontend**: localStorage key `auth_token` (for Authorization header)

## Environment Variables

Create a `.env` file in the backend directory:

```env
JWT_SECRET=your-super-secret-key-here
NODE_ENV=development
PORT=3000
```

## Testing the Authentication

### 1. Start Backend Server
```bash
cd backend
npm run dev
```

### 2. Start Frontend Server
```bash
cd frontend
npm run dev
```

### 3. Test Registration
1. Open the app at `http://localhost:5173`
2. Click "Sign in" button
3. Switch to "Sign Up" tab
4. Enter name, email, and password
5. Submit form

### 4. Test Persistent Login
1. Register or login
2. Close the browser
3. Reopen the app
4. User should still be logged in

### 5. Test Logout
1. Click user avatar dropdown
2. Click "Sign out"
3. Session should be cleared

## Middleware Usage

### Protect Routes
```javascript
const { authenticateToken } = require('./middleware/auth');

// Protected route
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});
```

### Optional Authentication
```javascript
const { optionalAuth } = require('./middleware/auth');

// Route that works with or without auth
app.get('/api/places', optionalAuth, (req, res) => {
  // req.user will be set if authenticated
  const places = getPlaces(req.user);
  res.json(places);
});
```

## Troubleshooting

### Token Not Persisting
- Check CORS credentials are enabled
- Verify cookie settings in browser
- Ensure `credentials: 'include'` in fetch calls

### Login Fails
- Check backend server is running
- Verify API URL in frontend
- Check network tab for errors
- Ensure user exists in `users.json`

### Token Expired
- Tokens expire after 7 days
- User needs to login again
- Consider implementing refresh tokens for longer sessions

## Next Steps

### Recommended Enhancements
1. **Refresh Tokens**: Implement token refresh mechanism
2. **Email Verification**: Add email verification on signup
3. **Password Reset**: Implement forgot password flow
4. **Rate Limiting**: Add rate limiting to prevent brute force
5. **2FA**: Add two-factor authentication option
6. **OAuth**: Integrate Google/Facebook login
7. **User Roles**: Add admin/user role system
8. **Session Management**: View and revoke active sessions

## Support

For issues or questions, check:
- Backend logs: `backend/server.js` console output
- Frontend console: Browser DevTools
- Network requests: Browser Network tab
