const jwt = require("jsonwebtoken");
const { DBUSER } = require("../models/model");
const {
  hashingPassword,
  verifyJWT,
  createJWT,
  registerValidation,
  forgotValidation,
  loginValidation,
  checkHashedPass,
  inum,
  passwordValidation,
} = require("../validation");
const { generateOTP } = require("../services/otp");
const { mail, sendSibEmail } = require("../services/email");

//Login Authentications
async function loginController(req, res) {
  const validatedCreds = await loginValidation(req.body);
  console.log(validatedCreds);
  if (validatedCreds.error) {
    return res.status(422).json({
      error: inum.ERROR,
      message: validatedCreds.error.message.replaceAll(`\"`, ""),
    });
  } else {
    //login logics
    const checkEmail = await DBUSER.findOne({
      email: validatedCreds.value.email,
    });
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
          .json({ status: inum.IDLE, user: checkEmail, jwt: provideJWT });
      } else {
        res
          .status(401)
          .json({ status: inum.ERROR, message: "Password Incorrect" });
      }
    } else {
      res.status(404).json({ status: inum.ERROR, message: "User Not Found" });
    }
  }
}

//Register Authentications...
async function registerController(req, res) {
  const requestedData = req.body;
  const validatedData = registerValidation(requestedData);
  // check error
  if (validatedData.error) {
    return res.status(422).json({
      error: inum.ERROR,
      message: validatedData.error.message.replaceAll(`\"`, ""),
    });
  } else {
    //Validation Succes Logics Here
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
        status: inum.IDLE,
        message: "User Registered Successfully",
        jwt: provideJWT,
      });
    } else if (credsCheck) {
      console.log("User Already Available", credsCheck);
      res
        .status(409)
        .json({ status: inum.ERROR, message: "User Already registered" });
    }
  }
}

//forgot password....
async function forgotPasswordController(req, res) {
  console.log("Forgot Api", req.body);
  const validateEmail = await forgotValidation(req.body);
  console.log(validateEmail);
  if (validateEmail.error) {
    res.status(422).json({
      error: inum.ERROR,
      message: validateEmail.error.message.replaceAll(`\"`, ""),
    });
  } else {
    //send mail  to email address with a reset link
    const verifyParameters = await createJWT(validateEmail.value.email);
    sendSibEmail(
      validateEmail.value.email,
      "Forgot Password Email",
      `Click on the link povided and enter new password ${process.env.FRONTEND_URL}/auth/verfiyforgot/${verifyParameters}
      }`
    );
    res.status(200).json({
      status: inum.IDLE,
      message: `please check your email address ${validateEmail.value.email}`,
    });
  }
}
//verify forgot passowrd .....
async function verifyforgotPasswordController(req, res) {
  const newLoginCreds = req.body;
  try {
    const email = await verifyJWT(req.params.jwt);
    console.log(newLoginCreds);
    validatedPassword = await loginValidation({
      email: email.data,
      password: newLoginCreds.password,
    });
    console.log("validatedPassword", validatedPassword);
    if (validatedPassword.error) {
      res.status(422).json({
        error: inum.ERROR,
        message: validatedPassword.error.message.replaceAll(`\"`, ""),
      });
    } else {
      const user = await DBUSER.findOne({
        email: validatedPassword.value.email,
      });
      console.log(user);
      const hashedNewPassword = await hashingPassword(
        validatedPassword.value.password
      );
      console.log("hashedNewPassword", hashedNewPassword);
      user.password = hashedNewPassword;
      await user.save();
      res.status(200).json({
        status: inum.IDLE,
        message:
          "New Password Updated Successfully. Use your new password to login",
      });
    }
  } catch (error) {
    res.send(error);
    res.status(422).json({
      status: inum.ERROR,
      message: "url validation error please check the url provided",
    });
  }
}

module.exports = {
  loginController,
  registerController,
  forgotPasswordController,
  verifyforgotPasswordController,
};
