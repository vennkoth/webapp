const express = require('express');
const router = express.Router();
const Exam = require('../models/Exam');
const { auth, authorize } = require('../middleware/authMiddleware');

// Create new exam (HR only)
router.post('/', auth, authorize('hr', 'admin'), async (req, res) => {
    try {
        const exam = new Exam({
            ...req.body,
            createdBy: req.user._id
        });
        await exam.save();
        res.status(201).json(exam);
    } catch (error) {
        res.status(400).json({ message: 'Error creating exam', error: error.message });
    }
});

// Get all exams (HR only)
router.get('/all', auth, authorize('hr', 'admin'), async (req, res) => {
    try {
        const exams = await Exam.find().populate('createdBy', 'username');
        res.json(exams);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching exams', error: error.message });
    }
});

// Get user's assigned exams
router.get('/my-exams', auth, async (req, res) => {
    try {
        const exams = await Exam.find({
            'participants.user': req.user._id,
            startTime: { $gte: new Date() }
        });
        res.json(exams);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching exams', error: error.message });
    }
});

// Get specific exam
router.get('/:id', auth, async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.id);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        res.json(exam);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching exam', error: error.message });
    }
});

// Submit exam
router.post('/:id/submit', auth, async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.id);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }

        const participantIndex = exam.participants.findIndex(
            p => p.user.toString() === req.user._id.toString()
        );

        if (participantIndex === -1) {
            return res.status(403).json({ message: 'Not authorized to take this exam' });
        }

        // Calculate score
        const answers = req.body.answers;
        let score = 0;
        answers.forEach((answer, index) => {
            if (exam.questions[index] && answer === exam.questions[index].correctAnswer) {
                score += exam.questions[index].points;
            }
        });

        // Update participant's score and status
        exam.participants[participantIndex].score = score;
        exam.participants[participantIndex].status = 'completed';
        exam.participants[participantIndex].submittedAt = new Date();

        await exam.save();

        res.json({
            message: 'Exam submitted successfully',
            score,
            totalPoints: exam.questions.reduce((sum, q) => sum + q.points, 0)
        });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting exam', error: error.message });
    }
});

// Update exam (HR only)
router.put('/:id', auth, authorize('hr', 'admin'), async (req, res) => {
    try {
        const exam = await Exam.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        res.json(exam);
    } catch (error) {
        res.status(500).json({ message: 'Error updating exam', error: error.message });
    }
});

// Delete exam (HR only)
router.delete('/:id', auth, authorize('hr', 'admin'), async (req, res) => {
    try {
        const exam = await Exam.findByIdAndDelete(req.params.id);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }
        res.json({ message: 'Exam deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting exam', error: error.message });
    }
});

module.exports = router;