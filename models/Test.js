const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: String,
  options: [String],
  correct: Number
});

const testSchema = new mongoose.Schema({
  name: String,
  role: String,
  dateAdded: String,
  duration: Number,
  candidates: [String],
  questions: [questionSchema]
});

module.exports = mongoose.model('Test', testSchema);
