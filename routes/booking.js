const express = require("express");
const { verifyRoutesJwt } = require("../controllers/jwtVerifiedRoute");
const router = express.Router();
const { BOOKING } = require("../models/model");

// GET USER DETAILS
router.get("/", verifyRoutesJwt, async (req, res) => {
  res.json({
    user: req.user,
    posts: {
      title: "my FIrst Post",
    },
  });
});

//GET ALL BOOKINGS
router.get("/booking", verifyRoutesJwt, async (req, res) => {
  //Booking Logics here
  const user = req.user;
  const bookings = await BOOKING.find({ email: user });
  res.status(200).send({ status: "ok", bookings: bookings });
});
//New Booking
router.post("/new", verifyRoutesJwt, async (req, res) => {
  //New BOOking Logics here
  const user = req.user;
  console.log(user);
  const book = new BOOKING({
    name: "lalji",
    email: user,
    contact: 931259192,
    book_date: Date.now(),
    googleCalendar: {
      calendar_Name: "primary",
      message: "booking Successfull",
    },
  });
  book.save();
  res.status(200).send({ status: "ok", message: "Booking Done Successfully" });
});

//Update a Booking
router.put("/booking/:id", verifyRoutesJwt, async (req, res) => {
  //updating booking logics here
  console.log(req.body);
  const BookingId = req.params.id;
  const user = req.user;
  const updateBooking = await BOOKING.findOne({ _id: BookingId, email: user });
  updateBooking.googleCalendar = req.body.googleCalendar;
  updateBooking.save();
  res
    .status(404)
    .json({ status: "ok", message: "Booking Updated SuccessFully" });
});

//delete a Booking
router.delete("/booking/:id", verifyRoutesJwt, async (req, res) => {
  //deleting booking Logics here
  const BookingId = req.params.id;
  const user = req.user;
  const deleteBooking = await BOOKING.findOneAndDelete({
    _id: BookingId,
    email: user,
  });
  console.log(deleteBooking);
  if (deleteBooking) {
    res
      .status(202)
      .json({ status: "ok", message: "Booking Deleted Successfully" });
  } else {
    res.status(404).json({ status: "error", message: "Booking Didn't Find" });
  }
});

//export router
module.exports = router;
