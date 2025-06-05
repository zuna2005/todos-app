import axios from "axios";
import { API_URL } from "../configs/config";
import type { LoginData } from "../types/types";

export function login(data: LoginData) {
  return axios.post(API_URL + "/login", data);
}

export function checkAuth() {
  return axios.get(API_URL + "/me");
}
