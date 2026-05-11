const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text: text,
      html: `<p>${text}</p>`,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email Sent:", info.response);

    return info;

  } catch (error) {
    console.log("Email Error:", error.message);
    throw error;
  }
};

module.exports = sendEmail;