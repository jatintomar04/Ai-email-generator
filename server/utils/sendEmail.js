const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (to, subject, text) => {

  console.log("EMAIL:", process.env.EMAIL_USER);
  console.log("PASSWORD EXISTS:", !!process.env.EMAIL_PASS);

  try {

    const transporter = nodemailer.createTransport({

      host: "smtp.gmail.com",
      port: 587,
      secure: false,

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },

      tls: {
        rejectUnauthorized: false,
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

    console.log("MAIL SENT:", info.response);

  } catch (error) {

    console.log("Email error:", error.message);

    throw new Error(error.message);
  }
};

module.exports = sendEmail;