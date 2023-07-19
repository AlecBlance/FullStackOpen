const mongoose = require('mongoose');

const supertest = require('supertest');

const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'MERN is the Best',
    author: 'Alec Blance',
    url: 'http://yay.com/mern',
    likes: 1,
  },
  {
    title: 'Jobless at the moment',
    author: 'Alec Blance',
    url: 'http://yay.com/jobless',
    likes: 2,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test('blogs returns the correct amount of blog posts', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
  expect(response.body).toHaveLength(initialBlogs.length);
});

afterAll(async () => {
  await mongoose.connection.close();
});
