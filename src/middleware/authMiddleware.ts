import type { Middleware } from "@reduxjs/toolkit";
import { logout } from "../state-manager/userSlice";
import type { AppDispatch, RootState } from "../state-manager/store";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const authMiddleware: Middleware<{}, RootState, AppDispatch> =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (
      typeof action === "object" &&
      action !== null &&
      "type" in action &&
      typeof action.type === "string" &&
      action.type.endsWith("/rejected") &&
      "payload" in action &&
      typeof action.payload === "object" &&
      action.payload !== null &&
      "status" in action.payload &&
      typeof action.payload.status === "number" &&
      action.payload.status === 401
    ) {
      dispatch(logout());
    }

    return next(action);
  };
