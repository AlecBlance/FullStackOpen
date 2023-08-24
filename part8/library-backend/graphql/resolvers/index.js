const Book = require("../../models/book");
const Author = require("../../models/author");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { GraphQLError } = require("graphql");

const resolvers = {
  Query: {
    bookCount: async () => (await Book.find()).length,
    authorCount: async () => (await Author.find()).length,
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author });
        return await Book.find({
          genres: args.genre,
          author: author._id,
        }).populate("author");
      }
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        return await Book.find({ author: author._id }).populate("author");
      }
      if (args.genre)
        return await Book.find({ genres: args.genre }).populate("author");
      return await Book.find().populate("author");
    },
    allAuthors: async () => await Author.find(),
    me: (root, args, context) => context.currentUser,
  },
  Author: {
    bookCount: async (root) => {
      const result = await Book.find({ author: root._id }).populate("author");
      return result.length;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) throw new GraphQLError("Please login first");
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        const newAuthor = new Author({ name: args.author });
        try {
          author = await newAuthor.save();
        } catch (error) {
          throw new GraphQLError("Saving Author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
              error,
            },
          });
        }
      }
      const book = await new Book({ ...args, author: author._id }).populate(
        "author"
      );
      try {
        return await book.save();
      } catch (error) {
        throw new GraphQLError("Saving Book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) throw new GraphQLError("Please login first");
      const author = await Author.findOne({ name: args.name });
      if (!author) return null;
      author.born = args.setBornTo;
      return await author.save();
    },
    createUser: async (root, args) => {
      const password = await bcrypt.hash("yay", 10);
      const user = new User({ ...args, password });
      return await user.save();
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      const isPasswordCorrect = await bcrypt.compare(
        args.password,
        user.password
      );
      if (!isPasswordCorrect || !user) {
        throw new GraphQLError("Wrong username or password");
      }
      const userForToken = {
        username: user.username,
        id: user._id,
        favoriteGenre: user.favoriteGenre,
      };
      if (isPasswordCorrect) {
        return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
      }
    },
  },
};

module.exports = resolvers;
