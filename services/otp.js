const otpGenerator = require("otp-generator");

const OTP_LENGTH = process.env.OTP_LENGTH || 6;
const OTP_CONFIG = {
  upperCaseAlphabets: true,
  specialChars: false,
};

module.exports.generateOTP = () => {
  const OTP = otpGenerator.generate(OTP_LENGTH, OTP_CONFIG);
};
