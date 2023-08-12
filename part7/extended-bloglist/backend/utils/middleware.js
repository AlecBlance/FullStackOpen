/* eslint-disable consistent-return */
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const errorHandler = (error, request, response, next) => {
  if (error.name === "ValidationError")
    return response.status(400).json({ error: error.message });
  if (error.name === "JsonWebTokenError")
    return response.status(400).json({ error: error.message });
  next(error);
};

const tokenExtractor = (request, response, next) => {
  request.token = null;
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer "))
    request.token = authorization.replace("Bearer ", "");
  next();
};

const userExtractor = async (request, response, next) => {
  if (request.token) {
    const { id } = jwt.verify(request.token, process.env.SECRET);
    request.user = await User.findById(id);
  }
  next();
};

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor,
};
