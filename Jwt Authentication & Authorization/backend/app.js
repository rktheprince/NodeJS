const express = require("express");
const User = require("./model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const auth = require("./middleware/auth");
require("./config/database").connect();
require("dotenv").config();

const app = express();

app.use(express.json({ limit: "50mb" }));

app.use(cors());

const corsOption = {
  origin: "https://localhost:5000",
  optionsSuccessStatus: 200,
};

app.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!(firstName && lastName && email && password)) {
      return res.status(400).send("All Input is Required");
    }

    const oldUser = await User.findOne({ email: email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    encryptedUserPasword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name: firstName,
      last_name: lastName,
      email: email.toLowerCase(),
      password: encryptedUserPasword,
    });

    const token = jwt.sign(
      {
        user_id: user._id,
        email: email,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "5h",
      }
    );

    user.token = token;

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).send("All Input is Required");
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).send("You need to register first");
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      {
        user_id: user._id,
        email: email,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "1m",
      }
    );
    user.token = token;
    res.status(200).json(user);
  } else {
    res.status(400).send("Invalid Credentials");
  }
});

app.get("/home", auth, (req, res) => {
  res.status(200).send("Welcome To The Application");
});

app.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page Not Found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});

module.exports = app;
