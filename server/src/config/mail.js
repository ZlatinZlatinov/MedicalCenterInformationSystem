const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

async function sendVerificationEmail(to, token) {
    const verifyUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

    const message = {
        from: process.env.SMTP_SENDER,
        to,
        subject: 'Please verify your email',
        html: `
        <h3>Welcome to MediCare!</h3>
        <p>Click the link below to verify your email address::</p>
        <a href="${verifyUrl}">Verify Email</a>
        <p>This link expires in 24 hours.</p>
        `
    };

    await transporter.sendMail(message);

    console.log('Mail sent successfully to, ', to);
}

module.exports = { transporter, sendVerificationEmail };