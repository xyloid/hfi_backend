const Record = require('./models/records');


// Record.find({}).then(result=>{
//     result.forEach(r=>{
//         console.log(r)
//     })
// })
// console.log(data);

users = [{ username: "admin", _id: 1234 }];

const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());

app.get("/", (request, response) => {
  response.send("<h1>Backend is running.</h1>");
});

app.get("/api/data", (request, response) => {
    Record.find({}).then(records=>{
        response.json(records)
    })
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
