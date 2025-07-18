import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { errorMessages } from "../configs/config";
import { useAppDispatch, useAppSelector } from "../state-manager/hooks";
import { logout, selectCurrentRole } from "../state-manager/userSlice";

function Header({ page }: { page: "Todos" | "Users" }) {
  const currentUser = useAppSelector(selectCurrentRole);
  const dispatch = useAppDispatch();

  function handleLogout() {
    dispatch(logout())
      .unwrap()
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
