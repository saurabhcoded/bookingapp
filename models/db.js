const mongoose = require("mongoose");

// mongodb+srv://process.env.MONGO_DB_USER:process.env.MONGO_DB_PASSWORD@cluster.cirkd.mongodb.net/?retryWrites=true&w=majority
const db = mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster.cirkd.mongodb.net/?retryWrites=true&w=majority`
  )
  .then((res) => {
    console.log("Connection to DB successfull");
  })
  .catch((err) => {
    console.log("error CONNECTION TO DB", err);
  });

module.exports = db;
