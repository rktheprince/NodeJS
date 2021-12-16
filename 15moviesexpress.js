const express = require("express");
const Joi = require("joi");
const route = express.Router();

const movies = [
  { id: 1, name: "Superman" },
  { id: 2, name: "Batman" },
  { id: 3, name: "Flash" },
  { id: 4, name: "Joker" },
  { id: 5, name: "Aquaman" },
];

route.get("/api/movies", (req, res) => {
  res.send(movies);
});

route.get("/api/movies/:id", (req, res) => {
  let movie = movies.find((c) => c.id === parseInt(req.params.id));
  if (!movie) res.send(`No movies found for the given id : ${req.params.id}`);
  else res.send(movie);
});

route.post("/api/movies", (req, res) => {
  //   if (!req.body.name || req.body.name < 3) {
  //     res
  //       .status(400)
  //       .send("Name of movie is not present or less than three characters");
  //     return;
  //   }
  const schema = Joi.object({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(20)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,20}$"))
      .required(),
  });

  const result = schema.validate(req.body);
  console.log(result);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  let movie = {
    id: movies.length + 1,
    name: req.body.name,
  };
  movies.push(movie);
  res.send(movie);
});

route.put("/api/movies/:id", (req, res) => {
  let movie = movies.find((c) => c.id === parseInt(req.params.id));
  if (!movie) res.send(`No movies found for the given id : ${req.params.id}`);

  const schema = Joi.object({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(20)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,20}$"))
      .required(),
  });

  const result = schema.validate(req.body);
  console.log(result);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  movie.name = req.body.name;
  res.send(movie);
});

route.delete("/api/movies/:id", (req, res) => {
  let movie = movies.find((c) => c.id === parseInt(req.params.id));
  if (!movie) res.send(`No movies found for the given id : ${req.params.id}`);

  const index = movies.indexOf(movie);
  movies.splice(index, 1);

  res.send(movie);
});

module.exports = route;
