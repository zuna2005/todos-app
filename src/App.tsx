import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoaderWrapper from "./components/LoaderWrapper";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Users from "./pages/Users";
import { useAppDispatch, useAppSelector } from "./state-manager/hooks";
import {
  checkAuth,
  selectAuthLoaded,
  selectCurrentRole,
} from "./state-manager/userSlice";

function App() {
  const dispatch = useAppDispatch();
  const authLoaded = useAppSelector(selectAuthLoaded);
  const currentUser = useAppSelector(selectCurrentRole);
  const loggedIn = currentUser !== "";

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (!authLoaded)
    return (
      <div className="position-relative min-vh-100 p-3 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary"></div>
      </div>
    );

  return (
    <LoaderWrapper>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={loggedIn ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!loggedIn ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/users"
            element={loggedIn ? <Users /> : <Navigate to="/login" />}
          />
        </Routes>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </BrowserRouter>
    </LoaderWrapper>
  );
}

export default App;
