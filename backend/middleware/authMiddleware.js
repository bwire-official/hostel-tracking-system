const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  let token = req.header('Authorization');

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'Access Denied' });
  }

  // Remove "Bearer " prefix if present
  if (token.startsWith('Bearer ')) {
    token = token.split(' ')[1]; // Extract the actual token
  }

  try {
    console.log('Token received:', token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(400).json({ message: 'Invalid Token' });
  }
};

module.exports = authMiddleware;
