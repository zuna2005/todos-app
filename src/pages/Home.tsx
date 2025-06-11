import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import Header from "../components/Header";
import TodoCard from "../components/TodoCard";
import { useAppDispatch, useAppSelector } from "../state-manager/hooks";
import { getTodos, selectTodos } from "../state-manager/todosSlice";

function Home() {
  const todos = useAppSelector(selectTodos);
  const dispatch = useAppDispatch();
  const hasFetched = useRef(false);

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
      <TodoCard isNew={true} />
      {todos.map((todo) => (
        <TodoCard isNew={false} todo={todo} key={todo.id} />
      ))}
    </div>
  );
}

export default Home;
