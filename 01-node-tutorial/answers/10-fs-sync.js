const writeFileSync = require("fs").writeFileSync;
const readFileSync = require("fs").readFileSync;

const myFile = writeFileSync("./temporary/fileA.txt", "Hello, world!\n");
writeFileSync("./temporary/fileA.txt", "'hello world' is so repetitive\n", {
  flag: "a",
});
writeFileSync("./temporary/fileA.txt", "more creativity is needed", {
  flag: "a",
});

const fileContents = readFileSync("./temporary/fileA.txt", "utf-8");
console.log(fileContents);
