import { useDispatch } from "react-redux";
import { login } from "../reducers/userReducer";
import { useField } from "../hooks";

const LoginForm = () => {
  const [username, clearUsername] = useField("text");
  const [password, clearPassword] = useField("password");

  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(login({ username, password }));
    clearUsername();
    clearPassword();
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input {...username} />
      </div>
      <div>
        password
        <input {...password} />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
