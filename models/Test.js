const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: String,
  questionType: String,
  subject: String,
  difficulty: String,
  options: [String],          // only for MCQ
  correctAnswer: mongoose.Schema.Types.Mixed // string or number
});

const testSchema = new mongoose.Schema({
  name: String,
  role: String,
  duration: Number,
  dateAdded: Date,
  questions: [questionSchema]
});

module.exports = mongoose.model('Test', testSchema);
