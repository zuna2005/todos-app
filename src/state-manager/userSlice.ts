import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCheckAuth, apiLogin, apiLogout } from "../api/usersApi";
import { handleError } from "../helpers/errorHandler";
import type { LoginData } from "../types/types";
import type { RootState } from "./store";

interface User {
  name: string;
  role: string;
}
interface UsersState {
  info: User;
  authLoaded: boolean;
}

const defaultUser = { name: "", role: "" };

const initialState: UsersState = {
  info: defaultUser,
  authLoaded: false,
};

export const login = createAsyncThunk(
  "user/login",
  async (data: LoginData, { rejectWithValue }) => {
    try {
      const res = await apiLogin(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(handleError(err));
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      await apiLogout();
    } catch (err) {
      return rejectWithValue(handleError(err));
    }
  }
);

export const checkAuth = createAsyncThunk(
  "user/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiCheckAuth();
      return res.data;
    } catch (err) {
      return rejectWithValue(handleError(err));
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.info = action.payload;
        state.authLoaded = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.info = action.payload;
        state.authLoaded = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authLoaded = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.info = defaultUser;
        state.authLoaded = true;
      });
  },
});

export default userSlice.reducer;

export const selectCurrentRole = (state: RootState) => state.user.info.role;
export const selectAuthLoaded = (state: RootState) => state.user.authLoaded;