const mongoose = require("mongoose");
const fs = require("fs");
let rawdata = fs.readFileSync("./data/data.json");
var data = JSON.parse(rawdata);

const Record = require('./models/records');

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

