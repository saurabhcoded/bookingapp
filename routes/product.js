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
  const id = req.params.id;
  const user = req.user;
  const body = req.body;
  const response = await updateProductController(user, id, body);
  res.status(200).json(response.data);
});
router.delete("/delete/:id", verifyRoutesJwt, async (req, res) => {
  //product delete logics here
  const user = req.user;
  const id = req.params.id;
  const body = req.body;
  const response = await deleteProductController(user, id, body);
  console.log(response);
  res.status(response.statusCode).json(response.data);
});
// modules exports
module.exports = router;
