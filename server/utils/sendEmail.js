const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (to, subject, text) => {
  try {

    // Create Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },

      connectionTimeout: 10000,
    });

    // Verify Connection
    await transporter.verify();

    // Mail Options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,

      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>${subject}</h2>
          <p>${text}</p>
        </div>
      `,
    };

    // Send Email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email Sent:", info.response);

    return {
      success: true,
      message: "Email sent successfully",
    };

  } catch (error) {

    console.log("Email Error:", error);

    return {
      success: false,
      message: error.message,
    };
  }
};

module.exports = sendEmail;