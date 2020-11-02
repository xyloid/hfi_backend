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
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Record", recordSchema);
