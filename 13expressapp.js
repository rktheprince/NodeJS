const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World2!");
});

app.get("/about", (req, res) => {
  res.send("This is an about page!");
});

app.get("/person/:name/:age", (req, res) => {
  console.log(req.params.name);
  res.send(req.params);
});

app.get("/test/", (req, res) => {
  console.log(req.query);
  res.send(req.query);
});

app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
