const { application } = require('express');
const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blog1 = new Blog(helper.INITIAL_BLOGS[0]);
  await blog1.save();

  const blog2 = new Blog(helper.INITIAL_BLOGS[1]);
  await blog2.save();
});

describe('when 2 blogs are present', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('returns correct number of blogs : 2', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(2);
  });

  test('contains id key', async () => {
    const blogs = await helper.getAllBlogs();
    const blog1 = blogs[0];
    expect(blog1.id).toBeDefined();
  });
});

describe('create new blog', () => {
  let token;
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('password', 10);
    const user = new User({ username: 'admin', name: 'admin', passwordHash });
    await user.save();

    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'admin', password: 'password' })
      .expect(200);

    token = loginResponse.body.token
  });

  test('create new blog with valid data', async () => {
    const usersAtStart = await helper.getAllUsers();
    const userAtStart = usersAtStart[0];

    const newBlog = helper.INITIAL_BLOGS[2];
    const newBlogData = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: newBlog.likes,
      userId: userAtStart.id,
    };

    const blogsBeforePostRequest = await helper.getAllBlogs();
    expect(blogsBeforePostRequest).toHaveLength(2);
    expect(userAtStart.blogs).toHaveLength(0);

    await api
      .post('/api/blogs')
      .send(newBlogData)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.getAllUsers();
    const userAtEnd = usersAtEnd[0];
    expect(userAtEnd.blogs).toHaveLength(1);

    const blogsAtEnd = await helper.getAllBlogs();
    expect(blogsAtEnd).toHaveLength(3);
  });

  test('creating blog fails without authentication', async () => {
    const usersAtStart = await helper.getAllUsers();
    const userAtStart = usersAtStart[0];

    const newBlog = helper.INITIAL_BLOGS[2];
    const newBlogData = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      likes: newBlog.likes,
      userId: userAtStart.id,
    };

    await api
      .post('/api/blogs')
      .send(newBlogData)
      .set('Authorization', 'abc')
      .expect(401);
  });

  test('likes default to zero if not provided', async () => {
    const usersAtStart = await helper.getAllUsers();
    const userAtStart = usersAtStart[0];

    const newBlog = helper.INITIAL_BLOGS[2];
    const newBlogData = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
      userId: userAtStart.id,
    };

    const result = await api
      .post('/api/blogs')
      .send(newBlogData)
      .set('Authorization', `Bearer ${token}`);

    const returnedBlog = result.body;
    expect(returnedBlog.likes).toBe(0);
  });

  test('title should not be missing', async () => {
    const usersAtStart = await helper.getAllUsers();
    const userAtStart = usersAtStart[0];

    const newBlog = helper.INITIAL_BLOGS[2];
    const newBlogData = {
      author: newBlog.author,
      url: newBlog.url,
      likes: newBlog.likes,
      userId: userAtStart.id,
    };

    const blogsBeforePostRequest = await helper.getAllBlogs();

    await api
      .post('/api/blogs')
      .send(newBlogData)
      .set('Authorization', `Bearer ${token}`)
      .expect(400);

    const endAllBlogs = await helper.getAllBlogs();
    expect(endAllBlogs).toHaveLength(blogsBeforePostRequest.length);
  });

  test('url can be missing', async () => {
    const usersAtStart = await helper.getAllUsers();
    const userAtStart = usersAtStart[0];

    const newBlog = helper.INITIAL_BLOGS[2];
    const newBlogData = {
      title: newBlog.title,
      author: newBlog.author,
      likes: newBlog.likes,
      userId: userAtStart.id,
    };

    const blogsBeforePostRequest = await helper.getAllBlogs();

    await api
      .post('/api/blogs')
      .send(newBlogData)
      .set('Authorization', `Bearer ${token}`)
      .expect(201);

    const endAllBlogs = await helper.getAllBlogs();
    expect(endAllBlogs).toHaveLength(blogsBeforePostRequest.length + 1);
  });
});

describe('delete blog', () => {
  test('succesfully deletes and gets 204 response', async () => {
    const blogsAtStart = await helper.getAllBlogs();
    const firstBlogId = blogsAtStart[0].id;
    await api
      .delete(`/api/blogs/${firstBlogId}`)
      .expect(204);

    const blogsAtEnd = await helper.getAllBlogs();
    expect(blogsAtEnd).toHaveLength(1);
  });

  test('deleting invalid id fails with 400', async () => {
    const invalidId = '12345678';
    await api
      .delete(`/api/blogs/${invalidId}`)
      .expect(400);
  });
});

describe('updating blog', () => {
  // test('updating invalid id fails with 404', async () => {
  //   const blogsAtStart = await helper.getAllBlogs();

  //   const firstBlogAtStart = blogsAtStart[0];
  //   const { id } = firstBlogAtStart;
  //   const dataToUpdate = {
  //     title: firstBlogAtStart.title,
  //     author: firstBlogAtStart.author,
  //     url: firstBlogAtStart.url,
  //     likes: 1,
  //   };

  //   await api
  //     .put('/123456')
  //     .send(dataToUpdate, { new: true })
  //     .expect(404);
  // });

  test('updating blog works', async () => {
    const blogsAtStart = await helper.getAllBlogs();

    const firstBlogAtStart = blogsAtStart[0];
    const { id } = firstBlogAtStart;
    const dataToUpdate = {
      title: firstBlogAtStart.title,
      author: firstBlogAtStart.author,
      url: firstBlogAtStart.url,
      likes: 1,
    };

    const response = await api
      .put(`/api/blogs/${id}`)
      .send(dataToUpdate)
      .expect(200);

    dataToUpdate.id = id;
    const updatedBlog = response.body;

    expect(updatedBlog).toEqual(dataToUpdate);
  });
});

describe('creating users', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash('password', 10);
    const user = new User({ username: 'admin', password: passwordHash });
    await user.save();
  });

  test('can save valid user', async () => {
    const usersAtStart = await helper.getAllUsers();

    const userData = { username: 'admin2', password: 'password2' };

    const response = await api
      .post('/api/users')
      .send(userData)
      .expect(201);

    const usersAtEnd = await helper.getAllUsers();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    expect(response.body.username).toBe(userData.username);
  });

  test('can not save invalid username', async () => {
    const usersAtStart = await helper.getAllUsers();

    const userData = new User({ username: 'ad', password: 'password' });
    const response = await api
      .post('/api/users')
      .send(userData)
      .expect(400);

    expect(response.body.error).toBe('invalid username or password');

    const usersAtEnd = await helper.getAllUsers();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('can not save invalid password', async () => {
    const usersAtStart = await helper.getAllUsers();

    const userData = new User({ username: 'admin', password: 'pw' });
    const response = await api
      .post('/api/users')
      .send(userData)
      .expect(400);

    expect(response.body.error).toBe('invalid username or password');

    const usersAtEnd = await helper.getAllUsers();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
