require('dotenv').config();
const nodemailer = require('nodemailer');

async function sendWelcomeMail(email, fullName) {
    // Check for required env variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('[WELCOME MAIL ERROR] EMAIL_USER or EMAIL_PASS not set in .env');
        throw new Error('Email credentials not set');
    }

    try {
        console.log('[WELCOME MAIL] Called with:', { email, fullName });
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Verify transporter configuration
        try {
            await transporter.verify();
            console.log('[MAILER] Transporter verified successfully.');
        } catch (verifyErr) {
            console.error('[MAILER] Transporter verification failed:', verifyErr);
            throw verifyErr;
        }

        const mailOptions = {
            from: `"Posspole" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Welcome to Posspole! 🎉',
            text: `Hi ${fullName},

Thank you for registering with Posspole! 🎉
We’re thrilled to have you on board.

Regards,
Team Posspole,
Also check out our website at https://posspole.com`,
            
        };

        console.log('[WELCOME MAIL] Sending mail with options:', mailOptions);

        const info = await transporter.sendMail(mailOptions);
        console.log(`[WELCOME MAIL SENT] to ${email}: ${info.messageId}`);
        console.log('[WELCOME MAIL INFO]', info);
        return info;
    } catch (error) {
        console.error(`[WELCOME MAIL ERROR] to ${email}:`, error);
        throw new Error('Failed to send welcome mail: ' + error.message);
    }
}

module.exports = sendWelcomeMail;
