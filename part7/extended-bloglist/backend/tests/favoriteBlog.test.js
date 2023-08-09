const listHelper = require('../utils/list_helper');

const helper = require('./test_helper');

describe('blogs', () => {
  test('that has the highest likes (favorite)', () => {
    const blogs = helper.initialBlogs;

    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    });
  });
});
