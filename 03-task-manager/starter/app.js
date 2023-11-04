require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;

const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");

//variables
const DB_URL = process.env.MONGODB_URL;

//middleware
app.use(express.json());

//routes
app.get("/hello", (req, res) => {
  res.send("Task Manager App");
});

app.use("/api/v1/tasks", tasks);

// app.get('/api/v1/tasks') - get all the tasks
// app.post('/api/v1/tasks') - create a new task
// app.get('/api/v1/tasks/:id') - get a single task
// app.patch('/api/v1/tasks/:id') - update task
// app.delete('/api/v1/tasks/:id') - delete task

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
