import { useState } from "react";
import { setBlogs } from "../reducers/blogsReducer";
import blogService from "../services/blogs";
import { useSelector, useDispatch } from "react-redux";

const Blog = ({ blog, removeButton }) => {
  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? "" : "none" };
  const viewButtonLabel = visible ? "hide" : "view";
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const toggleVisibility = () => setVisible(!visible);

  const remove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
      handleRemove(blog.id);
  };

  const handleLikes = async (id) => {
    const likedBlog = await blogService.like(id);
    const newBlogs = blogs.map((blog) => (id === blog.id ? likedBlog : blog));
    dispatch(setBlogs(newBlogs));
  };

  const handleRemove = async (id) => {
    await blogService.remove(id);
    const newBlogs = blogs.filter((blog) => blog.id !== id);
    dispatch(setBlogs(newBlogs));
  };

  return (
    <div className="blog">
      <div>
        {blog.title} {blog.author}
        <button className="viewButton" onClick={toggleVisibility}>
          {viewButtonLabel}
        </button>
      </div>
      <div style={showWhenVisible} className="togglableInfo">
        <p>{blog.url}</p>
        <p>
          likes:{blog.likes}{" "}
          <button className="likeButton" onClick={() => handleLikes(blog.id)}>
            like
          </button>
        </p>
        <p>{blog.user.name}</p>
        {removeButton && <button onClick={remove}>remove</button>}
      </div>
    </div>
  );
};

export default Blog;
