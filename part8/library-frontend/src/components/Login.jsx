import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const Login = ({ show, setPage, setToken, setError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("userToken", token);
      setPage("books");
      setUsername("");
      setPassword("");
    }
  }, [result.data, setToken, setPage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    login({ variables: { username, password } });
  };

  return (
    show && (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <p>username</p>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div>
            <p>password</p>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button>login</button>
        </form>
      </div>
    )
  );
};
export default Login;
