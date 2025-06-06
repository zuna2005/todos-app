import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUsers } from "../api/usersApi";
import Header from "../components/Header";
import { errorMessages } from "../configs/config";
import { useAuth } from "../hooks/useAuth";
import { useAppSelector } from "../state-manager/hooks";
import { selectCurrentRole } from "../state-manager/userSlice";

interface User {
  login: string;
  role: string;
  name: string;
}

function Users() {
  const [users, setUsers] = useState<Array<User>>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const currentUser = useAppSelector(selectCurrentRole);
  useAuth(setLoading);
  useEffect(() => {
    if (currentUser !== "admin") {
      toast.error(errorMessages[403]);
      navigate("/");
      return;
    }
    setLoading(true);
    getUsers()
      .then((res) => setUsers(res.data))
      .catch((err) => {
        const status = err.response?.status;
        toast.error(errorMessages[status] || errorMessages.default);
        if (status === 403) navigate("/");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [navigate, currentUser]);
  return (
    <div className="m-3">
      <Header page="Users" />
      <div className="position-relative">
        {loading && (
          <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center z-3 bg-white bg-opacity-10">
            <div className="spinner-border text-primary"></div>
          </div>
        )}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Login</th>
              <th scope="col">Role</th>
              <th scope="col">Name</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{user.login}</td>
                  <td>{user.role}</td>
                  <td>{user.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
