require("dotenv").config();

const PORT = 4000;
const MONGO_DB = process.env.MONGO_DB;

module.exports = { MONGO_DB, PORT };
