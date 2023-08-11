import { useSelector } from "react-redux";

const Users = () => {
  const users = useSelector((state) => state.users);

  return (
    <>
      <h1>Users</h1>
      <table>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        {users
          .concat()
          .sort((a, b) => b.blogs.length - a.blogs.length)
          .map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
      </table>
    </>
  );
};

export default Users;
