import { useDispatch, useSelector } from "react-redux";
import { likeBlog, commentBlog } from "../reducers/blogsReducer";
import { useField } from "../hooks";

const BlogInfo = ({ id }) => {
  const dispatch = useDispatch();
  const [comment, clearComment] = useField("text");

  const blog = useSelector(
    (state) => state.blogs.filter((blog) => blog.id === id)[0]
  );

  const handleLikes = () => {
    dispatch(likeBlog(id));
  };

  const handleComment = (event) => {
    event.preventDefault();
    dispatch(commentBlog({ id, comment: comment.value }));
    clearComment();
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
        <h3>comments</h3>
        <form onSubmit={handleComment}>
          <input {...comment} />
          <button>add comment</button>
        </form>
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    )
  );
};

export default BlogInfo;
