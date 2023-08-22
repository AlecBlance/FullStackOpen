const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { typeDefs } = require("./graphql/typeDefs");
const { resolvers } = require("./graphql/resolvers");
const config = require("./utils/config");
const mongoose = require("mongoose");

const mongoUrl = config.MONGO_DB;
mongoose.connect(mongoUrl);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: config.PORT,
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
