import axios from "axios";
import { API_URL } from "../configs/config";
import type { NewTodoData } from "../types/types";

axios.defaults.withCredentials = true;

export function getTodos() {
  return axios.get(API_URL + "/todos");
}

export function addTodo(data: NewTodoData) {
    return axios.post(API_URL + "/todos", data);
}
