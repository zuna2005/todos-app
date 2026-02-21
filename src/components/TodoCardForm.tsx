import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { errorMessages, successMessages } from "../configs/config";
import { useAppDispatch, useAppSelector } from "../state-manager/hooks";
import { selectLoading } from "../state-manager/loaderSlice";
import { addTodo, updateTodo } from "../state-manager/todosSlice";
import type { NewTodoData, TodoCardProps } from "../types/types";
import LoadingButton from "./LoadingButton";

type TodoCardFormProps = TodoCardProps & {
  setEditMode: (value: boolean) => void;
};

function TodoCardForm({ isNew, setEditMode, todo }: TodoCardFormProps) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);

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
    if (isNew)
      dispatch(addTodo(data))
        .unwrap()
        .then(() => {
          setEditMode(false);
          toast.success(successMessages.add);
        })
        .catch((err) => toast.error(err.message));
    else
      dispatch(updateTodo({ id: todo.id, data }))
        .unwrap()
        .then(() => {
          setEditMode(false);
          toast.success(successMessages.update);
        })
        .catch((err) => toast.error(err.message));
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
