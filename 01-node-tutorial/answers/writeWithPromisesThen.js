const { writeFile, readFile } = require("fs").promises;

const file = "./temporary/temp.txt";
const lines = [
  "Hello, world!\n",
  "'hello world' is so repetitive\n",
  "more creativity is needed\n",
];

writeFile(file, lines[0])
  .then(() => {
    return writeFile(file, lines[1], { flag: "a" });
  })
  .then(() => {
    writeFile(file, lines[2], { flag: "a" });
  })
  .then(() => {
    return readFile(file);
  })
  .then((data) => {
    console.log(data.toString());
  })
  .catch((err) => {
    console.log("oopsie daisy!");
  });
