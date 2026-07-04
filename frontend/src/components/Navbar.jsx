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
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0B0F19]/80 backdrop-blur-md border-b border-gray-800/80 px-4 sm:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
        {/* Left Section: Logo */}
        <div className="flex-1">
          <Link 
            to="/" 
            className="inline-block text-lg sm:text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-200 to-[#A29BFE] bg-clip-text text-transparent hover:opacity-90 transition-all"
          >
            AI-Task-Platform
          </Link>
        </div>

        {/* Right Section: Actions & User Info */}
        <div className="flex items-center gap-3 sm:gap-5">
          {!loading && user && (
            <span className="text-xs sm:text-sm font-medium text-gray-400 hidden sm:inline-block">
              Welcome, <span className="text-[#A29BFE] font-semibold">{user.name}</span>
            </span>
          )}

          {!loading && user ? (
            <button
              type="button"
              onClick={handleLogout}
              className="text-xs sm:text-sm font-medium border border-red-500/30 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 px-4 py-2 rounded-xl transition-all active:scale-[0.98]"
            >
              Logout
            </button>
          ) : (
            <Link 
              to="/login" 
              className="text-xs sm:text-sm font-medium bg-[#6C5CE7] hover:bg-[#5A4BCF] text-white px-4 py-2 rounded-xl transition-all shadow-[0_4px_20px_rgba(108,92,231,0.25)] active:scale-[0.98]"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;