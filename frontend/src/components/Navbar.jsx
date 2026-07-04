
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/authContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="navbar fixed top-0 left-0 w-full z-100 bg-base-300 shadow-sm px-6">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          AI-Task-Platform
        </Link>
      </div>

      <div className="flex gap-4 items-center">
        <div className="dropdown dropdown-end">
          <div className="flex items-center gap-2">
            {!loading && user ? (
              <p className="font-medium hidden sm:block">Welcome {user.name}</p>
            ) : (
              <p className="font-medium hidden sm:block">Welcome</p>
            )}
          </div>
        </div>

        {!loading && user ? (
          <button
            type="button"
            onClick={handleLogout}
            className="btn btn-ghost text-base"
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="btn btn-ghost text-base">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;

