const mongoose = require("mongoose");

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

recordSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Record = mongoose.model("Record", recordSchema);

module.exports = Record