import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import { useDispatch } from "react-redux";
import {
  setNotification,
  clearNotification,
} from "./reducers/notificationReducer";

const App = () => {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    })();
  }, []);

  useEffect(() => {
    const userLogged = window.localStorage.getItem("userLogged");
    if (userLogged) {
      const user = JSON.parse(userLogged);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const handleLogin = async (data) => {
    try {
      const user = await loginService.login(data);
      window.localStorage.setItem("userLogged", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      dispatch(clearNotification());
    } catch ({ response: { data } }) {
      dispatch(setNotification({ message: data.error, error: true }, 3));
    }
  };

  const loginForm = () => (
    <div>
      <h1>log in to application</h1>
      <Notification />
      <LoginForm login={handleLogin} />
    </div>
  );

  const handleCreateBlog = async (data) => {
    try {
      const newBlog = await blogService.create(data);
      setBlogs(blogs.concat(newBlog));
      dispatch(
        setNotification(
          {
            message: `a new blog ${data.title} by ${data.author} added`,
            error: false,
          },
          3
        )
      );
    } catch ({ response: { data } }) {
      dispatch(setNotification({ message: data.error, error: true }, 3));
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("userLogged");
  };

  const handleLikes = async (id) => {
    const likedBlog = await blogService.like(id);
    const newBlogs = blogs.map((blog) => (id === blog.id ? likedBlog : blog));
    setBlogs(newBlogs);
  };

  const handleRemove = async (id) => {
    await blogService.remove(id);
    const newBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(newBlogs);
  };

  const blogsList = () => (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="new note">
        <BlogForm createBlog={handleCreateBlog} />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLikes={handleLikes}
            removeButton={blog.user.username === user.username}
            handleRemove={handleRemove}
          />
        ))}
    </div>
  );

  return (
    <div>
      {user && blogsList()}
      {!user && loginForm()}
    </div>
  );
};

export default App;
