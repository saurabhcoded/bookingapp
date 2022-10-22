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

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.forgotValidation = forgotValidation;
module.exports.hashingPassword = hashingPassword;
module.exports.checkHashedPass = checkHashedPass;
module.exports.createJWT = createJWT;
module.exports.verifyJWT = verifyJWT;
