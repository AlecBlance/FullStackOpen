const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');
require('express-async-errors');

usersRouter.post('/', async (req, res) => {
  const { username, password, name } = req.body;

  const saltRounds = 10;
  const passwordHash = bcrypt.hash(password, saltRounds);

  const user = new User({
    name,
    username,
    passwordHash,
  });

  const savedUser = await user.save();

  res.status(201).json({ savedUser });
});

module.exports = usersRouter;
