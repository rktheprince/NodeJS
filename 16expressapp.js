const express = require("express");
const path = require("path");
const app = express();

// const mymiddleware = (req, res, next) => {
//   console.log(req);
//   next();
// };

app.use(express.static(path.join(__dirname, "public")));
app.use(mymiddleware);

const port = process.env.PORT || 3000;

app.get("/fruit", (req, res) => {
  res.json({ type: "fruit", name: "apple" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
