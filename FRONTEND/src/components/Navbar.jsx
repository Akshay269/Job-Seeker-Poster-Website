import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { toast } from "react-hot-toast";
import API from "../api/axios";

const Navbar = () => {
  const { user, isLoggedIn, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
      logout(); 
      toast.success("Logged out successfully");
      navigate("/", { replace: true });
    } catch {
      toast.error("Logout failed");
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary">
          Hell-o-o-Jobs
        </Link>

        <div className="flex items-center gap-6">
          {isLoggedIn ? (
            <>
              <span className="text-gray-700 font-medium">
                Hello, {user?.username || user?.email}
              </span>

              <Link
                to="/jobs"
                className={`transition-colors ${
                  isActive("/jobs") ? "text-primary" : "text-foreground hover:text-primary"
                }`}
              >
                Find Jobs
              </Link>

              <Link
                to="/myapplications"
                className={`transition-colors ${
                  isActive("/myapplications") ? "text-primary" : "text-foreground hover:text-primary"
                }`}
              >
                My Applications
              </Link>

              <Link
                to="/post-job"
                className={`transition-colors ${
                  isActive("/post-job") ? "text-primary" : "text-foreground hover:text-primary"
                }`}
              >
                Post Job
              </Link>

              <Link
                to="/posted-jobs"
                className={`transition-colors ${
                  isActive("/posted-jobs") ? "text-primary" : "text-foreground hover:text-primary"
                }`}
              >
                Posted Jobs
              </Link>

              <button onClick={handleLogout} className="btn-secondary">
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="text-foreground hover:text-primary transition-colors"
              >
                Sign In
              </Link>
              <Link to="/signup" className="btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
