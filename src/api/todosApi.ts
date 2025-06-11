import axios from "axios";
import { API_URL } from "../configs/config";
import type { NewTodoData } from "../types/types";

export function apiGetTodos() {
  return axios.get(API_URL + "/todos");
}

export function apiAddTodo(data: NewTodoData) {
  return axios.post(API_URL + "/todos", data);
}

export function apiUpdateTodo(id: number, data: NewTodoData) {
  return axios.put(API_URL + `/todos/${id}`, data);
}

export function apiDeleteTodo(id: number) {
  return axios.delete(API_URL + `/todos/${id}`);
}
