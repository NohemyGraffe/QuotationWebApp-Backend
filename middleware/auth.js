const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  // Expect the token in the Authorization header as: "Bearer <token>"
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user;
    next();
  });
}

function authorizeRole(requiredRole) {
  return (req, res, next) => {
    // Check if the user has the required role
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }
    next();
  };
}

module.exports = { authenticateToken, authorizeRole };
