import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './todoSlice';
import ThunkMiddleware from "redux-thunk";

export default configureStore({
  reducer: {
    todos: todoReducer,
  },
  middleware: [ThunkMiddleware]
});