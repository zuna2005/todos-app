import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface User {
  name: string;
  role: string;
}
interface UsersState {
  info: User;
  loggedIn: boolean;
}

const defaultUser = { name: "", role: "" };

const initialState: UsersState = {
  info: defaultUser,
  loggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.info = action.payload;
      state.loggedIn = true;
    },
    resetUser: (state) => {
      state.info = defaultUser;
      state.loggedIn = false;
    }
  },
});

export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;

export const selectCurrentRole = (state: RootState) => state.user.info.role;