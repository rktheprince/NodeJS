const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on("WaterFull", (a, b) => {
  console.log("Please turn off the motor!");
  setTimeout(() => {
    console.log("Please turn off the motor! Its a gentle reminder", a, b);
  }, 3000);
});

console.log("The script is running");
myEmitter.emit("WaterFull");
console.log("The script is still running");
myEmitter.emit("WaterFull", "10", "20");
