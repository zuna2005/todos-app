import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { login } from "../api/usersApi";
import LoadingButton from "../components/LoadingButton";
import { errorMessages } from "../configs/config";
import { useAppDispatch } from "../state-manager/hooks";
import { setUser } from "../state-manager/userSlice";
import type { LoginData } from "../types/types";

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();
  const onSubmit: SubmitHandler<LoginData> = (data) => {
    setLoading(true);
    login(data)
      .then((res) => {
        navigate("/");
        dispatch(setUser(res.data));
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
