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

describe('blogs', () => {
  test('returns the correct amount of blog posts', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test('has id instead of _id', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
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
    const allBlogsResponse = await api.get('/api/blogs');
    expect(allBlogsResponse.body).toHaveLength(initialBlogs.length + 1);
    expect(addResponse.body).toMatchObject(newBlog);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
