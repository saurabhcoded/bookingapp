const { response } = require("express");
const { DBUSER } = require("../models/model");
const { inum, updateValidation, deleteValidation } = require("../validation");

async function getUserController(req, res) {
  console.log(req.user);
  const user = await DBUSER.find({ email: req.user });
  res.status(200).json({
    status: inum.IDLE,
    message: "user fetched successfully",
    user: user,
  });
}
async function updateUserController(req, res) {
  console.log(req.user);
  const body = req.body;
  const validatedUser = await updateValidation(req.body);
  console.log(validatedUser);
  if (validatedUser.error) {
    res.status(422).json({
      error: inum.ERROR,
      message: validatedUser.error.message.replaceAll(`\"`, ""),
    });
  } else {
    const newBody = { ...body, updated_on: new Date() };
    try {
      await DBUSER.findOneAndUpdate({ email: req.user }, { ...newBody }).then(
        (response) => {
          res.status(200).json({
            status: inum.IDLE,
            message: `User  ${response.name} updated successfully. user ID ${response._id}`,
          });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(404).json({
        status: inum.ERROR,
        message: error,
      });
    }
  }
}
async function deleteUserController(req, res) {
  const user = req.user;
  const body = req.body;
  const validatedUser = await deleteValidation(req.body);
  console.log(validatedUser);
  if (validatedUser.error) {
    res.status(422).json({
      error: inum.ERROR,
      message: validatedUser.error.message.replaceAll(`\"`, ""),
    });
  } else {
    if (body.email == user) {
      await DBUSER.findOneAndDelete({ email: body.email })
        .then((response) => {
          if (response) {
            res.status(200).json({
              status: inum.IDLE,
              message: response,
            });
          }
        })
        .catch((error) => {
          res.status(404).json({
            status: inum.ERROR,
            message: error,
          });
        });
    } else {
      res.status(404).json({
        error: inum.ERROR,
        message: "Wrong Email Address Provided",
      });
    }
  }
}
module.exports = {
  getUserController,
  updateUserController,
  deleteUserController,
};
