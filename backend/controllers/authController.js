const axios = require('axios');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ChatHistory = require('../models/chatHistory');

// =======================
// Register a new user
// =======================
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

// =======================
// Login user
// =======================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

// =======================
// Analyze health question using Hugging Face (DeepSeek)
// =======================
const analyzeQuestion = async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ message: 'Question is required' });
  }

  try {
    const response = await axios.post(
      'https://router.huggingface.co/novita/v3/openai/chat/completions',
      {
        model: 'deepseek/deepseek-v3-0324',
        messages: [{ role: 'user', content: question }],
        stream: false,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const answer = response.data.choices?.[0]?.message?.content || 'No reply generated.';

    // Save chat history to DB
    await ChatHistory.create({
      userId: req.user.userId,
      question,
      answer,
    });

    res.status(200).json({ answer });
  } catch (err) {
    console.error('Hugging Face API Error:', err.response?.data || err.message);
    res.status(500).json({ message: 'AI failed to respond', error: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  analyzeQuestion,
};
