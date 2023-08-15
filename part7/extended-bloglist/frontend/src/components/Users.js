import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Avatar, { genConfig } from "react-nice-avatar";

const Users = () => {
  const users = useSelector((state) => state.users);

  return (
    <>
      <table className="text-slate-200 bg-slate-900 rounded-lg w-full table-auto border-collapse">
        <tbody>
          <tr className="bg-slate-800">
            <th className="p-3 rounded-tl-lg w-1/2">Users</th>
            <th className="p-3 rounded-tr-lg w-1/2">Blogs created</th>
          </tr>
          {users
            .concat()
            .sort((a, b) => b.blogs.length - a.blogs.length)
            .map((user) => {
              const config = genConfig(user.name);
              return (
                <tr key={user.id}>
                  <td className=" p-3 flex items-center justify-center">
                    <Link to={`/users/${user.id}`}>
                      <Avatar
                        {...config}
                        className="h-14 w-14 mr-5 hover:brightness-110"
                      />
                    </Link>
                    <Link
                      to={`/users/${user.id}`}
                      className="hover:text-teal-400"
                    >
                      {user.name}
                    </Link>
                  </td>
                  <td className="text-center p-3">{user.blogs.length}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default Users;
