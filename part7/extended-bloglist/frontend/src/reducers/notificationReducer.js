import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return initialState;
    },
  },
});

export const { createNotification, clearNotification } =
  notificationSlice.actions;

export const setNotification = (message, seconds) => {
  return (dispatch) => {
    dispatch(createNotification(message));
    setTimeout(() => dispatch(clearNotification()), seconds * 1000);
  };
};

export default notificationSlice.reducer;
