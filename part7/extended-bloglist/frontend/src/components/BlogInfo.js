import { useDispatch, useSelector } from "react-redux";
import { likeBlog, commentBlog } from "../reducers/blogsReducer";
import { useField } from "../hooks";
import Post from "./Post";

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
      <div className="mt-10">
        <Post
          owner={blog.user.name}
          content={
            <Post owner={blog.author} content={blog.title} link={blog.url} />
          }
        />
        <div className="mt-5 flex mb-2 border-b border-b-slate-600 pb-5">
          <svg
            className="h-5 w-5 fill-blue-400"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 511.999 511.999"
            xmlSpace="preserve"
          >
            <g>
              <g>
                <path d="M15.34,224.948c-8.365,0-15.146,6.782-15.146,15.146v222.458c0,8.365,6.782,15.146,15.146,15.146h91.253V224.948H15.34z" />
              </g>
            </g>
            <g>
              <g>
                <path
                  d="M511.805,308.587c0-19.227-10.331-36.087-25.733-45.321c5.901-8.521,9.362-18.858,9.362-29.985
			c0-29.113-23.686-52.799-52.799-52.799H331.177c3.416-15.48,8.088-38.709,11.341-63.026c8.466-63.281,2.68-98.376-18.207-110.445
			c-13.022-7.523-27.062-9.049-39.534-4.301c-9.635,3.67-22.647,12.693-30.062,34.838l-29.294,76.701
			c-14.851,36.677-60.33,75.182-88.535,96.473V484.4c52.274,18.316,106.822,27.6,162.472,27.6h121.446
			c29.113,0,52.799-23.686,52.799-52.799c0-10.195-2.905-19.725-7.93-27.804c17.601-8.572,29.759-26.646,29.759-47.503
			c0-11.128-3.461-21.463-9.362-29.985C501.474,344.675,511.805,327.814,511.805,308.587z"
                />
              </g>
            </g>
          </svg>
          <p className="ml-2 text-slate-500">{blog.likes} likes</p>
        </div>
        <button
          onClick={handleLikes}
          className="text-teal-400 flex font-semibold py-2 px-5 hover:bg-slate-700 mb-2"
        >
          <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 478.2 478.2"
            xmlSpace="preserve"
            className="h-5 w-5 fill-teal-400 mr-2"
          >
            <g>
              <path
                d="M457.575,325.1c9.8-12.5,14.5-25.9,13.9-39.7c-0.6-15.2-7.4-27.1-13-34.4c6.5-16.2,9-41.7-12.7-61.5
		c-15.9-14.5-42.9-21-80.3-19.2c-26.3,1.2-48.3,6.1-49.2,6.3h-0.1c-5,0.9-10.3,2-15.7,3.2c-0.4-6.4,0.7-22.3,12.5-58.1
		c14-42.6,13.2-75.2-2.6-97c-16.6-22.9-43.1-24.7-50.9-24.7c-7.5,0-14.4,3.1-19.3,8.8c-11.1,12.9-9.8,36.7-8.4,47.7
		c-13.2,35.4-50.2,122.2-81.5,146.3c-0.6,0.4-1.1,0.9-1.6,1.4c-9.2,9.7-15.4,20.2-19.6,29.4c-5.9-3.2-12.6-5-19.8-5h-61
		c-23,0-41.6,18.7-41.6,41.6v162.5c0,23,18.7,41.6,41.6,41.6h61c8.9,0,17.2-2.8,24-7.6l23.5,2.8c3.6,0.5,67.6,8.6,133.3,7.3
		c11.9,0.9,23.1,1.4,33.5,1.4c17.9,0,33.5-1.4,46.5-4.2c30.6-6.5,51.5-19.5,62.1-38.6c8.1-14.6,8.1-29.1,6.8-38.3
		c19.9-18,23.4-37.9,22.7-51.9C461.275,337.1,459.475,330.2,457.575,325.1z M48.275,447.3c-8.1,0-14.6-6.6-14.6-14.6V270.1
		c0-8.1,6.6-14.6,14.6-14.6h61c8.1,0,14.6,6.6,14.6,14.6v162.5c0,8.1-6.6,14.6-14.6,14.6h-61V447.3z M431.975,313.4
		c-4.2,4.4-5,11.1-1.8,16.3c0,0.1,4.1,7.1,4.6,16.7c0.7,13.1-5.6,24.7-18.8,34.6c-4.7,3.6-6.6,9.8-4.6,15.4c0,0.1,4.3,13.3-2.7,25.8
		c-6.7,12-21.6,20.6-44.2,25.4c-18.1,3.9-42.7,4.6-72.9,2.2c-0.4,0-0.9,0-1.4,0c-64.3,1.4-129.3-7-130-7.1h-0.1l-10.1-1.2
		c0.6-2.8,0.9-5.8,0.9-8.8V270.1c0-4.3-0.7-8.5-1.9-12.4c1.8-6.7,6.8-21.6,18.6-34.3c44.9-35.6,88.8-155.7,90.7-160.9
		c0.8-2.1,1-4.4,0.6-6.7c-1.7-11.2-1.1-24.9,1.3-29c5.3,0.1,19.6,1.6,28.2,13.5c10.2,14.1,9.8,39.3-1.2,72.7
		c-16.8,50.9-18.2,77.7-4.9,89.5c6.6,5.9,15.4,6.2,21.8,3.9c6.1-1.4,11.9-2.6,17.4-3.5c0.4-0.1,0.9-0.2,1.3-0.3
		c30.7-6.7,85.7-10.8,104.8,6.6c16.2,14.8,4.7,34.4,3.4,36.5c-3.7,5.6-2.6,12.9,2.4,17.4c0.1,0.1,10.6,10,11.1,23.3
		C444.875,295.3,440.675,304.4,431.975,313.4z"
              />
            </g>
          </svg>
          Like
        </button>
        <form onSubmit={handleComment} className="flex">
          <input
            {...comment}
            className="grow mr-5 rounded-lg border border-slate-500 text-slate-200 py-2 px-5 focus:outline-none bg-slate-800 "
          />
          <button className="bg-teal-500 py-1 px-3 rounded-3xl hover:bg-teal-400 text-white font-semibold">
            Comment
          </button>
        </form>
        <h1 className="mt-7 mb-5 text-slate-200 font-semibold">Comments</h1>
        <ul className="ml-5">
          {blog.comments.map((comment, index) => (
            <li
              key={index}
              className="bg-slate-700 w-fit py-2 px-5 my-3 rounded-3xl text-slate-200"
            >
              {comment}
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default BlogInfo;
