import { useDispatch, useSelector } from "react-redux";
import { likeBlog } from "../reducers/blogsReducer";

const BlogInfo = ({ id }) => {
  const dispatch = useDispatch();

  const blog = useSelector(
    (state) => state.blogs.filter((blog) => blog.id === id)[0]
  );

  const handleLikes = () => {
    dispatch(likeBlog(id));
  };

  return (
    id &&
    blog && (
      <div>
        <h1>
          {blog.title} {blog.author}
        </h1>
        <a href={blog.url}>{blog.url}</a>
        <p>
          {blog.likes} likes<button onClick={handleLikes}>like</button>
        </p>
        <p>added by {blog.user.name}</p>
      </div>
    )
  );
};

export default BlogInfo;
