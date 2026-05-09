const nodemailer = require("nodemailer");
require("dotenv").config()

const sendEmail = async (to, subject, text) => {

   console.log("EMAIL:", process.env.EMAIL_USER);
  console.log("PASSWORD EXISTS:", !!process.env.EMAIL_PASS);
  try {
    const transporter = nodemailer.createTransport({
        
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to : to,
      subject : subject,
      text :  text,
      html : `<p>${text}</p>`
    };

    await transporter.sendMail(mailOptions);
    

  } catch (error) {
    console.log("Email error:", error.message);
  }
};

module.exports = sendEmail;