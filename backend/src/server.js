// backend/src/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

// simple ping route to verify this process
app.get('/ping', (req, res) => res.json({ ok: true, pid: process.pid }));

// connect DB
connectDB();

// mount routes (ensure path is correct)
const reviewRoutes = require('./routes/reviews');
app.use('/api/reviews', reviewRoutes);

// optional health route
app.get('/api/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('MongoDB connection should already be attempted (check earlier logs).');
  console.log(`Server running on ${PORT}`);
});
