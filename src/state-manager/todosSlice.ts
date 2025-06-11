import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  apiAddTodo,
  apiDeleteTodo,
  apiGetTodos,
  apiUpdateTodo,
} from "../api/todosApi";
import { handleError } from "../helpers/errorHandler";
import { withRefresh } from "../helpers/refresher";
import type { NewTodoData, Todo } from "../types/types";
import type { RootState } from "./store";

interface TodosState {
  list: Todo[];
}
const initialState: TodosState = {
  list: [],
};

export const getTodos = createAsyncThunk(
  "todos/getTodos",
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiGetTodos();
      return res.data;
    } catch (err) {
      return rejectWithValue(handleError(err));
    }
  }
);

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (data: NewTodoData, { dispatch, rejectWithValue }) => {
    try {
      await withRefresh(dispatch, () => apiAddTodo(data));
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (
    payload: { id: number; data: NewTodoData },
    { dispatch, rejectWithValue }
  ) => {
    try {
      await withRefresh(dispatch, () =>
        apiUpdateTodo(payload.id, payload.data)
      );
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: number, { dispatch, rejectWithValue }) => {
    try {
      await withRefresh(dispatch, () => apiDeleteTodo(id));
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    // .addCase(addTodo.fulfilled, (state, action) => {
    //   state.list.push(action.payload);
    // })
    // .addCase(updateTodo.fulfilled, (state, action) => {
    //   const updatedTodo = action.payload;
    //   state.list = state.list.map((todo) =>
    //     todo.id === updatedTodo.id ? updatedTodo : todo
    //   );
    // })
    // .addCase(deleteTodo.fulfilled, (state, action) => {
    //   const idToDelete = action.payload;
    //   state.list = state.list.filter((todo) => todo.id !== idToDelete);
    // });
  },
});

export default todosSlice.reducer;

export const selectTodos = (state: RootState) => state.todos.list;
export const selectMyTodos = (state: RootState) => state.todos.list.filter(todo => todo.createdBy === state.user.info.role);
