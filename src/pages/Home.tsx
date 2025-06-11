import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Header from "../components/Header";
import TodoCard from "../components/TodoCard";
import { useAppDispatch, useAppSelector } from "../state-manager/hooks";
import { getTodos, selectTodos, selectMyTodos } from "../state-manager/todosSlice";

function Home() {
  const dispatch = useAppDispatch();
  const hasFetched = useRef(false);
  const [mySelected, setMySelected] = useState(false);
  const todos = useAppSelector(mySelected ? selectMyTodos : selectTodos);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    dispatch(getTodos())
      .unwrap()
      .catch((err) => toast.error(err.message));
  }, [dispatch]);

  return (
    <div>
      <Header page="Todos" />
      <ul className="nav nav-tabs nav-fill mb-3">
        <li className="nav-item">
          <a className={`nav-link ${!mySelected && "active"}`} onClick={() => setMySelected(false)}>
            All todos
          </a>
        </li>
        <li className="nav-item">
          <a className={`nav-link ${mySelected && "active"}`} onClick={() => setMySelected(true)}>
            My todos
          </a>
        </li>
      </ul>
      <TodoCard isNew={true} />
      {todos.map((todo) => (
        <TodoCard isNew={false} todo={todo} key={todo.id} />
      ))}
    </div>
  );
}

export default Home;
