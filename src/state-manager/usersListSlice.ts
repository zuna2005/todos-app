import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { handleError } from "../helpers/errorHandler";
import { apiGetUsers } from "../api/usersApi";

interface User {
  login: string;
  role: string;
  name: string;
}

interface UsersState {
  list: User[];
}
const initialState: UsersState = {
  list: [],
};

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiGetUsers();
      return res.data;
    } catch (err) {
      return rejectWithValue(handleError(err));
    }
  }
);

export const usersListSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export default usersListSlice.reducer;

export const selectUsers = (state: RootState) => state.users.list;
