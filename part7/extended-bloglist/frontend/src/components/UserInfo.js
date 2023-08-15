import { useSelector } from "react-redux";
import Avatar, { genConfig } from "react-nice-avatar";

const UserInfo = ({ id }) => {
  const user = useSelector(
    (state) => state.users.filter((user) => user.id === id)[0]
  );

  const config = genConfig(user.name);

  return (
    id &&
    user && (
      <div className="bg-slate-800 rounded-lg p-5">
        <div className="flex-col flex items-center mb-5">
          <Avatar {...config} className="h-32 w-32 mb-3" />
          <h1 className="text-slate-200 font-semibold text-xl">{user.name}</h1>
        </div>
        <h2 className="font-semibold text-slate-200 mb-5">Added blogs</h2>
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id} className="flex items-center mb-3">
              <svg
                className="h-8 w-8 mr-5 fill-slate-400"
                id="Capa_1"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path d="m100 323.265h60c11.046 0 20-8.954 20-20s-8.954-20-20-20h-60c-11.046 0-20 8.954-20 20s8.954 20 20 20z" />
                  <path d="m100 243.265h60c11.046 0 20-8.954 20-20s-8.954-20-20-20h-60c-11.046 0-20 8.954-20 20s8.954 20 20 20z" />
                  <path d="m217.441 303.265c0 11.046 8.954 20 20 20 41.821 0 81.139-16.286 110.711-45.858l146.26-146.274c23.448-23.447 23.452-61.402 0-84.853-23.393-23.394-61.458-23.394-84.853 0l-146.26 146.274c-29.571 29.573-45.858 68.89-45.858 110.711zm220.404-228.7c7.796-7.798 20.486-7.798 28.283 0 7.816 7.814 7.819 20.467 0 28.284l-146.261 146.274c-16.719 16.72-37.624 27.735-60.352 32.068 4.333-22.727 15.349-43.632 32.067-60.352z" />
                  <path d="m60 483.265c14.776 0 28.978-5.422 39.992-15.27l27.647-24.73h204.361c55.141 0 100-44.86 100-100v-44.863c0-11.046-8.954-20-20-20s-20 8.954-20 20v44.863c0 33.084-26.916 60-60 60h-212c-4.92 0-9.667 1.813-13.334 5.093l-33.338 29.821c-3.669 3.28-8.402 5.086-13.328 5.086-11.028 0-20-8.972-20-20v-240c0-33.084 26.916-60 60-60h167.749c11.046 0 20-8.954 20-20s-8.954-20-20-20h-167.749c-55.141 0-100 44.86-100 100v240c0 33.084 26.916 60 60 60z" />
                </g>
              </svg>
              <p className="text-slate-200 text-sm">{blog.title}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default UserInfo;
