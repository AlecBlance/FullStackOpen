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
    response.status(400).json({ error: 'Missing inputs' });
    return;
  }
  const blog = new Blog(body);
  const result = await blog.save();
  response.status(201).json(result);
});

module.exports = blogsRouter;
