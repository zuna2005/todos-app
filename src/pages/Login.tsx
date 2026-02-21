import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import LoadingButton from "../components/LoadingButton";
import { errorMessages } from "../configs/config";
import { useAppDispatch, useAppSelector } from "../state-manager/hooks";
import { selectLoading } from "../state-manager/loaderSlice";
import { login } from "../state-manager/userSlice";
import type { LoginData } from "../types/types";

function Login() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();
  const onSubmit: SubmitHandler<LoginData> = (data) => {
    dispatch(login(data))
      .unwrap()
      .catch((err) => toast.error(err.message))
  };
  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <h2 className="">Login</h2>
      <form className="w-25" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="login" className="form-label">
          Username
        </label>
        <input
          type="text"
          className="form-control"
          id="login"
          placeholder="Enter your username"
          disabled={loading}
          {...register("login", { required: true })}
        />
        {errors.login && (
          <p className="text-danger m-0">{errorMessages.required}</p>
        )}
        <label htmlFor="password" className="form-label mt-3">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Enter your password"
          disabled={loading}
          {...register("password", { required: true })}
        />
        {errors.password && (
          <p className="text-danger m-0">{errorMessages.required}</p>
        )}
        <LoadingButton loading={loading} styles="btn-primary mt-3">
          Sign in
        </LoadingButton>
      </form>
    </div>
  );
}

export default Login;
