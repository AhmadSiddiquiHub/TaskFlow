import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import todoReducer from "./slices/todoSlice";

const store = configureStore({
  reducer: {
    auth: userReducer,
    todo: todoReducer,
  },
});

export default store;
