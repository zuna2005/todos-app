import axios from "axios";
import { API_URL } from "../configs/config";
import type { LoginData } from "../types/types";

axios.defaults.withCredentials = true;

export function login(data: LoginData) {
  return axios.post(API_URL + "/login", data);
}

export function logout() {
  return axios.post(API_URL + "/logout");
}

export function checkAuth() {
  return axios.get(API_URL + "/me");
}

export function getUsers() {
  return axios.get(API_URL + "/users");
}