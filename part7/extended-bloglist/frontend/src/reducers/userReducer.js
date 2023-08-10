import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

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

export default userSlice.reducer;
