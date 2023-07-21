/* eslint-disable consistent-return */
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

require('express-async-errors');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const { body } = request;
  if (!Object.prototype.hasOwnProperty.call(body, 'likes')) body.likes = 0;
  if (!Object.prototype.hasOwnProperty.call(body, 'title') || !Object.prototype.hasOwnProperty.call(body, 'url')) {
    return response.status(400).end();
  }
  const blog = new Blog(body);
  const result = await blog.save();
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
