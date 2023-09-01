const nodemailer = require('nodemailer');

// Create a Nodemailer transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'your@gmail.com', // Your Gmail email address
    pass: 'your-password', // Your Gmail password (consider using an app password for security)
  },
});

module.exports.sendMail = async function sendMail(str, data) {
  try {
    var Osubject, Ohtml;

    if (str === 'signup') {
      Osubject = `Thank you for signing up, ${data.name}`;
      Ohtml = `<h1>Welcome, ${data.name}!</h1>`;
    } else if (str === 'resetPassword') {
      Osubject = 'Reset Password';
      Ohtml = `<h1>Food App</h1><p>${data.resetPasswordLink}</p>`;
    }

    // Construct the mailOptions object
    const mailOptions = {
      from: 'your@gmail.com', // Replace with your Gmail email address
      to: data.email,
      subject: Osubject,
      html: Ohtml,
    };

    // Send the email using the Gmail SMTP transporter
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent: ' + info.response);
  } catch (err) {
    console.error('Error sending email:', err);
    // Handle the error as needed
  }
};


