const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
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

module.exports = mongoose.model("user", userSchema);
