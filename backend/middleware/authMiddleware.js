const jwt = require('jsonwebtoken');
const { isTokenBlacklisted } = require('../controllers/adminController'); // Import blacklist check

const authMiddleware = (req, res, next) => {
  let token = req.header('Authorization');

  if (!token) {
    console.log('❌ No token provided');
    return res.status(401).json({ message: 'Access Denied' });
  }

  // Remove "Bearer " prefix if present
  if (token.startsWith('Bearer ')) {
    token = token.split(' ')[1];
  }

  // Check if the token is blacklisted
  if (isTokenBlacklisted(token)) {
    console.log('⚠️ Token is blacklisted');
    return res.status(401).json({ message: 'Session expired. Please log in again.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token verified for user:', decoded.id);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('❌ Token verification failed:', error.message);
    return res.status(400).json({ message: 'Invalid Token' });
  }
};

module.exports = authMiddleware;
