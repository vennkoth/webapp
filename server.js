const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Import routes
const authRoutes = require('./routes/auth');
const examRoutes = require('./routes/exam');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'login-page')));
app.use('/hr', express.static(path.join(__dirname, 'HR-dashboard')));
app.use('/user', express.static(path.join(__dirname, 'user-dashboard')));
app.use('/components', express.static(path.join(__dirname, 'components')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('MongoDB connection error:', err));

// Main route serves the login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login-page', 'login.html'));
});

// HR dashboard route
app.get('/hr', (req, res) => {
    res.sendFile(path.join(__dirname, 'HR-dashboard', 'index.html'));
});

// User dashboard route
app.get('/user', (req, res) => {
    res.sendFile(path.join(__dirname, 'user-dashboard', 'user.html'));
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/exams', examRoutes);

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