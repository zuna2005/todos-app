import axios from "axios";
import { errorMessages } from "../configs/config";

export function handleError(err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
        const status = err.response.status;
        const message =
          status === 400
            ? err.response.data.message || errorMessages.default
            : errorMessages[status] || errorMessages.default;
        return { message, status };
      }
      console.error(err);
      return { message: errorMessages.default, status: null };
}