import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../api/usersApi";
import { errorMessages } from "../configs/config";
import { useAppDispatch, useAppSelector } from "../state-manager/hooks";
import { resetUser, selectCurrentRole } from "../state-manager/userSlice";

function Header({ page }: { page: "Todos" | "Users" }) {
  const currentUser = useAppSelector(selectCurrentRole);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function handleLogout() {
    logout()
      .then(() => {
        dispatch(resetUser());
        navigate("/login");
      })
      .catch(() => toast.error(errorMessages.logout));
  }
  return (
    <div className="d-flex justify-content-between mb-4">
      <h1>{page}</h1>
      <div>
        {currentUser === "admin" && (
          <Link
            to={page === "Todos" ? "/users" : "/"}
            className="btn btn-outline-info me-2"
          >
            {page === "Todos" ? "Users" : "Home"}
          </Link>
        )}
        <button className="btn btn-outline-primary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;
