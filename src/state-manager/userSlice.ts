import { createSlice } from "@reduxjs/toolkit";

interface User {
  name: string;
  role: string;
}

interface UsersState {
  info: User;
  loggedIn: boolean;
}
const initialState: UsersState = {
  info: { name: "", role: "" },
  loggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    update: (state, action) => {
      state.info = action.payload;
    },
  },

});

export const { update } = userSlice.actions;
export default userSlice.reducer;
