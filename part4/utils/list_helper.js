const dummy = (blogs) => blogs.length;

const totalLikes = (blogs) => blogs.reduce((accu, { likes }) => accu + likes, 0);

module.exports = {
  dummy,
  totalLikes,
};
