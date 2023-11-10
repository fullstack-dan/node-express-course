require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");

//variables
const DB_URL = process.env.MONGODB_URL;

//middleware
app.use(express.static("./public"));
app.use(express.json());

const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//routes
app.get("/hello", (req, res) => {
  res.send("Task Manager App");
});

app.use("/api/v1/tasks", tasks);

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(DB_URL);
    app.listen(port, () => {
      console.log(`App running on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
