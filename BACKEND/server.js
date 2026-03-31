const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
const corsOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
  'https://resume-maker.netlify.app',
  'https://resumemaker.netlify.app'
];

// Add production frontend URL if available
if (process.env.FRONTEND_URL) {
  corsOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
  origin: corsOrigins,
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✓ MongoDB connected successfully');
})
.catch((err) => {
  console.error('✗ MongoDB connection failed:', err.message);
  process.exit(1);
});

// Routes
app.use('/api/auth', require('./routes/auth'));

// Basic health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 ResumeMaker Backend running on http://localhost:${PORT}`);
  console.log(`📊 MongoDB: ${process.env.MONGODB_URI.split('@')[1]}`);
  console.log(`🔐 JWT Secret configured\n`);
});
