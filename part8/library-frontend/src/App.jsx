import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommendations from "./components/Recommendations";
import { useApolloClient } from "@apollo/client";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [error, setError] = useState("");
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.clearStore();
    setPage("books");
  };

  // eslint-disable-next-line react/prop-types
  const Notify = ({ errorMessage }) => {
    if (!errorMessage) {
      return null;
    }
    setTimeout(() => setError(""), 2000);
    return <div style={{ color: "red" }}>{errorMessage}</div>;
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommendations")}>
              recommendations
            </button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Notify errorMessage={error} />

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommendations show={page === "recommendations"} />

      <Login
        show={page === "login"}
        setPage={setPage}
        setToken={setToken}
        setError={setError}
      />
    </div>
  );
};

export default App;
