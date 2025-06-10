const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Question text is required'],
        trim: true
    },
    options: [{
        type: String,
        required: [true, 'Option text is required'],
        trim: true
    }],
    correctAnswer: {
        type: Number,
        required: [true, 'Correct answer index is required'],
        min: [0, 'Correct answer index must be at least 0']
    },
    points: {
        type: Number,
        default: 1,
        min: [0, 'Points cannot be negative']
    }
});

const examSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Exam title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Exam description is required'],
        trim: true
    },
    role: {
        type: String,
        enum: ['Digital Marketing', 'SDE', 'Business Analyst', 'Data Analyst', 'Solution Engineer'],
        required: [true, 'Role is required']
    },
    duration: {
        type: Number,  // in minutes
        required: [true, 'Duration is required'],
        min: [1, 'Duration must be at least 1 minute']
    },
    startTime: {
        type: Date,
        required: [true, 'Start time is required']
    },
    endTime: {
        type: Date,
        required: [true, 'End time is required']
    },
    questions: [questionSchema],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Creator is required']
    },
    participants: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        status: {
            type: String,
            enum: ['pending', 'completed', 'missed'],
            default: 'pending'
        },
        score: {
            type: Number,
            default: 0,
            min: [0, 'Score cannot be negative']
        },
        submittedAt: {
            type: Date
        }
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Add validation to ensure endTime is after startTime
examSchema.pre('save', function (next) {
    if (this.endTime <= this.startTime) {
        return next(new Error('End time must be after start time'));
    }
    next();
});

// Index for faster queries on createdBy and role
examSchema.index({ createdBy: 1, role: 1 });

module.exports = mongoose.model('Exam', examSchema);