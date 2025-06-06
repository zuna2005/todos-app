import { useState } from "react";
import { toast } from "react-toastify";
import { deleteTodo } from "../api/todosApi";
import Delete from "../assets/delete.svg";
import Edit from "../assets/edit.svg";
import { errorMessages, successMessages } from "../configs/config";
import { useAppSelector } from "../state-manager/hooks";
import { selectCurrentRole } from "../state-manager/userSlice";
import type { Todo } from "../types/types";
import LoadingButton from "./LoadingButton";

function TodoCard({
  todo,
  onDelete,
}: {
  todo: Todo;
  onDelete: (id: number) => void;
}) {
  const [loading, setLoading] = useState(false);
  const currentUser = useAppSelector(selectCurrentRole);

  function handleDeleteTodo() {
    setLoading(true);
    deleteTodo(todo.id)
      .then(() => {
        onDelete(todo.id);
        toast.success(successMessages.delete);
      })
      .catch((err) => {
        const status = err.response?.status;
        toast.error(errorMessages[status] || errorMessages.default);
        console.error(err);
        if (status === 404) onDelete(todo.id);
      })
      .finally(() => setLoading(false));
  }
  return (
    <div className="card m-3 p-2">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">{todo.title}</h5>
          {(currentUser === "admin" || currentUser === todo.createdBy) && (
            <div>
              <button className="btn" disabled={loading}>
                <img src={Edit} />
              </button>
              <LoadingButton loading={loading} onClick={handleDeleteTodo}>
                <img src={Delete} />
              </LoadingButton>
            </div>
          )}
        </div>
        <p className="card-text">{todo.description}</p>
      </div>
    </div>
  );
}

export default TodoCard;
