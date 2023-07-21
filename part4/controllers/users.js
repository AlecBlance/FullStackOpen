/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');
require('express-async-errors');

usersRouter.post('/', async (req, res, next) => {
  const { username, password, name } = req.body;
  if (!username) return next({ name: 'ValidationError', message: 'Username missing' });
  if (!password) return next({ name: 'ValidationError', message: 'Password missing' });
  if (password.length < 3) return next({ name: 'ValidationError', message: 'Password must be at least 3 characters long' });
  if (username.length < 3) return next({ name: 'ValidationError', message: 'Username must be at least 3 characters long' });
  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    username,
    passwordHash,
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
});

usersRouter.get('/', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

module.exports = usersRouter;
