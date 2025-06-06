import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../api/usersApi";
import { useAppDispatch } from "../state-manager/hooks";
import { resetUser, setUser } from "../state-manager/userSlice";

export function useAuth(
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    setLoading(true);
    checkAuth()
      .then((res) => {
        dispatch(setUser(res.data));
      })
      .catch(() => {
        dispatch(resetUser());
        navigate("/login");
      })
      .finally(() => setLoading(false));
  }, [navigate, dispatch, setLoading]);
}
