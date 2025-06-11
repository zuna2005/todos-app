import { configureStore } from "@reduxjs/toolkit";
import { authMiddleware } from "../middleware/authMiddleware";
import loaderReducer from "./loaderSlice";
import todosReducer from "./todosSlice";
import userReducer from "./userSlice";
import usersListReducer from "./usersListSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    todos: todosReducer,
    loader: loaderReducer,
    users: usersListReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;