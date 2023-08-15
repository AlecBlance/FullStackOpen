import { useEffect, useRef } from "react";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogsReducer";
import { checkifLogged } from "./reducers/userReducer";
import BlogList from "./components/BlogList";
import Header from "./components/Header";
import { Route, Routes, useMatch } from "react-router-dom";
import { initializeUsers } from "./reducers/usersReducer";
import Users from "./components/Users";
import UserInfo from "./components/UserInfo";
import BlogInfo from "./components/BlogInfo";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const matchUser = useMatch("/users/:id");
  const matchBlog = useMatch("/blogs/:id");
  const userId = matchUser ? matchUser.params.id : null;
  const blogId = matchBlog ? matchBlog.params.id : null;
  const blogFormRef = useRef();

  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs());
      dispatch(initializeUsers());
    }
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(checkifLogged());
  }, [dispatch]);

  const toggleVisibility = () => blogFormRef.current.toggleVisibility();

  const loginForm = () => (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="p-8 rounded-lg w-5/6 md:w-3/4 lg:w-2/4 xl:w-1/4">
        <h1 className="text-center text-white font-semibold text-2xl mb-10">
          Share and learn together.
        </h1>
        <Notification />
        <LoginForm />
      </div>
    </div>
  );

  const blogsList = () => (
    <div className="flex flex-col">
      <Header />
      <div className="h-20 bg-gradient-to-r from-sky-400 to-blue-500 flex justify-center items-center">
        <p className="text-white font-bold text-xl tracking-widest">BLOG</p>
      </div>
      <Notification inDashboard={matchBlog} />
      <div className="mx-3 self-center md:w-4/6 mt-4 w-3/4 xl:w-2/6 md:mx-auto">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Togglable
                  buttonLabel="Create blog"
                  showClass="bg-teal-500 text-white p-3 w-full rounded-3xl text-md font-bold hover:bg-teal-400"
                  ref={blogFormRef}
                >
                  <BlogForm toggleVisibility={toggleVisibility} />
                </Togglable>
                <BlogList />
              </>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserInfo id={userId} />} />
          <Route path="/blogs/:id" element={<BlogInfo id={blogId} />} />
        </Routes>
      </div>
    </div>
  );

  return <div>{user ? blogsList() : loginForm()}</div>;
};

export default App;
