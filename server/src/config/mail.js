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

// Shared inline-styled template to keep emails visually aligned with the site.
const buildEmailTemplate = ({ title, subtitle, body, buttonLabel, buttonHref }) => {
    const fontStack = "'Segoe UI', Arial, sans-serif";
    const primaryBlue = '#3c83f6';
    const primaryOrange = '#f97015';
    const textColor = '#343a40';
    const mutedText = '#7a7e97';
    const borderColor = '#e1e7ef';
    const cardBg = '#ffffff';
    const pageBg = '#fcfdff';

    const button = buttonHref
        ? `<a href="${buttonHref}" style="display:inline-block;padding:12px 18px;background:${primaryBlue};color:#fff;text-decoration:none;border-radius:10px;font-weight:700;border:2px solid ${primaryBlue};">${buttonLabel}</a>`
        : '';

    return `
    <div style="margin:0;padding:0;background:${pageBg};font-family:${fontStack};color:${textColor};">
        <div style="max-width:560px;margin:24px auto;padding:0 16px;">
            <div style="background:${cardBg};border:1px solid ${borderColor};border-radius:14px;padding:28px;box-shadow:0 8px 24px rgba(0,0,0,0.04);">
                <div style="margin-bottom:12px;">
                    <div style="font-size:13px;color:${mutedText};letter-spacing:0.6px;text-transform:uppercase;font-weight:700;">MediCare</div>
                    <h1 style="margin:6px 0 4px;font-size:22px;color:${primaryBlue};">${title}</h1>
                    ${subtitle ? `<div style="font-size:14px;color:${mutedText};">${subtitle}</div>` : ''}
                </div>
                <div style="font-size:15px;line-height:1.6;color:${textColor};">
                    ${body}
                </div>
                ${button ? `<div style="margin-top:18px;">${button}</div>` : ''}
                <div style="margin-top:16px;font-size:12px;color:${mutedText};">
                    If the button does not work, copy and paste the link into your browser.
                    ${buttonHref ? `<div style="word-break:break-all;margin-top:4px;">${buttonHref}</div>` : ''}
                </div>
            </div>
            <div style="text-align:center;margin-top:12px;font-size:11px;color:${mutedText};">
                Powered by MediCare • This is an automated message, please do not reply.
            </div>
        </div>
    </div>
    `;
};

async function sendVerificationEmail(to, token) {
    const verifyUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

    const html = buildEmailTemplate({
        title: 'Verify your email',
        subtitle: 'Welcome to MediCare',
        body: `
            <p>Thanks for signing up! Please confirm your email to activate your account.</p>
            <p>This link expires in 24 hours.</p>
        `,
        buttonLabel: 'Verify Email',
        buttonHref: verifyUrl,
    });

    const message = {
        from: process.env.SMTP_SENDER,
        to,
        subject: 'Please verify your email',
        html,
    };

    await transporter.sendMail(message);

    console.log('Mail sent successfully to, ', to);
}

async function sendAppointmentConfirmationEmail(to, doctorName, appointmentDate, appointmentTime) {
    const html = buildEmailTemplate({
        title: 'Appointment confirmed',
        subtitle: `Dr. ${doctorName}`,
        body: `
            <p>Your appointment is scheduled.</p>
            <p><strong>Date:</strong> ${appointmentDate}</p>
            <p><strong>Time:</strong> ${appointmentTime}</p>
            <p>If you need to reschedule, please visit your dashboard.</p>
        `,
        buttonLabel: 'View Appointment',
        buttonHref: `${process.env.CLIENT_URL}/appointments`,
    });

    const message = {
        from: process.env.SMTP_SENDER,
        to,
        subject: 'Appointment booked successfully',
        html,
    };

    await transporter.sendMail(message);
    console.log('Confirmation appointment email sent!');
}

async function sendDoctorApprovalEmail(to, doctorName) {
    const html = buildEmailTemplate({
        title: 'You are approved!',
        subtitle: `Welcome, Dr. ${doctorName}`,
        body: `
            <p>Congratulations, you have been approved as a Doctor at MediCare.</p>
            <p>You can now access your dashboard to manage your schedule.</p>
        `,
        buttonLabel: 'Go to Dashboard',
        buttonHref: `${process.env.CLIENT_URL}/doctor/dashboard`,
    });

    const message = {
        from: process.env.SMTP_SENDER,
        to,
        subject: 'Doctor approval',
        html,
    };

    await transporter.sendMail(message);
    console.log('Doctor approval email sent!');
}

module.exports = {
    transporter,
    sendVerificationEmail,
    sendDoctorApprovalEmail,
    sendAppointmentConfirmationEmail,
};