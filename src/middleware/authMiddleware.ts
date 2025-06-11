import type { Middleware } from "@reduxjs/toolkit";
import { logout } from "../state-manager/userSlice";

export const authMiddleware: Middleware = ({ dispatch }) => (next) => (action) => {
  if (
    action.type.endsWith("/rejected") &&
    action.payload?.status === 401
  ) {
    dispatch(logout());
  }

  return next(action);
};