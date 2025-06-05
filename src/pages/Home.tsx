import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../api/login";

function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    checkAuth()
      .then((res) => console.log("from checkAuth", res.data))
      .catch(() => navigate("/login"))
      .finally(() => setLoading(false));
  }, [navigate]);
  return (
    <div className="position-relative min-vh-100">
      {loading && (
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center z-10 bg-white bg-opacity-50">
          <div className="spinner-border text-primary">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      Welcome to landing page
    </div>
  );
}

export default Home;
