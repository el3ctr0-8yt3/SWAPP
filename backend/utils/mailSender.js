// utils/mailSender.js
const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  console.log(email);
  try {
    // Create a Transporter to send emails
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    // Send emails to users
    // console.log("Sending email to: ", email);

    let info = await transporter.sendMail({
      from: "shecksbroneatgmail.com",
      to: String(email),
      subject: title,
      html: body,
    });
    console.log("Email info: ", info);
    return info;
  } catch (error) {
    console.log("Error occurred while sending email: ");
    console.log(error.message);
  }
};
module.exports = mailSender;
