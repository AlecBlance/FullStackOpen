import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";
import { updateUserBlogs } from "./usersReducer";

const initialState = [];

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    filterBlog(state, action) {
      return state.filter(({ id }) => id !== action.payload);
    },
    updateBlog(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      );
    },
    addBlog(state, action) {
      return state.concat(action.payload);
    },
  },
});

export const { setBlogs, filterBlog, updateBlog, addBlog } = blogsSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    blogService.remove(id);
    dispatch(filterBlog(id));
  };
};

export const likeBlog = (id) => {
  return async (dispatch) => {
    const likedBlog = await blogService.like(id);
    dispatch(updateBlog(likedBlog));
  };
};

export const createBlog = (data) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(data);
      dispatch(updateUserBlogs(newBlog));
      dispatch(addBlog(newBlog));
      dispatch(
        setNotification(
          {
            message: `A new blog "${data.title}" by ${data.author} was added`,
            error: false,
          },
          3
        )
      );
    } catch ({ response: { data } }) {
      dispatch(setNotification({ message: data.error, error: true }, 3));
    }
  };
};

export const commentBlog = (data) => {
  return async (dispatch) => {
    const response = await blogService.comment(data);
    dispatch(updateBlog(response));
  };
};

export default blogsSlice.reducer;
