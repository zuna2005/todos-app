import { useEffect, useState } from "react";
import { apiAddTodo, apiGetTodos } from "../api/todosApi";
import Add from "../assets/add.svg";
import Header from "../components/Header";
import TodoCard from "../components/TodoCard";
import TodoCardForm from "../components/TodoCardForm";
import { useAuth } from "../hooks/useAuth";
import type { Todo } from "../types/types";

function Home() {
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [todos, setTodos] = useState<Array<Todo>>([]);

  useAuth(setLoading);

  useEffect(() => {
    setLoading(true);
    apiGetTodos()
      .then((res) => setTodos(res.data))
      .catch((err) => console.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  function addTodo(newTodo: Todo) {
    setTodos([...todos, newTodo]);
  }
  function updateTodo(updatedTodo: Todo) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
  }
  function deleteTodo(idToDelete: number) {
    setTodos(todos.filter((todo) => todo.id !== idToDelete));
  }
  return (
    <div className="position-relative min-vh-100 p-3">
      {loading && (
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center z-3 bg-white bg-opacity-10">
          <div className="spinner-border text-primary"></div>
        </div>
      )}
      <Header page="Todos" />
      {!editMode && (
        <button className="btn w-100" onClick={() => setEditMode(!editMode)}>
          <div className="card p-2 text-center">
            <div className="card-body">
              <img src={Add} className="me-1" />
              <span>
                <strong>Add a todo</strong>
              </span>
            </div>
          </div>
        </button>
      )}
      {editMode && (
        <TodoCardForm
          isNew={true}
          setEditMode={setEditMode}
          updateTodos={addTodo}
          onSave={apiAddTodo}
        />
      )}
      {todos.map((todo) => (
        <TodoCard
          todo={todo}
          key={todo.id}
          onDelete={deleteTodo}
          onUpdate={updateTodo}
        />
      ))}
    </div>
  );
}

export default Home;
