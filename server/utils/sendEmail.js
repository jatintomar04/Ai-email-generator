const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (to, subject, text) => {

  try {

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },

      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html: `<p>${text}</p>`
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("MAIL SENT:", info.response);

    return true;

  } catch (error) {

    console.log("EMAIL ERROR:", error);

    throw new Error(error.message);
  }
};

module.exports = sendEmail;