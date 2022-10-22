const express = require("express");
const router = express.Router();
const { DBUSER } = require("../models/model");
const Joi = require("joi");
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

router.get("/", (req, res) => {
  res.send("hello");
});
router.post("/login", async (req, res) => {
  console.log(req.body);
  const validatedCreds = await loginValidation(req.body);
  console.log(validatedCreds);
  if (validatedCreds.error) {
    res
      .status(422)
      .json({ status: "error", messgae: "Validation error plz correct " });
  } else {
    //login logics
    const checkEmail = await DBUSER.findOne({
      email: validatedCreds.value.email,
    });
    console.log("check Email", checkEmail);
    if (checkEmail) {
      const checkPass = await checkHashedPass(
        checkEmail.password,
        validatedCreds.value.password
      );
      if (checkPass) {
        //if password true
        const provideJWT = await createJWT(validatedCreds.value.email);
        res
          .status(200)
          .json({ status: "ok", user: checkEmail, jwt: provideJWT });
      } else {
        res
          .status(401)
          .json({ status: "error", message: "Password Incorrect" });
      }
    }
  }
});
router.post("/register", async (req, res) => {
  const requestedData = req.body;
  const validatedData = registerValidation(requestedData);
  // check error
  if (validatedData.error) {
    return res.send("Validation Error");
  } else {
    //Validation Succes Logics Here
    console.log("passed Validation", validatedData);
    const credsCheck = await DBUSER.findOne({
      email: validatedData.value.email,
      contact: validatedData.value.contact,
    });
    if (!credsCheck) {
      const hashPassword = await hashingPassword(validatedData.value.password);
      const user = new DBUSER({
        name: validatedData.value.name,
        email: validatedData.value.email,
        contact: validatedData.value.contact,
        post: validatedData.value.post,
        password: hashPassword,
        verified: true,
      });
      const savedUser = await user.save(validatedData.value);
      console.log(savedUser);
      const provideJWT = await createJWT(validatedData.value.email);
      res.status(200).send({
        status: "ok",
        message: "User Registered Successfully",
        jwt: provideJWT,
      });
    } else if (credsCheck) {
      console.log("User Already Available", credsCheck);
      res
        .status(409)
        .json({ status: "OK", message: "User Already registered" });
    }
  }
});
router.post("/forgotuser", async (req, res) => {
  console.log("Forgot Api", req.body);
  const validateEmail = await forgotValidation(req.body);
  console.log(validateEmail);
  if (validateEmail.error) {
    res.status(422).json({ status: "error", message: "validation error" });
  } else {
    //send mail  to email address with a reset link
    const verifyParameters = await createJWT(validateEmail.value.email);
    sendSibEmail(
      validateEmail.value.email,
      `/auth/verfiyforgot/${verifyParameters}`
    );
    res.status(200).json({
      status: "ok",
      message: `please check your email address ${validateEmail.value.email}`,
    });
  }
});
router.post("/verfiyforgot/:jwt", async (req, res) => {
  const newLoginCreds = req.body;
  console.log(newLoginCreds);
  const email = await verifyJWT(req.params.jwt);
  const user = await DBUSER.findOne({ email: email.data });
  console.log(user);
  const hashedNewPassword = await hashingPassword(newLoginCreds.password);
  console.log("hashedNewPassword", hashedNewPassword);
  user.password = hashedNewPassword;
  await user.save();
});

module.exports = router;
