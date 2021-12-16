const express = require("express");
const app = express();
const movies = require("./15moviesexpress");

app.use(express.json());
app.use("/xyz", movies);

const port = process.env.PORT || 3000;
// app.use('/api/movies', (req, res, next) => {
//   console.log(req.url, req.method);
//   next();
//})

app.get("/", (req, res) => {
  res.send("Hello World2!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
