const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./test_helper');

const api = supertest(app);

describe('When there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
    const promiseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(promiseArray);
  });

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

  describe('addition of a new blog', () => {
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

    test('error if no title', async () => {
      const newBlogNoTitle = {
        author: 'Alec Blance',
        url: 'http://yay.com/likes',
      };
      await api
        .post('/api/blogs')
        .send(newBlogNoTitle)
        .expect(400);
    });

    test('error if no url', async () => {
      const newBlogNoUrl = {
        title: 'I have likes right?',
        author: 'Alec Blance',
      };
      await api
        .post('/api/blogs')
        .send(newBlogNoUrl)
        .expect(400);
    });
  });

  describe('deletion of a blog', () => {
    test('succeeds with status 204 if id is valid', async () => {
      const blogs = await helper.blogsInDb();
      const validId = blogs[0].id;
      const lengthBefore = blogs.length;
      await api
        .delete(`/api/blogs/${validId}`)
        .expect(204);
      expect(await helper.blogsInDb()).toHaveLength(lengthBefore - 1);
    });
  });

  describe('updating likes of a blog', () => {
    test('succeeds with incremented number of likes', async () => {
      const blogs = await helper.blogsInDb();
      const { id, likes } = blogs[0];
      const response = await api.put(`/api/blogs/${id}`);
      expect(response.body.likes).toBe(likes + 1);
    });
  });
});

describe('when there is a user in DB', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('definitelynotapassword', 10);
    const user = new User({ name: 'Admin', username: 'root', passwordHash });

    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'AlecBlance',
      name: 'Alec Blance',
      password: 'notmypassword',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('expected `username` to be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  describe('addition of new user', () => {
    test('error if no username', async () => {
      const newUser = {
        name: 'Alec',
        password: 'sample',
      };

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(response.body).toEqual({
        error: 'Username missing',
      });
    });
    test('error if no password', async () => {
      const newUser = {
        name: 'Alec',
        username: 'AlecBlance',
      };

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(response.body).toEqual({
        error: 'Password missing',
      });
    });
    test('error if username less than 3', async () => {
      const newUser = {
        name: 'Alec',
        username: 'AlecBlance',
        password: 'no',
      };

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(response.body).toEqual({
        error: 'Password must be at least 3 characters long',
      });
    });
    test('error if password less than 3', async () => {
      const newUser = {
        name: 'Alec',
        username: 'AB',
        password: 'password',
      };

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(response.body).toEqual({
        error: 'Username must be at least 3 characters long',
      });
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
