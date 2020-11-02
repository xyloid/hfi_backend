const fs = require("fs");
let rawdata = fs.readFileSync("./data/data.json");
var data = JSON.parse(rawdata);

const mongoose = require("mongoose");

const url = `mongodb+srv://userhfi:userhfi@fso2020.q4awj.azure.mongodb.net/hfi?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const recordSchema = new mongoose.Schema({
  id: String,
  name: String,
  gender: String,
  age: Number,
  statusHistory: [{ statusCode: String, timestamp: Date }],
  caseStatus: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  plan: String,
});

const Record = mongoose.model('Record',recordSchema)

Record.deleteMany({},()=>{console.log("clean")})

data.map(i =>{ 

    var hist = []
    for (const c in i["status history"]){
        hist.push({statusCode:c, timestamp:i["status history"][c]})
    }

    

    const r = new Record({
        id:i.id,
        name:i.name,
        gender:i.gender,
        age:i.age,
        statusHistory:hist,
        caseStatus:i["case status"],
        plan:i.plan,
    })

    
    r.save().then(console.log(""))

    // console.log(i["status history"])
    // console.log(r)
})


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
  response.json(data);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
