const express = require("express");
const path = require("path");
const request = require("request");

const app = express();
const port = 3000;

app.engine("pug", require("pug").__express);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

app.get("/sendWeatherAPI", (req, res) => {
  var options = {
    method: "GET",
    url: "http://dataservice.accuweather.com/currentconditions/v1/locationKey?locationkey=187745&apikey=JA8EGJJazC8crSjyPcqxSYJxBs7A8Z1P",
  };

  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    var weatherResponse = JSON.parse(response.body);
    var weather = weatherResponse[0].WeatherText;
    var timestamp = weatherResponse[0].LocalObservationDateTime;
    var temp = weatherResponse[0].Temperature.Metric.Value;
    var unit = weatherResponse[0].Temperature.Metric.Unit;
    var year = timestamp.substring(0, 4);
    var month = timestamp.substring(5, 7);
    var day = timestamp.substring(8, 10);
    var time = timestamp.substring(11, 16);
    var date = year + "-" + month + "-" + day;
    console.log(weatherResponse);
    res.render("weather", {
      title: "Weather App",
      city: "New Delhi, India",
      weather: weather,
      temp: temp,
      unit: unit,
      time: time,
      date: date,
    });
  });
});
app.get("/", (req, res) => {
  res.render("index", { title: "Weather App", city: "New Delhi, India" });
});

app.listen(port, () => {
  console.log(`weather app listening at http://localhost:${port}`);
});
