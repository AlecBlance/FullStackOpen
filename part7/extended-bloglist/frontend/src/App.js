import { useEffect } from "react";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogsReducer";
import { checkifLogged } from "./reducers/userReducer";
import BlogList from "./components/BlogList";
import UserHeaderInfo from "./components/UserHeaderInfo";
import { Route, Routes, useMatch } from "react-router-dom";
import { initializeUsers } from "./reducers/usersReducer";
import Users from "./components/Users";
import UserInfo from "./components/UserInfo";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const match = useMatch("/users/:id");
  const id = match ? match.params.id : null;

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs());
      dispatch(initializeUsers());
    }
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(checkifLogged());
  }, [dispatch]);

  const loginForm = () => (
    <div>
      <h1>log in to application</h1>
      <Notification />
      <LoginForm />
    </div>
  );

  const blogsList = () => (
    <div>
      <h2>blogs</h2>
      <Notification />
      <UserHeaderInfo />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Togglable buttonLabel="new note">
                <BlogForm />
              </Togglable>
              <BlogList />
            </>
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserInfo id={id} />} />
      </Routes>
    </div>
  );

  return (
    <div>
      {user && blogsList()}
      {!user && loginForm()}
    </div>
  );
};

export default App;
