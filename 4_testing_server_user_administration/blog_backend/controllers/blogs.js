const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 });

  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const { body, user } = request;
  if (!user) {
    return response.status(401).json({
      error: 'token missing or invalid',
    });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    user: user._id,
    url: body.url || '',
    likes: body.likes || 0,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  return response.status(201).json(savedBlog);
});

blogsRouter.put('/:id', async (request, response) => {
  const { body } = request;
  const { id } = request.params;

  const blogData = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedNote = await Blog
    .findByIdAndUpdate(id, blogData, { new: true });

  response.json(updatedNote);
});

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(400).json({
      error: 'invalid blog id',
    });
  }

  await Blog.findByIdAndRemove(request.params.id);
  return response.status(204).end();
});

module.exports = blogsRouter;
