const express = require("express");
const { verifyRoutesJwt } = require("../controllers/jwtVerifiedRoute");
const {
  getProductController,
  newProductController,
  updateProductController,
  deleteProductController,
} = require("../controllers/product");
const router = express.Router();

// router.get("/", verifyRoutesJwt, async (req, res) => {
//   //Provide all booked items4
//   const user = req.user;
//   const body = req.body;
//   const response = await getProductController(user, body);
//   res.status(200).json(response.data);
// });
router.get("/", verifyRoutesJwt, getProductController);
router.post("/new", verifyRoutesJwt, newProductController);
router.put("/update/:id", verifyRoutesJwt, updateProductController);
router.delete("/delete/:id", verifyRoutesJwt, deleteProductController);
// modules exports
module.exports = router;
