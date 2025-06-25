const express = require('express');
const router = express.Router();
const axios = require('axios');

// GET /api/news/latest — fetch WHO medical news
router.get('/latest', async (req, res) => {
  try {
    const response = await axios.get('https://www.who.int/api/news/newsitems');
    const data = response.data.value || response.data;
    res.json(data);
  } catch (err) {
    console.error('WHO news fetch error:', err.message);
    res.status(500).json({ message: 'Failed to fetch news' });
  }
});

module.exports = router;
