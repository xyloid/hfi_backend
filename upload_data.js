const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const fs = require("fs");
let rawdata = fs.readFileSync("./data/data.json");
var data = JSON.parse(rawdata);

const url = `mongodb+srv://userhfi:userhfi@fso2020.q4awj.azure.mongodb.net/hfi?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});


const Record = require("./models/record");
const User = require(`./models/user`);

Record.deleteMany({}, () => {
  console.log("clean records");
});

User.deleteMany({}, () => {
  console.log("clean users");
});

const upload = async () => {
  const promiseArray = data.map(async (i) => {
    var hist = [];
    for (const c in i["status history"]) {
      hist.push({ statusCode: c, timestamp: i["status history"][c] });
    }

    const r = new Record({
      id: i.id,
      name: i.name,
      gender: i.gender,
      age: i.age,
      statusHistory: hist,
      caseStatus: i["case status"],
      plan: i.plan,
    });

    return r.save();
  });
  await Promise.all(promiseArray);

  const passwordHash = await bcrypt.hash("admin", 10);

  // create one user
  const newUser = new User({
    username: "admin",
    name: "Administrator",
    passwordHash: passwordHash,
  });
  await newUser.save();

  mongoose.connection.close();
};


upload();
