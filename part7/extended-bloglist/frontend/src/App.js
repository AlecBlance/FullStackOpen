import { useEffect } from "react";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogsReducer";
import { checkifLogged } from "./reducers/userReducer";
import BlogList from "./components/BlogList";
import UserInfo from "./components/UserInfo";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkifLogged());
  }, [dispatch]);

  const user = useSelector((state) => state.user);

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
      <UserInfo />
      <Togglable buttonLabel="new note">
        <BlogForm />
      </Togglable>
      <BlogList />
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
