import { useState } from "react";
import type { TodoCardProps } from "../types/types";
import AddTodoButton from "./AddTodoButton";
import TodoCardForm from "./TodoCardForm";
import TodoCardView from "./TodoCardView";

function TodoCard({ todo, isNew }: TodoCardProps) {
  const [editMode, setEditMode] = useState(false);

  if (editMode) {
    return isNew ? (
      <TodoCardForm isNew={true} setEditMode={setEditMode} />
    ) : (
      <TodoCardForm isNew={false} setEditMode={setEditMode} todo={todo} />
    );
  }

  return isNew ? (
    <AddTodoButton setEditMode={setEditMode} />
  ) : (
    <TodoCardView todo={todo} setEditMode={setEditMode} />
  );
}

export default TodoCard;
