const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Import routes
const authRoutes = require('./middleware/auth'); // Correct path
const examRoutes = require('./routes/exam');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Content Security Policy
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tailwindcss.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com"
  );
  next();
});

// Serve static files
app.use('/components', express.static(path.join(__dirname, 'components')));
app.use('/HR-dashboard', express.static(path.join(__dirname, 'HR-dashboard')));
app.use('/user-dashboard', express.static(path.join(__dirname, 'user-dashboard')));
app.use('/login-page', express.static(path.join(__dirname, 'login-page')));

// API routes
app.use('/api/auth', authRoutes.router); // Use authRoutes.router since middleware/auth.js exports { router, auth, authorize }
app.use('/api/exams', examRoutes);

// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'login-page', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'login-page', 'register.html'));
});

app.get('/HR-dashboard', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'HR-dashboard', 'index.html'));
});

app.get('/user-dashboard', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'user-dashboard', 'index.html'));
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Access the application at: http://localhost:${PORT}`);
});