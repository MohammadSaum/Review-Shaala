// backend/src/models/Review.js
const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: String },
  // allow the field to be absent initially (use undefined), enum still enforced when value provided
  sentiment: { type: String, enum: ['positive','negative','neutral'], default: undefined },
  confidence: { type: Number, default: null },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Review', ReviewSchema)
