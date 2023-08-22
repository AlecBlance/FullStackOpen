const Book = require("../../models/book");
const Author = require("../../models/author");
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
  },
  Author: {
    bookCount: async (root) => {
      const result = await Book.find({ author: root._id }).populate("author");
      return result.length;
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        const newAuthor = new Author({ name: args.author });
        author = await newAuthor.save();
      }
      const book = await new Book({ ...args, author: author._id }).populate(
        "author"
      );
      return await book.save();
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name });
      if (!author) return null;
      author.born = args.setBornTo;
      return await author.save();
    },
  },
};

module.exports = { resolvers };
