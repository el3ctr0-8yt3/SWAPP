// controllers/otpController.js
const otpGenerator = require("otp-generator");
const OTP = require("../model/otp");
const { User } = require("../model/user");

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    // Check if user is already present
    const checkUserPresent = await User.findOne({ email });
    // If user found with provided email
    // if (!req.body.email.endsWith("@st.habib.edu.pk")) {
    //   console.log(
    //     "The email is not valid. Please enter a valid Habootar email.",
    //   );
    //   return res.status(400).json({
    //     success: false,
    //     message: "The email is not valid. Please enter a valid Habootar email.",
    //   });
    // }
    if (checkUserPresent) {
      console.log("User is already registered");
      return res.status(401).json({
        success: false,
        message: "User is already registered",
      });
    }
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let result = await OTP.findOne({ otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await OTP.findOne({ otp });
    }
    const otpPayload = { email, otp };
    const otpBody = await OTP.create(otpPayload);
    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      // otp,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};
