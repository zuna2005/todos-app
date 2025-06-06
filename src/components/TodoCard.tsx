import { useState } from "react";
import type { Todo } from "../types/types";
import TodoCardForm from "./TodoCardForm";
import TodoCardView from "./TodoCardView";
import { apiUpdateTodo } from "../api/todosApi";

interface TodoCardProps {
  todo: Todo;
  onDelete: (id: number) => void;
  onUpdate: (todo: Todo) => void;
}

function TodoCard({ todo, onDelete, onUpdate }: TodoCardProps) {
  const [editMode, setEditMode] = useState(false);
  return editMode ? (
    <TodoCardForm
      isNew={false}
      setEditMode={setEditMode}
      updateTodos={onUpdate}
      onSave={(data) => apiUpdateTodo(todo.id, data)}
      todo={todo}
    />
  ) : (
    <TodoCardView todo={todo} setEditMode={setEditMode} onDelete={onDelete} />
  );
}

export default TodoCard;
