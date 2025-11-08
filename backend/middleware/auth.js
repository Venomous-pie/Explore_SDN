const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'surigao-escapes-secret-key-2025';

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ success: false, error: 'Invalid or expired token' });
  }
};

// Optional authentication - doesn't fail if no token
const optionalAuth = (req, res, next) => {
  const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
    } catch (error) {
      // Token invalid but continue anyway
      req.user = null;
    }
  }
  
  next();
};

module.exports = {
  authenticateToken,
  optionalAuth,
  JWT_SECRET
};
