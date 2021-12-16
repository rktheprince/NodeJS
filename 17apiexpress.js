const express = require("express");
const mysql = require("mysql2");
const app = express(); // app server ban jayega

app.use(express.json());

const port = process.env.PORT || 3000;
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "api",
});

app.get("/createdatabase", (req, res) => {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected");

    con.query("CREATE DATABASE api", (err, result) => {
      if (err) {
        console.log(err);
        res.send("Database Exists");
      } else {
        console.log("Database Created");
        res.send("Database Created");
      }
    });
  });
});

app.get("/createtable", (req, res) => {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected");

    con.query(
      "CREATE TABLE dc (id int(2) PRIMARY KEY, name VARCHAR(255))",
      (err, result) => {
        if (err) {
          console.log(err);
          res.send("Table Exists");
        } else {
          console.log("Table Created");
          res.send("Table Created");
        }
      }
    );
  });
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

app.get("/dc/:id", (req, res) => {
  con.connect(function (err) {
    con.query("SELECT * FROM dc WHERE id = " + req.params.id, (err, result) => {
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
      if (err) throw err;
      console.log(result);
      res.send("Record Saved");
    });
  });
});

app.delete("/dc/:id", (req, res) => {
  con.connect(function (err) {
    con.query("DELETE FROM dc WHERE id =" + req.params.id, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("Record Deleted");
    });
  });
});

app.put("/dc/:id", (req, res) => {
  con.connect(function (err) {
    const query = `UPDATE dc SET name = '${req.body.name}' WHERE id = ${req.params.id}`;
    con.query(query, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send("Record Update");
    });
  });
});

app.listen(port, () => {
  console.log("The Server is Runing");
});
