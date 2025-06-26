const express = require('express');
const router = express.Router();
const ChatHistory = require('../models/chatHistory');
const protect = require('../middleware/auth');

router.get('/history', protect, async (req, res) => {
  try {
    const history = await ChatHistory.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load chat history' });
  }
});

module.exports = router;
