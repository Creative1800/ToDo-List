import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './features/todoSlice';
import listsReducer from './features/listsSlice';
import ThunkMiddleware from "redux-thunk";

export default configureStore({
  reducer: {
    lists: listsReducer,
    todos: todoReducer,
  },
  middleware: [ThunkMiddleware]
});