// routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Import the User model
const User = require('../models/User');

// Login route: POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Compare provided password with stored hashed password
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Create a JWT token containing username, role, and id
    const tokenPayload = { username: user.username, role: user.role, id: user._id };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '8h' });
    
    // Return the token and (optionally) the role
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
