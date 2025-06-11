import { toast } from "react-toastify";
import Delete from "../assets/delete.svg";
import Edit from "../assets/edit.svg";
import { successMessages } from "../configs/config";
import { useAppDispatch, useAppSelector } from "../state-manager/hooks";
import { deleteTodo } from "../state-manager/todosSlice";
import { selectCurrentRole } from "../state-manager/userSlice";
import type { Todo } from "../types/types";

interface TodoCardViewProps {
  todo: Todo;
  setEditMode: (value: boolean) => void;
}
function TodoCardView({ todo, setEditMode }: TodoCardViewProps) {
  const currentUser = useAppSelector(selectCurrentRole);
  const dispatch = useAppDispatch();

  function handleDeleteTodo() {
    dispatch(deleteTodo(todo.id))
      .unwrap()
      .then(() => {
        toast.success(successMessages.delete);
      })
      .catch((err) => toast.error(err.message));
  }
  return (
    <div className="card m-3 p-2">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">{todo.title}</h5>
          {(currentUser === "admin" || currentUser === todo.createdBy) && (
            <div>
              <button className="btn" onClick={() => setEditMode(true)}>
                <img src={Edit} />
              </button>
              <button className="btn" onClick={handleDeleteTodo}>
                <img src={Delete} />
              </button>
            </div>
          )}
        </div>
        <p className="card-text">{todo.description}</p>
      </div>
    </div>
  );
}

export default TodoCardView;
