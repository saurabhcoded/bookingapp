const express = require("express");
const router = express.Router();
const { DBUSER } = require("../models/model");
const {
  registerValidation,
  createJWT,
  forgotValidation,
  hashingPassword,
  loginValidation,
  checkHashedPass,
  verifyJWT,
} = require("../validation");
const { generateOTP } = require("../services/otp");
const { mail, sendSibEmail } = require("../services/email");
const {
  verifyforgotPasswordController,
  loginController,
  registerController,
  forgotPasswordController,
} = require("../controllers/auth");

router.post("/login", loginController);
router.post("/register", registerController);
router.post("/forgotuser", forgotPasswordController);
router.post("/verfiyforgot/:jwt", verifyforgotPasswordController);

module.exports = router;
