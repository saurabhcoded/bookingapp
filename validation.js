const Joi = require("joi");
const bcrpyt = require("bcrypt");
const JWT = require("jsonwebtoken");

const registerSchema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).max(100).required(),
  contact: Joi.number().min(12).required(),
  post: Joi.string().min(5).max(100).required(),
  password: Joi.string().min(5).max(100).required(),
});
const loginSchema = Joi.object({
  email: Joi.string().min(6).max(100).required(),
  password: Joi.string().min(5).max(100).required(),
});
const forgotSchema = Joi.object({
  email: Joi.string().min(6).max(100).required(),
});
// title: String,
// subtitle: String,
// description: String,
// image: String,
// price: Number,
// duration: Number,
// classes: Number,
// type: String,
// tag: String,
const bookingSchema = Joi.object({
  title: Joi.string().min(6).required(),
  subtitle: Joi.string().min(6).max(100).required(),
  description: Joi.string().min(6).max(500).required(),
  email: Joi.string().min(6).max(100).required(),
  image: Joi.string().min(6).max(200).required(),
  price: Joi.number().required(),
  duration: Joi.number().required(),
  classes: Joi.number().required(),
  type: Joi.string().min(6).required(),
  tag: Joi.array().min(1).required(),
});

// Register Validation
function registerValidation(data) {
  //validation
  return registerSchema.validate(data);
}

// login Validation
function loginValidation(data) {
  //validation
  return loginSchema.validate(data);
}
// Fogotten user Validation
function forgotValidation(data) {
  //validation
  return forgotSchema.validate(data);
}
//Booking Validation
async function bookingValidation(data) {
  return bookingSchema.validate(data);
}

//Hashing Password
async function hashingPassword(pass) {
  const salt = await bcrpyt.genSalt(10);
  return await bcrpyt.hash(pass, salt);
}

//Check Hashing Password
async function checkHashedPass(dbpass, pass) {
  return bcrpyt.compare(pass, dbpass).then((result) => {
    return result;
  });
}

//CreateJWT
async function createJWT(email) {
  return JWT.sign(
    {
      data: email,
    },
    process.env.JWT_SECRET,
    { expiresIn: 60 * 60 }
  );
}

//ValidateJWT
async function verifyJWT(token) {
  return JWT.verify(token, process.env.JWT_SECRET);
}
const inum = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
});

module.exports = {
  registerValidation,
  loginValidation,
  forgotValidation,
  bookingValidation,
  hashingPassword,
  checkHashedPass,
  inum,
  createJWT,
  verifyJWT,
};
