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
    Record.find({},{"statusHistory":0}).then((record) => {
      response.json(record);
    });
  }
});


recordsRouter.get("/:id", (request, response) => {
    const token = getTokenFrom(request);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" });
    } else {
      Record.findOne({"id":request.params.id}).then((record) => {
        response.json(record);
      });
    }
  });




module.exports = recordsRouter;
