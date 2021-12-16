const http = require("http");
const fs = require("fs");

const server = http
  .createServer((req, res) => {
    const readStream = fs.createReadStream("index.html");
    res.writeHead(200, { "content-type": "text/html" });
    readStream.pipe(res);

    // const readStream = fs.createReadStream("./image.png");
    // res.writeHead(200, { "content-type": "image/png" });
    // readStream.pipe(res);
  })
  .listen(3000);
