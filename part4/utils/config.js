require('dotenv').config();

const PORT = 3003;
const { MONGO_DB } = process.env;

module.exports = { PORT, MONGO_DB };
