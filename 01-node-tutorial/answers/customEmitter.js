const EventEmitter = require("events");

const myEmitter = new EventEmitter();

myEmitter.on("greet", (name) => {
  console.log(`Hello, ${name}!`);
});

myEmitter.on("count", (num1, num2) => {
  console.log(`The sum of ${num1} and ${num2} is ${num1 + num2}.`);
});

myEmitter.emit("greet", "Daniel");
myEmitter.emit("count", 5, 10);
