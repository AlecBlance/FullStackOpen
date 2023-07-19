const mongoose = require('mongoose');

const supertest = require('supertest');

const app = require('../app');

const Blog = require('../models/blog');

const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe('blogs', () => {
  test('returns the correct amount of blog posts', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('has id instead of _id', async () => {
    const response = await helper.blogsInDb();
    expect(response[0].id).toBeDefined();
  });

  test('can be created', async () => {
    const newBlog = {
      title: 'Definitely a new blog',
      author: 'Alec Blance',
      url: 'http://yay.com/newBlog',
      likes: 0,
    };
    const addResponse = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const allBlogs = await helper.blogsInDb();
    expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1);
    expect(addResponse.body).toMatchObject(newBlog);
  });

  test('have likes', async () => {
    const newBlogNoLikes = {
      title: 'I have likes right?',
      author: 'Alec Blance',
      url: 'http://yay.com/likes',
    };
    await api
      .post('/api/blogs')
      .send(newBlogNoLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    const allBlogs = await helper.blogsInDb();
    expect(allBlogs[allBlogs.length - 1].likes).toBe(0);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
