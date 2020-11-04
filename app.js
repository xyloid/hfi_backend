const recordsRouter = require("./controllers/records");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

const middleware = require('./utils/middleware')

const cors = require("cors");
const express = require("express");
const app = express();

// to use build from frontend
app.use(express.static('build'))

const mongoose = require("mongoose");

// const url = `mongodb+srv://userhfi:userhfi@fso2020.q4awj.azure.mongodb.net/hfi?retryWrites=true&w=majority`;
const url = process.env.MONGODB_URI

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});


app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger)


app.get("/", (request, response) => {
  response.send("<h1>Backend is running.</h1>");
});

app.use("/api/data", recordsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(middleware.errorHandler)

module.exports = app;
