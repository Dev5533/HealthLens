const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  analyzeQuestion
} = require('../controllers/authController');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Middleware to protect routes
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT payload:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

// Auth Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/analyze', protect, analyzeQuestion);

// Profile Routes
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password'); 
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/profile', protect, async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findById(req.user.userId); 

    if (name) user.name = name;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.json({ message: 'Profile updated' });
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
});


module.exports = router;
