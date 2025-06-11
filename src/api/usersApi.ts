import axios from "axios";
import { API_URL } from "../configs/config";
import type { LoginData } from "../types/types";

export function apiLogin(data: LoginData) {
  return axios.post(API_URL + "/login", data);
}

export function apiLogout() {
  return axios.post(API_URL + "/logout");
}

export function apiCheckAuth() {
  return axios.get(API_URL + "/me");
}

export function apiGetUsers() {
  return axios.get(API_URL + "/users");
}