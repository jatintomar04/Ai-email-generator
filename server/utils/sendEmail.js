const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS :true,
      logger: true,
      debug:true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },

      tls: {
        rejectUnauthorized: false,
      },

      connectionTimeout: 10000,
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html: `<p>${text}</p>`,
    });

    console.log("Email Sent:", info.response);

  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = sendEmail;