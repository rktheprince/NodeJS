const fs = require("fs");
const zlib = require("zlib");

const readStream = fs.createReadStream("./file.txt", "utf8");
const readStream2 = fs.createReadStream("./secondfile2.txt.gz");
const writeStream = fs.createWriteStream("./secondfile.txt");
const writeStream2 = fs.createWriteStream("./secondfile2.txt.gz");
const gzip = zlib.createGzip();
const gunzip = zlib.createGunzip();

readStream.on("data", (chunk) => {
  console.log(chunk);
});

readStream.on("data", (chunk) => {
  writeStream.write(chunk);
});

readStream.pipe(writeStream);

readStream.pipe(gzip).pipe(writeStream2);

readStream2.pipe(gunzip).pipe(writeStream);
