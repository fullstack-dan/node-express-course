const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Is this the real life?\nIs this just fantasy?\n");
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
  console.log("http://localhost:3000");
});
