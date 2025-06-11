import axios from "axios";

axios.defaults.withCredentials = true;

export const API_URL = import.meta.env.VITE_API_URL;

export const errorMessages: Record<number | string, string> = {
  404: "The item no longer exists",
  403: "You are not authorized to perform this action",
  401: "You are unauthenticated. Please log in",
  logout: "Error while logging out. Try again later",
  required: "This field is required",
  default: "Oops! Something went wrong",
};

export const successMessages: Record<string, string> = {
    add: "Todo added successfully!",
    update: "Todo updated successfully!",
    delete: "Todo deleted successfully!"
}
