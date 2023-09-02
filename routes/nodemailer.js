const nodemailer = require("nodemailer");

module.exports.sendMail = async function sendMail(str, data) {
  try {
    const smtpConfig = {
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === "true", // Set to "true" for secure connection
      auth: {
        user: process.env.SMTP_USER || 'nikhil23fbd@gmail.com',
        pass: process.env.SMTP_PASSWORD || "potwosenqfcybkju"
      }
    };
    const transporter = nodemailer.createTransport(smtpConfig);

    let Osubject, Ohtml;
    if (str === "signup") {
      Osubject = `Thank you for signing up, ${data.name}`;
      Ohtml = `<h1>Welcome!</h1><p>Name: ${data.name}</p>`;
    } else if (str === 'resetPassword') {
      Osubject = `Reset Password`;
      Ohtml = `<h1>Reset Your Password</h1><p>Reset Link: ${data.resetPasswordLink}</p>`;
    }

    // Send the email
    const info = await transporter.sendMail({
      from: '"nikhil" <nikhil23fbd@gmail.com>',
      to: data.email,
      subject: Osubject,
      html: Ohtml
    });

    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};


