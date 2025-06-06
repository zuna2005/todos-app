import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { addTodo } from "../api/todosApi";
import { errorMessages, successMessages } from "../configs/config";
import type { NewTodoData, Todo } from "../types/types";
import LoadingButton from "./LoadingButton";

interface NewTodoProps {
  setEditMode: (value: boolean) => void;
  updateTodos: (newTodo: Todo) => void;
}

function NewTodo({ setEditMode, updateTodos }: NewTodoProps) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewTodoData>();
  const onSubmit: SubmitHandler<NewTodoData> = (data) => {
    setLoading(true);
    addTodo(data)
      .then((res) => {
        setEditMode(false);
        updateTodos(res.data);
        toast.success(successMessages.add);
        console.log(res.data);
      })
      .catch((err) => {
        toast.error(
          err.response && err.response.status == 400
            ? err.response.data.message
            : errorMessages.default
        );
        console.error(err);
      })
      .finally(() => setLoading(false));
  };
  return (
    <div className="card m-3 p-2">
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
        <h6 className="card-title text-primary-emphasis">Add a new todo</h6>
        <input
          className="form-control mt-3"
          type="text"
          placeholder="Enter title"
          disabled={loading}
          {...register("title", { required: true })}
        />
        {errors.title && (
          <p className="text-danger m-0">{errorMessages.required}</p>
        )}
        <textarea
          className="form-control mt-3"
          rows={3}
          placeholder="Enter description"
          disabled={loading}
          {...register("description", { required: true })}
        />
        {errors.description && (
          <p className="text-danger m-0">{errorMessages.required}</p>
        )}
        <LoadingButton loading={loading} styles="btn-success mt-3">
          Save
        </LoadingButton>
        <button
          className="btn btn-danger mt-3 ms-2"
          disabled={loading}
          onClick={() => setEditMode(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default NewTodo;
