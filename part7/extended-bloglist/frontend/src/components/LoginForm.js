import { useDispatch } from "react-redux";
import { login } from "../reducers/userReducer";
import { useField } from "../hooks";

const LoginForm = () => {
  const [username, clearUsername] = useField("text");
  const [password, clearPassword] = useField("password");

  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(login({ username: username.value, password: password.value }));
    clearUsername();
    clearPassword();
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="bg-slate-800 p-3 pt-2 flex flex-col text-slate-400 rounded-xl my-3">
        <p className="mb-1 text-xs">username</p>
        <input
          {...username}
          className="bg-transparent text-slate-100 text-sm focus:border-none focus:outline-none"
        />
      </div>
      <div className="bg-slate-800 p-3 pt-2 flex flex-col text-slate-400 rounded-xl my-3">
        <p className="mb-1 text-xs">password</p>
        <input
          {...password}
          className="bg-transparent text-slate-100 text-sm focus:border-none focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="mt-10 bg-teal-500 rounded-3xl py-2 px-5 text-slate-200 text-sm font-semibold hover:bg-teal-400"
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
