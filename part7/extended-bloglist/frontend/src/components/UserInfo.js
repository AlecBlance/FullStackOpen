import { useSelector } from "react-redux";

const UserInfo = ({ id }) => {
  const user = useSelector(
    (state) => state.users.filter((user) => user.id === id)[0]
  );

  return (
    id &&
    user && (
      <>
        <h1>{user.name}</h1>
        <h2>added blogs</h2>
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </>
    )
  );
};

export default UserInfo;
