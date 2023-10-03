const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

let songObj = require("./bohemian-rhapsody.json");
const song = Object.values(songObj);

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");

  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.
let counter = 0;
let lyric = song[counter];

// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = () => {
  return `
  <body>
  <p>${lyric}</p>
  <form method="POST">
  <input name="item"></input>
  <button type="submit">Submit</button>
  </form>
  </body>
  `;
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    getBody(req, (body) => {
      if (body["item"]) {
        if (counter === song.length - 1) {
          counter = 0;
          lyric = song[counter];
        }
        input = decodeURIComponent(body["item"]).replace(/\+/g, " ");
        console.log("input is:", input);
        if (input.toLowerCase() === song[counter + 1].toLowerCase()) {
          counter += 2;
          lyric = song[counter];
        } else {
          lyric = "Try again! " + song[0];
          counter = song.length - 1;
        }
      } else {
        if (counter === song.length - 1) {
          counter = 0;
          lyric = song[counter];
        }
        lyric = "Try again! " + song[0];
        counter = song.length - 1;
      }
      // Your code changes would end here
      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});

server.listen(3000);
console.log("The server is listening on port 3000.");
