const express = require("express");
const { verifyRoutesJwt } = require("../controllers/jwtVerifiedRoute");
const {
  getProductController,
  newProductController,
  updateProductController,
  deleteProductController,
} = require("../controllers/product,");
const router = express.Router();

router.get("/", verifyRoutesJwt, async (req, res) => {
  //Provide all booked items4
  const user = req.user;
  const body = req.body;
  const response = await getProductController(user, body);
  res.status(200).json(response.data);
});
router.post("/new", verifyRoutesJwt, async (req, res) => {
  //New Booking Logics here
  const user = req.user;
  const body = req.body;
  console.log("body", req.body);
  console.log("new ROutes Appi");
  const response = newProductController(user, body);
  res.status(200).json(response.data);
});
router.put("/update/:id", verifyRoutesJwt, async (req, res) => {
  //product Update Logics here
  const user = req.user;
  const body = req.body;
  const response = await updateProductController(user, body);
  res.status(200).json(response.data);
});
router.delete("/delete/:id", verifyRoutesJwt, (req, res) => {
  //product delete logics here
  const user = req.user;
  const body = req.body;
  const response = deleteProductController(user, body);
  res.status(response.statusCode).json(response.data);
});
// modules exports
module.exports = router;
