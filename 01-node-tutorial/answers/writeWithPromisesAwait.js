const { writeFile, readFile } = require("fs").promises;

const file = "./temporary/fileC.txt";
const lines = [
  "Hello, world!\n",
  "'hello world' is so repetitive\n",
  "more creativity is needed\n",
];

const writer = async () => {
  try {
    await writeFile(file, lines[0], {
      flag: "a",
    });
    await writeFile(file, lines[1], {
      flag: "a",
    });
    await writeFile(file, lines[2], {
      flag: "a",
    });
  } catch (e) {
    console.log(e);
  }
};

const reader = async () => {
  try {
    fileRead = await readFile(file, "utf-8");
    console.log(fileRead);
  } catch (e) {
    console.log(e);
  }
};

const readWrite = async () => {
  try {
    await writer();
    await reader();
  } catch (error) {
    console.log(error);
  }
};

readWrite();
