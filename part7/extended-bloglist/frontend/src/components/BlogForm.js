import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogsReducer";
import { useField } from "../hooks";

const BlogForm = () => {
  const [title, clearTitle] = useField("text");
  const [author, clearAuthor] = useField("text");
  const [url, clearUrl] = useField("text");

  const dispatch = useDispatch();

  const handleCreateBlog = (event) => {
    event.preventDefault();
    dispatch(
      createBlog({ title: title.value, author: author.value, url: url.value })
    );
    clearTitle();
    clearAuthor();
    clearUrl();
  };

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={handleCreateBlog}>
        <div>
          title:
          <input {...title} />
        </div>
        <div>
          author:
          <input {...author} />
        </div>
        <div>
          url:
          <input {...url} />
        </div>
        <button id="blogForm" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
