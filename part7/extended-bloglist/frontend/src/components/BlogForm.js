import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs } from "../reducers/blogsReducer";
import { setNotification } from "../reducers/notificationReducer";
import blogService from "../services/blogs";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  const createBlog = async (data) => {
    try {
      const newBlog = await blogService.create(data);
      dispatch(setBlogs(blogs.concat(newBlog)));
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

  const handleCreateBlog = (event) => {
    event.preventDefault();
    createBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={handleCreateBlog}>
        <div>
          title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="blogForm" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
