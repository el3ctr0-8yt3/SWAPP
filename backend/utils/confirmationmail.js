const mailSender = require("./mailSender");

async function sendConfirmation(email) {
  try {
    const mailResponse = await mailSender(
      email,
      "Account Verified | SWAPP",
      `<h2> Welcome to SWAPP! </h2>
       <p> A platform which makes it easier for you to swap courses with other fellow students. </p>
       <p> Your account was successfully verified. Now you can start browsing courses! </p>
       <p> Happy Swapping! :) </p>
       <p> This is an automatically generated email. Please donot respond. </p>
       <p>Best, <br> Team SWAPP</p>`,
    );
    console.log("Email sent successfully: ", mailResponse);
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    throw error;
  }
}

module.exports = sendConfirmation;
