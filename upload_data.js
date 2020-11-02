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

const Record = mongoose.model("Record", recordSchema);

Record.deleteMany({}, () => {
  console.log("clean collection");
});


const upload = async ()=>{
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
        
        return r.save()    
      });
    await Promise.all(promiseArray);
    mongoose.connection.close();
}
upload()

