import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogsReducer";
import { useField } from "../hooks";

const BlogForm = ({ toggleVisibility }) => {
  const [title, clearTitle] = useField("text");
  const [author, clearAuthor] = useField("text");
  const [url, clearUrl] = useField("text");

  const dispatch = useDispatch();

  const handleCreateBlog = (event) => {
    event.preventDefault();
    toggleVisibility();
    dispatch(
      createBlog({ title: title.value, author: author.value, url: url.value })
    );
    clearTitle();
    clearAuthor();
    clearUrl();
  };

  return (
    <div className="border-slate-700 border rounded-lg bg-slate-900 p-5">
      <h1 className="text-slate-200 text-center text-lg font-bold text-md mb-5">
        Create blog
      </h1>
      <form onSubmit={handleCreateBlog}>
        <div className="flex bg-slate-800 px-2 py-3 rounded-lg mb-2">
          <p className="flex-none text-slate-400 text-xs flex items-center mr-2">
            Blog title:
          </p>
          <input
            className="grow bg-transparent focus:border-none focus:outline-none text-slate-200 text-sm"
            {...title}
          />
        </div>
        <div className="flex bg-slate-800 px-2 py-3 rounded-lg mb-2">
          <p className="flex-none text-slate-400 text-xs flex items-center mr-2">
            Author:
          </p>
          <input
            className="grow bg-transparent focus:border-none focus:outline-none text-slate-200 text-sm"
            {...author}
          />
        </div>
        <div className="flex bg-slate-800 px-2 py-3 rounded-lg mb-2">
          <p className="flex-none text-slate-400 text-xs flex items-center mr-2">
            URL:
          </p>
          <input
            className="grow bg-transparent focus:border-none focus:outline-none text-slate-200 text-sm"
            {...url}
          />
        </div>
        <button
          type="button"
          onClick={toggleVisibility}
          className="bg-slate-700 text-slate-200 px-5 py-2 rounded-3xl font-semibold text-sm mt-3 mr-5 hover:bg-slate-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-teal-500 text-slate-200 px-5 py-2 rounded-3xl font-semibold text-sm mt-3 hover:bg-teal-400"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
