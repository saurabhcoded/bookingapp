const express = require("express");
const { verifyRoutesJwt } = require("../controllers/jwtVerifiedRoute");
const {
  getUserController,
  updateUserController,
  deleteUserController,
} = require("../controllers/user");
const Router = express.Router();

// Get User Controller
Router.get("/", verifyRoutesJwt, getUserController);
//Update User Controller
Router.put("/", verifyRoutesJwt, updateUserController);
//Delete User Controller
Router.delete("/", verifyRoutesJwt, deleteUserController);

//Delete User Controller
module.exports = Router;
