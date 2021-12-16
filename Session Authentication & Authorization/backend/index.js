const app = require("./app");
const http = require("http");
require("dotenv").config();

const port = process.env.APP_PORT;

const server = http.createServer(app);

server.listen(port, () => {
  console.log("Server is Running");
});
