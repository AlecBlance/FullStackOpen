/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

require('express-async-errors');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const { body } = request;
  if (!body.likes) body.likes = 0;
  if (!body.title || !body.url) return response.status(400).end();
  const { _id } = (await User.aggregate([{ $sample: { size: 1 } }]))[0];
  body.user = _id;
  const blog = await new Blog(body).populate('user', { username: 1, name: 1 });
  const result = await blog.save();
  const user = await User.findById(_id);
  user.blogs = user.blogs.concat(result._id);
  user.save();
  response.status(201).json(result);
});

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  await Blog.findByIdAndRemove(id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const newBlog = await Blog.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });
  response.json(newBlog);
});

module.exports = blogsRouter;
