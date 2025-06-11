import type { UnknownAction, ThunkDispatch } from "@reduxjs/toolkit";
import { getTodos } from "../state-manager/todosSlice";
import { handleError } from "./errorHandler";

export async function withRefresh<State = unknown, Extra = unknown>(
  dispatch: ThunkDispatch<State, Extra, UnknownAction>,
  mainAction: () => Promise<unknown>
) {
  let mainError;

  try {
    await mainAction();
  } catch (err) {
    mainError = handleError(err);
    if (mainError.status === 401) throw mainError;
  }

  try {
    await dispatch(getTodos()).unwrap();
  } catch (refreshErr) {
    if (!mainError) throw handleError(refreshErr);
  }

  if (mainError) throw mainError;
}
