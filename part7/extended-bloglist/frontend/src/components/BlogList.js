import { useSelector } from "react-redux";
import Blog from "./Blog";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  return (
    blogs &&
    user && (
      <div>
        {blogs
          .concat()
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              removeButton={blog.user.username === user.username}
            />
          ))}
      </div>
    )
  );
};

export default BlogList;