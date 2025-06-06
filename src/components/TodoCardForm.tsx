import type { AxiosResponse } from "axios";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { errorMessages, successMessages } from "../configs/config";
import type { NewTodoData, Todo } from "../types/types";
import LoadingButton from "./LoadingButton";

interface BaseProps {
  setEditMode: (value: boolean) => void;
  updateTodos: (newTodo: Todo) => void;
  onSave: (data: NewTodoData) => Promise<AxiosResponse<Todo>>;
}

interface NewTodoProps extends BaseProps {
  isNew: true;
  todo?: never;
}

interface EditTodoProps extends BaseProps {
  isNew: false;
  todo: Todo;
}

type TodoCardFormProps = NewTodoProps | EditTodoProps;

function TodoCardForm({
  isNew,
  setEditMode,
  updateTodos,
  onSave,
  todo,
}: TodoCardFormProps) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewTodoData>({
    defaultValues: {
      title: todo?.title,
      description: todo?.description,
    },
  });
  const onSubmit: SubmitHandler<NewTodoData> = (data) => {
    setLoading(true);
    onSave(data)
      .then((res) => {
        setEditMode(false);
        const updatedTodo = isNew ? res.data : { ...todo, ...data };
        updateTodos(updatedTodo);
        toast.success(successMessages[isNew ? "add" : "update"]);
      })
      .catch((err) => {
        const status = err.response?.status;
        toast.error(
          status === 400
            ? err.response.data.message
            : errorMessages[status] || errorMessages.default
        );
        console.error(err);
      })
      .finally(() => setLoading(false));
  };
  return (
    <div className="card m-3 p-2">
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
        <h6 className="card-title text-primary-emphasis">
          {isNew ? "Add a new todo" : "Edit a todo"}
        </h6>
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

export default TodoCardForm;
