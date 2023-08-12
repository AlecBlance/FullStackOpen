/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

require("express-async-errors");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const { body, user } = request;
  if (!body.likes) body.likes = 0;
  if (!body.title || !body.url) return response.status(400).end();
  if (!user) return response.status(401).json({ error: "token invalid" });

  const newBlog = {
    ...body,
    user: user._id,
  };

  const blog = await new Blog(newBlog).populate("user", {
    username: 1,
    name: 1,
  });
  const result = await blog.save();

  user.blogs = user.blogs.concat(result._id);
  user.save();

  response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response) => {
  const {
    user,
    params: { id },
  } = request;
  if (!user) return response.status(401).json({ error: "token invalid" });

  const blogCreator = (await Blog.findById(id)).user;
  if (blogCreator.toString() !== user._id.toString())
    return response.status(400).json({ error: "Missing permission" });

  await Blog.findByIdAndRemove(id);

  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const { id } = request.params;
  const newBlog = await Blog.findByIdAndUpdate(
    id,
    { $inc: { likes: 1 } },
    { new: true }
  ).populate("user", { username: 1, name: 1 });
  response.json(newBlog);
});

module.exports = blogsRouter;
