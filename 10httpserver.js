const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    // res.write("Welcome to my page");
    res.end("Welcome");
  } else if (req.url === "/about") {
    res.write("Welcome to my about page");
    res.end();
  } else {
    res.write("Some other page");
    res.end();
  }
});

server.listen("3000");
