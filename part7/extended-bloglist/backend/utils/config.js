require("dotenv").config();

const PORT = 3003;
const MONGO_DB =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGO_DB
    : process.env.MONGO_DB;

module.exports = { PORT, MONGO_DB };
