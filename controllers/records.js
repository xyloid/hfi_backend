const jwt = require("jsonwebtoken");

const recordsRouter = require("express").Router();
const Record = require("../models/record");
const User = require("../models/user");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    // return token
    return authorization.substring(7);
  }
  return null;
};

recordsRouter.get("/", (request, response) => {
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  } else {
    Record.find({}).then((notes) => {
      response.json(notes);
    });
  }
});

module.exports = recordsRouter;
