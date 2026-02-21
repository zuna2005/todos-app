import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/Header";
import { errorMessages } from "../configs/config";
import { useAppDispatch, useAppSelector } from "../state-manager/hooks";
import { selectCurrentRole } from "../state-manager/userSlice";
import { getUsers, selectUsers } from "../state-manager/usersListSlice";

function Users() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentRole);
  const users = useAppSelector(selectUsers);
  const hasFetched = useRef(false);
  useEffect(() => {
    if (currentUser !== "admin") {
      toast.error(errorMessages[403]);
      navigate("/");
      return;
    }
    if (hasFetched.current) return;
    hasFetched.current = true;
    dispatch(getUsers())
    .unwrap()
      .catch((err) => {
        if (err.status === 403) navigate("/");
        toast.error(err.message);
      })
  }, [navigate, currentUser, dispatch]);
  return (
    <div>
      <Header page="Users" />
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
  );
}

export default Users;
