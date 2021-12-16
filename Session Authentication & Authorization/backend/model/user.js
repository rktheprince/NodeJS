const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      default: null,
      required: true,
    },
    last_name: {
      type: String,
      default: null,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
  },
  { versionKey: false }
);

module.exports = new mongoose.model("user", userSchema);
