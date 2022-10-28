require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const auth = require("./routes/auth.js");
const booking = require("./routes/booking");
const product = require("./routes/product");
const user = require("./routes/user");
const DBUSER = require("./models/model");

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/auth", auth);
app.use("/booking", booking);
app.use("/user", user);
app.use("/product", product);

//Database and Server
require("./models/db");
const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
  console.log("App running on port " + PORT);
});
