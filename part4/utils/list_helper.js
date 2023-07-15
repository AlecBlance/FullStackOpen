const _ = require('lodash');

const dummy = (blogs) => blogs.length;

const totalLikes = (blogs) => blogs.reduce((accu, { likes }) => accu + likes, 0);

const favoriteBlog = (blogs) => {
  const highestLikes = Math.max(...blogs.map(({ likes }) => likes));
  const { title, author, likes } = blogs.find(
    (blog) => blog.likes === highestLikes,
  );
  return { title, author, likes };
};

const mostBlogs = (blogs) => {
  const blogsByAuthor = _.groupBy(blogs, 'author');
  const blogCount = _.map(blogsByAuthor,
    (blog, author) => ({ author, blogs: blog.length })
  );
  return _.maxBy(blogCount, 'blogs');
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
