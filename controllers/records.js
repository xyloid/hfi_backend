const recordsRouter = require("express").Router();
const Record = require("../models/record");

recordsRouter.get("/", (request, response) => {
  Record.find({}).then((notes) => {
    response.json(notes);
  });
});

module.exports = recordsRouter;
