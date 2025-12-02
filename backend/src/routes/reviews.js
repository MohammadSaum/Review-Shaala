// backend/src/routes/reviews.js
const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const axios = require('axios');

// GET recent reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }).limit(50);
    res.json(reviews);
  } catch (err) {
    console.error('GET /api/reviews error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a review -> save then call ML
router.post('/', async (req, res) => {
  try {
    const { text, user } = req.body;
    if (!text || text.trim() === '') return res.status(400).json({ error: 'text is required' });

    const review = await Review.create({ text, user });

    const mlUrl = process.env.ML_SERVICE_URL || 'http://localhost:5001/predict';
    try {
      const resp = await axios.post(mlUrl, { text }, { timeout: 7000 });
      const { label, confidence } = resp.data || {};
      review.sentiment = label || 'neutral';
      review.confidence = typeof confidence === 'number' ? confidence : 0;
    } catch (mlErr) {
      console.warn('ML call failed:', mlErr.message);
      review.sentiment = 'neutral';
      review.confidence = 0;
    }

    await review.save();
    res.json(review);
  } catch (err) {
    console.error('POST /api/reviews error:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

module.exports = router;
