/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

require('express-async-errors');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

const getToken = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) return authorization.replace('Bearer ', '');
  return null;
};

blogsRouter.post('/', async (request, response) => {
  const { body } = request;
  if (!body.likes) body.likes = 0;
  if (!body.title || !body.url) return response.status(400).end();
  const { id } = jwt.verify(getToken(request), process.env.SECRET);
  if (!id) return response.status(401).json({ error: 'token invalid' });
  body.user = id;
  const blog = await new Blog(body).populate('user', { username: 1, name: 1 });
  const result = await blog.save();
  const user = await User.findById(id);
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
