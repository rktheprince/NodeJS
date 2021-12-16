const fs = require("fs");

fs.readFile("file.txt", "utf8", (err, data) => {
  if (err) console.log("Error Occurred", err);
  else console.log(data);
});

const a = fs.readFileSync("file.txt");
console.log(a.toString());

fs.writeFile("file2.txt", "This is a data", (err) => {
  if (err) console.log("Error Occurred");
  else console.log("Written to the file");
});

b = fs.writeFileSync("file2.txt", "This is a data2");
console.log(b);
console.log("Finished reading file");

fs.rename("file.txt", "file2.txt", (err) => {
  if (err) console.log("Error Occurred: " + err);
  else console.log("Renamed Successfully");
});

fs.appendFile("file.txt", "This is New Data", (err) => {
  if (err) console.log("Error Occurred: " + err);
  else console.log("Data Appended Successfully");
});

fs.unlink("file.txt", (err) => {
  if (err) console.log("Error Occurred: " + err);
  else console.log("Deleted Successfully");
});

fs.mkdir("tutorial", (err) => {
  if (err) console.log("Error Occurred: " + err);
  else console.log("Directory Created Successfully");
});

fs.rmdir("tutorial", (err) => {
  if (err) console.log("Error Occurred: " + err);
  else console.log("Directory Deleted Successfully");
});

fs.readdir("tutorial", (err, files) => {
  if (!err) console.log("Error Occurred: " + err);
  else console.log(files);
});
