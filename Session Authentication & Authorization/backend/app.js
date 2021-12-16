const express = require("express");
const bcrypt = require("bcryptjs");
const connect = require("./config/database");
const User = require("./model/user");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
require("dotenv").config();
const app = express();
connect();

const store = new MongoDBSession({
  uri: process.env.MONGO_URL,
  collection: "mySessions",
});

const isAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.send("Need To Login");
  }
};

app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.get("/home", isAuth, (req, res) => {
  console.log(req.session);
  console.log(req.session.id);
  res.send("Welcome to the Application");
});

app.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const oldUser = await User.findOne({ email: email });

  if (oldUser) {
    return res.status(409).send("User Already Exist. Please Login");
  }

  const salt = await bcrypt.genSalt();
  const encryptedUserPassword = await bcrypt.hash(password, salt);

  const user = await new User({
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: encryptedUserPassword,
  });

  await user.save();
  res.send(user);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const oldUser = await User.findOne({ email: email });

  if (!oldUser) {
    return res.status(409).send("User Already Exist. Please Login");
  }

  if (oldUser && (await bcrypt.compare(password, oldUser.password))) {
    req.session.isAuth = true;
    // res.redirect("/home");
    res.send("Login Successfull");
  }
});

app.delete("/delete", function (req, res) {
  req.session.destroy((err) => {
    if (err) throw err;
  });
  res.send("Session Ended");
});

app.use("*", (req, res) => {
  res.sendStatus(404);
});

module.exports = app;
