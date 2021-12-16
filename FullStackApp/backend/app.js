const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(express.json({ origin: "http://localhost:3000" }));
app.use(cors());

const port = process.env.PORT || 5000;

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "api",
});

app.get("/dc", (req, res) => {
  con.connect(function (err) {
    con.query("SELECT * FROM dc", (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  });
});

app.post("/dc", (req, res) => {
  const query = `INSERT INTO dc(id, name) VALUES(${req.body.id}, '${req.body.name}')`;

  con.connect(function (err) {
    con.query(query, (err, result) => {
      if (err) res.send("ID already exists");
      else {
        console.log(result);
        res.send("Record Saved");
      }
    });
  });
});

app.delete("/dc/:id", (req, res) => {
  con.connect(function (err) {
    con.query(`DELETE FROM dc WHERE id = ${req.params.id}`, (err, result) => {
      if (err) res.send("Error Occurred");
      else {
        console.log(result);
        res.send("Record Deleted");
      }
    });
  });
});

app.listen(port, () => {
  console.log("The Server is Runing");
});
