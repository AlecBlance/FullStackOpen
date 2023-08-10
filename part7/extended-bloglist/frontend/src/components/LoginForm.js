import { useState } from "react";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/userReducer";
import {
  clearNotification,
  setNotification,
} from "../reducers/notificationReducer";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const login = async (data) => {
    try {
      const user = await loginService.login(data);
      window.localStorage.setItem("userLogged", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      dispatch(clearNotification());
    } catch ({ response: { data } }) {
      dispatch(setNotification({ message: data.error, error: true }, 3));
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    login({ username, password });
    setPassword("");
    setUsername("");
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          name="Username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          name="Password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
