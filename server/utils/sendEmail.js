const nodemailer = require("nodemailer");
require("dotenv").config()

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
        
      host: 'smtp.gmail.com',
  port: 465, // 587 ki jagah 465 try karein (Secure Connection)
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false // Connectivity issues bypass karne ke liye
  }
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