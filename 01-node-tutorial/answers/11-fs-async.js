const fs = require("fs");

const myFile = fs.writeFile("./temporary/fileB.txt", "Hello, CTD!\n", (err) => {
  if (err) throw err;
  fs.writeFile(
    "./temporary/fileB.txt",
    "still boring...\n",
    {
      flag: "a",
    },
    (err) => {
      if (err) throw err;
      fs.writeFile(
        "./temporary/fileB.txt",
        "back to the drawing board",
        {
          flag: "a",
        },
        (err) => {
          if (err) throw err;
          //printing the whole file
          fs.readFile("./temporary/fileB.txt", "utf-8", (err, data) => {
            if (err) throw err;
            console.log(data);
          });
        }
      );
    }
  );
});
