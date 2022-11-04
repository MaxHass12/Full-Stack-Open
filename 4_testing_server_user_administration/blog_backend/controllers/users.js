const usersRouter = require('express').Router();

const bcrypt = require('bcrypt');
const User = require('../models/user');

const isValid = (entry) => !!entry && entry.length >= 3;

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', { url: 1, title: 1, author: 1 });

  return response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (!(isValid(username) && isValid(password))) {
    return response.status(400).json({
      error: 'invalid username or password',
    });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique',
    });
  }

  const SALT_ROUND = 10;
  const passwordHash = await bcrypt.hash(password, SALT_ROUND);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  return response.status(201).json(savedUser);
});

module.exports = usersRouter;
