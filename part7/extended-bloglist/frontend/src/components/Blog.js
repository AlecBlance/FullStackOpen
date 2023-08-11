import { useState } from "react";
import { likeBlog, removeBlog } from "../reducers/blogsReducer";
import { useDispatch, useSelector } from "react-redux";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);
  const showWhenVisible = { display: visible ? "" : "none" };
  const viewButtonLabel = visible ? "hide" : "view";
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const toggleVisibility = () => setVisible(!visible);

  const remove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
      dispatch(removeBlog(blog.id));
  };

  const handleLikes = () => {
    dispatch(likeBlog(blog.id));
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
          <button className="likeButton" onClick={handleLikes}>
            like
          </button>
        </p>
        <p>{blog.user.name}</p>
        {blog.user.username === user.username && (
          <button onClick={remove}>remove</button>
        )}
      </div>
    </div>
  );
};

export default Blog;
