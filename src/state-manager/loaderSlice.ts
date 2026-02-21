import { createSlice, isPending, isRejected, isFulfilled } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface LoaderState {
  loadingCount: number;
}

const initialState: LoaderState = {
  loadingCount: 0,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.loadingCount += 1;
      })
      .addMatcher(isFulfilled, (state) => {
        state.loadingCount = Math.max(0, state.loadingCount - 1);
      })
      .addMatcher(isRejected, (state) => {
        state.loadingCount = Math.max(0, state.loadingCount - 1);
      });
  },
});

export const selectLoading = (state: RootState) => state.loader.loadingCount > 0;

export default loaderSlice.reducer;
