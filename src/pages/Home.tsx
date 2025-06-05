import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { checkAuth, logout } from "../api/usersApi";
import { getTodos } from "../api/todosApi";
import Add from "../assets/add.svg";
import Delete from "../assets/delete.svg";
import Edit from "../assets/edit.svg";
import NewTodo from "../components/NewTodo";
import { useAppDispatch, useAppSelector } from "../state-manager/hooks";
import { resetUser, selectCurrentRole } from "../state-manager/userSlice";
import type { Todo } from "../types/types";

function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentRole);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [todos, setTodos] = useState<Array<Todo>>([]);

  useEffect(() => {
    setLoading(true);
    checkAuth()
      .then((res) => console.log("from checkAuth", res.data))
      .catch(() => {
        dispatch(resetUser());
        navigate("/login");
      })
      .finally(() => setLoading(false));
  }, [navigate, dispatch]);

  useEffect(() => {
    getTodos()
      .then((res) => setTodos(res.data))
      .catch((err) => console.error(err.message));
  });

  function addTodo(newTodo: Todo) {
    setTodos([...todos, newTodo]);
  }
  function handleLogout() {
    logout()
      .then(() => {
        dispatch(resetUser());
        navigate("/login");
      })
      .catch(() => toast.error("Error while logging out. Try again later."));
  }

  return (
    <div className="position-relative min-vh-100 p-3">
      {loading && (
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center z-3 bg-white bg-opacity-10">
          <div className="spinner-border text-primary">
            <span className="visually-hidden">Loading...</span>
          </div>
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
      {editMode && <NewTodo setEditMode={setEditMode} updateTodos={addTodo} />}
      {todos.map((todo) => (
        <div className="card m-3 p-2" key={todo.id}>
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <h5 className="card-title">{todo.title}</h5>
              {(currentUser === "admin" || currentUser === todo.createdBy) && <div>
                <button className="btn">
                  <img src={Edit} />
                </button>
                <button className="btn">
                  <img src={Delete} />
                </button>
              </div>}
            </div>
            <p className="card-text">{todo.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
