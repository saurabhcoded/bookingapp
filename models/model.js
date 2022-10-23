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
const productSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  description: String,
  email: String,
  image: String,
  price: Number,
  duration: Number,
  classes: Number,
  type: String,
  tag: Array,
  created_on: {
    type: Date,
    default: Date.now,
  },
  updated_on: {
    type: Date,
    default: Date.now,
  },
});

module.exports.DBUSER = mongoose.model("users", userSchema);
module.exports.BOOKING = mongoose.model("bookings", bookingSchema);
module.exports.PRODUCT = mongoose.model("products", productSchema);
