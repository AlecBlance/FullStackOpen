import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";

const initialState = [];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
    updateUsers(state, action) {
      return state.map((user) =>
        user.id === action.payload.userId
          ? { ...user, blogs: user.blogs.concat(action.payload.blog) }
          : user
      );
    },
  },
});

export const { setUsers, updateUsers } = usersSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll();
    dispatch(setUsers(users));
  };
};

export const updateUserBlogs = (blog) => {
  return async (dispatch) => {
    const userId = blog.user.id;
    const { title, author, id, url } = blog;
    const data = { userId, blog: { title, author, id, url } };
    dispatch(updateUsers(data));
  };
};

export default usersSlice.reducer;
