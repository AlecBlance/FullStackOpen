const listHelper = require("../utils/list_helper");

const helper = require("./test_helper");

describe("authors", () => {
  const blogs = helper.initialBlogs;
  test("with most blogs written", () => {
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
  test("with most likes", () => {
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
