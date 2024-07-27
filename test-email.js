const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtppro.zoho.eu',
    port: 465,
    secure: true,
    auth: {
        user: 'support@oliehandelvisbv.nl',
        pass: 'Dry7$stz',
    },
});

const mailOptions = {
    from: 'support@oliehandelvisbv.nl',
    to: 'storage@oliehandelvisbv.nl',
    subject: 'Test Email',
    text: 'This is a test email from Nodemailer.',
    html: '<p>This is a test email from Nodemailer.</p>',
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending test email:', error);
    } else {
        console.log('Test email sent:', info.response);
    }
});
