const express = require('express');
const router = express.Router();
const Test = require('../models/Test');

// ADD QUESTION TO TEST
router.post('/:testId/add-question', async (req, res) => {
    try {
        const testId = req.params.testId;
        const { questionText, questionType, options, correctAnswer, subject, difficulty } = req.body;

        if (!questionText || !questionType || !subject || !difficulty) {
            return res.status(400).json({ message: 'Missing required fields.' });
        }

        if (questionType === 'mcq') {
            if (!Array.isArray(options) || options.length < 2) {
                return res.status(400).json({ message: 'MCQ needs at least two options.' });
            }
            if (typeof correctAnswer !== 'number' || correctAnswer < 0 || correctAnswer >= options.length) {
                return res.status(400).json({ message: 'Invalid correct answer index.' });
            }
        }

        if (['subjective', 'reasoning'].includes(questionType)) {
            if (!correctAnswer || typeof correctAnswer !== 'string') {
                return res.status(400).json({ message: 'Subjective/Reasoning answer required.' });
            }
        }

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

        if (!updatedTest) return res.status(404).json({ message: 'Test not found.' });

        res.status(201).json({ message: 'Question added', test: updatedTest });
    } catch (err) {
        console.error('Add Question Error:', err);
        res.status(500).json({ message: 'Error adding question' });
    }
});

// FETCH QUESTIONS
router.get('/:testId/questions', async (req, res) => {
    try {
        const test = await Test.findById(req.params.testId);
        if (!test) return res.status(404).json({ message: 'Test not found.' });
        res.json({ questions: test.questions || [] });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching questions' });
    }
});

// DELETE A QUESTION
router.delete('/:testId/questions/:questionId', async (req, res) => {
    try {
        const { testId, questionId } = req.params;
        const updatedTest = await Test.findByIdAndUpdate(
            testId,
            { $pull: { questions: { _id: questionId } } },
            { new: true }
        );
        if (!updatedTest) return res.status(404).json({ message: 'Test not found.' });
        res.json({ message: 'Question deleted', test: updatedTest });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting question' });
    }
});

// UPDATE A QUESTION
router.put('/:testId/questions/:questionId', async (req, res) => {
    try {
        const { testId, questionId } = req.params;
        const { questionText, options, correctAnswer } = req.body;

        const test = await Test.findById(testId);
        if (!test) return res.status(404).json({ message: 'Test not found' });

        const question = test.questions.id(questionId);
        if (!question) return res.status(404).json({ message: 'Question not found' });

        question.questionText = questionText;
        question.options = options;
        question.correctAnswer = correctAnswer;

        await test.save();
        res.json({ message: 'Question updated', question });
    } catch (err) {
        res.status(500).json({ message: 'Error updating question' });
    }
});

// ✅ ASSIGN CANDIDATE TO TEST (Only One Version!)
router.post('/:testId/assign', async (req, res) => {
    try {
        const { testId } = req.params;
        const { userId } = req.body;

        if (!userId) return res.status(400).json({ message: 'User ID is required' });

        const test = await Test.findById(testId);
        if (!test) return res.status(404).json({ message: 'Test not found' });

        if (!test.candidates.includes(userId)) {
            test.candidates.push(userId);
            await test.save();
        }

        res.status(200).json({ message: 'Candidate assigned', test });
    } catch (err) {
        console.error('Assign error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// ✅ REMOVE CANDIDATE FROM TEST
router.post('/:testId/remove', async (req, res) => {
    try {
        const { testId } = req.params;
        const { userId } = req.body;

        const test = await Test.findById(testId);
        if (!test) return res.status(404).json({ message: 'Test not found' });

        test.candidates = test.candidates.filter(id => id.toString() !== userId);
        await test.save();

        res.status(200).json({ message: 'Candidate removed', test });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// ✅ GET TEST WITH ASSIGNED CANDIDATES
router.get('/:testId', async (req, res) => {
    try {
        const test = await Test.findById(req.params.testId).populate('candidates', 'fullName email');
        if (!test) return res.status(404).json({ message: 'Test not found' });
        res.json(test);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching test' });
    }
});

module.exports = router;
