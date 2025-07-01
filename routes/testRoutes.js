const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Test = require('../models/Test');

// POST /api/tests/:testId/add-question
router.post('/:testId/add-question', async (req, res) => {
    try {
        const testId = req.params.testId;
        const { questionText, questionType, options, correctAnswer, subject, difficulty } = req.body;

        // Basic required fields
        if (!questionText || !questionType || !subject || !difficulty) {
            return res.status(400).json({ message: 'Invalid input: missing required fields.' });
        }

        // MCQ validation
        if (questionType === 'mcq') {
            if (!Array.isArray(options) || options.length < 2) {
                return res.status(400).json({ message: 'Invalid input: MCQ must have at least two options.' });
            }
            if (typeof correctAnswer !== 'number' || correctAnswer < 0 || correctAnswer >= options.length) {
                return res.status(400).json({ message: 'Invalid input: MCQ must have a valid correct answer index.' });
            }
        }

        // Subjective/Reasoning validation
        if ((questionType === 'subjective' || questionType === 'reasoning')) {
            if (!correctAnswer || typeof correctAnswer !== 'string') {
                return res.status(400).json({ message: 'Invalid input: correct answer required for subjective/reasoning.' });
            }
        }

        // Build question object
        const questionData = {
            questionText,
            questionType,
            subject,
            difficulty,
            ...(questionType === 'mcq' ? { options, correctAnswer } : { correctAnswer })
        };

        const updatedTest = await Test.findByIdAndUpdate(
            testId,
            { $push: { questions: questionData } },
            { new: true }
        );

        if (!updatedTest) {
            return res.status(404).json({ message: 'Test not found.' });
        }

        console.log('✅ Question added to test:', questionData);
        res.status(201).json({ message: 'Question added successfully', test: updatedTest });
    } catch (err) {
        console.error('❌ Error adding question:', err);
        res.status(500).json({ message: 'Error adding question', error: err.message });
    }
});

// GET /api/tests/:testId/questions
router.get('/:testId/questions', async (req, res) => {
    try {
        const testId = req.params.testId;
        const test = await Test.findById(testId);

        if (!test) {
            return res.status(404).json({ message: 'Test not found.' });
        }

        res.json({ questions: test.questions || [] });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching questions', error: err.message });
    }
});

// DELETE /api/tests/:testId/questions/:questionId
router.delete('/:testId/questions/:questionId', async (req, res) => {
    try {
        const { testId, questionId } = req.params;

        const updatedTest = await Test.findByIdAndUpdate(
            testId,
            {
                $pull: {
                    questions: { _id: questionId }
                }
            },
            { new: true }
        );

        if (!updatedTest) {
            return res.status(404).json({ message: 'Test not found.' });
        }

        res.json({
            message: 'Question deleted successfully',
            test: updatedTest
        });
    } catch (err) {
        console.error('❌ Error deleting question:', err);
        res.status(500).json({ message: 'Error deleting question', error: err.message });
    }
});

// PUT /api/tests/:testId/questions/:questionId
router.put('/:testId/questions/:questionId', async (req, res) => {
    const { testId, questionId } = req.params;
    const { questionText, options, correctAnswer } = req.body;
    try {
        const test = await Test.findById(testId);
        if (!test) {
            return res.status(404).json({ message: 'Test not found' });
        }
        // Find the question subdocument by _id
        const question = test.questions.id(questionId);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        // Update fields
        question.questionText = questionText;
        question.options = options;
        question.correctAnswer = correctAnswer;

        await test.save();
        res.json({ message: 'Question updated!', question, test });
    } catch (err) {
        console.error('Error updating question:', err);
        res.status(500).json({ message: 'Error updating question', error: err.message });
    }
});

module.exports = router;
