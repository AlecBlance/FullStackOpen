import Avatar, { genConfig } from "react-nice-avatar";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  const config = genConfig(blog.author);

  return (
    <Link to={`/blogs/${blog.id}`}>
      <div className="flex my-5 items-center p-4 border bg-slate-800 border-slate-700 rounded-lg shadow-lg hover:shadow-slate-600/50">
        <Avatar className="h-12 w-12" {...config} />
        <div className="ml-8">
          <h3 className="text-slate-200">{blog.title}</h3>
          <p className="text-slate-500 text-xs">by {blog.author}</p>
        </div>
      </div>
    </Link>
  );
};

export default Blog;
