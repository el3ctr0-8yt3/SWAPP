const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
  },
});
// Define a function to send emails
async function sendVerificationEmail(email, otp) {
  try {
    const mailResponse = await mailSender(
      email,
      "Account Verification | SWAPP",
      `<h1>Account Confirmation</h1>
       <h4> Welcome to SWAPP! </h4>
       <p>Here is your OTP code: ${otp}</p>
       <p>Use this OTP to verify your SWAPP account. Note that this OTP will expire in 5 minutes. Happy Swapping! :) </p>
       <p> If you did not request this OTP, please ignore this email. </p>
       <p> This is an automatically generated email. Please donot respond. </p>
       <p>Best, <br> Team SWAPP</p>`,
    );
    console.log("Email sent successfully: ", mailResponse);
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}

otpSchema.pre("save", async function (next) {
  console.log("New document saved to the database");
  // Only send an email when a new document is created
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

module.exports = mongoose.model("OTP", otpSchema);
exports.otpSchema = otpSchema;
