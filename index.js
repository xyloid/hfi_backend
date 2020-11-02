const fs = require("fs");
let rawdata = fs.readFileSync("./data/data.JSON");
var data = JSON.parse(rawdata);

console.log(data);

const express = require("express");
const app = express();

app.get("/", (request, response) => {
  response.send("<h1>Backend is running.</h1>");
});

app.get("/api/data", (request, response) => {
  response.json(data);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
