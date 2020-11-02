const recordsRouter = require("./controllers/records");

users = [{ username: "admin", _id: 1234 }];

const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());

const mongoose = require("mongoose");

const url = `mongodb+srv://userhfi:userhfi@fso2020.q4awj.azure.mongodb.net/hfi?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});


app.get("/", (request, response) => {
  response.send("<h1>Backend is running.</h1>");
});

app.use("/api/data", recordsRouter);


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
