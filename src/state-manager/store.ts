import {
  combineReducers,
  configureStore,
  type ThunkDispatch,
  type UnknownAction,
} from "@reduxjs/toolkit";
import { authMiddleware } from "../middleware/authMiddleware";
import loaderReducer from "./loaderSlice";
import todosReducer from "./todosSlice";
import userReducer from "./userSlice";
import usersListReducer from "./usersListSlice";

const rootReducer = combineReducers({
  user: userReducer,
  todos: todosReducer,
  loader: loaderReducer,
  users: usersListReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
});

export default store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>;
