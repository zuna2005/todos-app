import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { checkAuth, logout } from "../api/usersApi";
import { apiAddTodo, apiGetTodos } from "../api/todosApi";
import Add from "../assets/add.svg";
import TodoCard from "../components/TodoCard";
import TodoCardForm from "../components/TodoCardForm";
import { errorMessages } from "../configs/config";
import { useAppDispatch, useAppSelector } from "../state-manager/hooks";
import {
  resetUser,
  selectCurrentRole,
  setUser,
} from "../state-manager/userSlice";
import type { Todo } from "../types/types";

function Home() {
  console.log("home rerender");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentRole);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [todos, setTodos] = useState<Array<Todo>>([]);

  useEffect(() => {
    setLoading(true);
    checkAuth()
      .then((res) => {
        dispatch(setUser(res.data));
        console.log("from checkAuth", res.data);
      })
      .catch(() => {
        dispatch(resetUser());
        navigate("/login");
      })
      .finally(() => setLoading(false));
  }, [navigate, dispatch]);

  useEffect(() => {
    apiGetTodos()
      .then((res) => setTodos(res.data))
      .catch((err) => console.error(err.message));
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
  function handleLogout() {
    logout()
      .then(() => {
        dispatch(resetUser());
        navigate("/login");
      })
      .catch(() => toast.error(errorMessages.logout));
  }

  return (
    <div className="position-relative min-vh-100 p-3">
      {loading && (
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center z-3 bg-white bg-opacity-10">
          <div className="spinner-border text-primary"></div>
        </div>
      )}
      <div className="d-flex justify-content-between mb-4">
        <h1>Todos</h1>
        <button className="btn btn-outline-primary" onClick={handleLogout}>
          Logout
        </button>
      </div>
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
