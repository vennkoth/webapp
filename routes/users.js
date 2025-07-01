const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Search users by name/email
router.get('/search', async (req, res) => {
  try {
    const query = req.query.query || '';
    const users = await User.find({
      $or: [
        { fullName: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } }
      ],
      role: 'student'
    }).limit(10);

    res.json(users.map(user => ({
      id: user._id,
      name: user.fullName,
      email: user.email
    })));
  } catch (err) {
    console.error('User search error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

// Get all students
router.get('/students', async (req, res) => {
  try {
    const students = await User.find({ role: 'student' });
    res.json(students);
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
