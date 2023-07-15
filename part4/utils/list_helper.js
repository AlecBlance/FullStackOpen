const dummy = (blogs) => blogs.length;

const totalLikes = (blogs) => blogs.reduce((accu, { likes }) => accu + likes, 0);

const favoriteBlog = (blogs) => {
  const highestLikes = Math.max(...blogs.map(({ likes }) => likes));
  const { title, author, likes } = blogs.find(
    (blog) => blog.likes === highestLikes,
  );
  return { title, author, likes };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
