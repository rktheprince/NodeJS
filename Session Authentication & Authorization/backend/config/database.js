const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;

const connect = () => {
  mongoose
    .connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database Connection Successfull");
    })
    .catch((err) => {
      console.log("Database Connection Failure");
      console.error(err);
      process.exit(1);
    });
};

module.exports = connect;
