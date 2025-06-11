import { configureStore } from "@reduxjs/toolkit";
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
  
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;