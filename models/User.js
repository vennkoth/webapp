const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        enum: ['student', 'admin'],
        default: 'student'
    },
    dob: String,
    collegeName: String,
    course: String,
    yearOfStudy: String,
    resumeUrl: String,

    assignedTests: [
        {
            testId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Test'
            },
            assignedAt: Date
        }
    ]
}, {
    timestamps: true
});

// Password hashing before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
// This code defines a Mongoose schema for a User model, which includes fields for full name, email, password, role, date of birth, college name, course, year of study, resume URL, and assigned tests. It also includes password hashing functionality and a method to compare passwords.