import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { clearNotification, setNotification } from "./notificationReducer";

const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const checkifLogged = () => {
  return async (dispatch) => {
    const userLogged = window.localStorage.getItem("userLogged");
    if (userLogged) {
      const user = JSON.parse(userLogged);
      blogService.setToken(user.token);
      dispatch(setUser(user));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(setUser(null));
    window.localStorage.removeItem("userLogged");
  };
};

export const login = (data) => {
  return async (dispatch) => {
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
};

export default userSlice.reducer;
