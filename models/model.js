const { date } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  contact: Number,
  post: String,
  password: String,
  verified: Boolean,
  created_on: {
    type: Date,
    default: Date.now,
  },
  updated_on: {
    type: Date,
    default: Date.now,
  },
});
const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  contact: Number,
  book_date: Date,
  googleCalendar: {
    type: Object,
    required: true,
  },
  created_on: {
    type: Date,
    default: Date.now,
  },
  updated_on: {
    type: Date,
    default: Date.now,
  },
});

module.exports.DBUSER = mongoose.model("userSchema", userSchema);
module.exports.BOOKING = mongoose.model("bookingSchema", bookingSchema);
