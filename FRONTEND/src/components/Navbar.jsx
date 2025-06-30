import { Link as RouterLink, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { toast } from "react-hot-toast";
import { User, Building2 } from "lucide-react";

const Navbar = () => {
  const { user, isLoggedIn, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <nav className="bg-white text-black border-b border-gray-200 shadow-sm py-3 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <RouterLink to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-sm">JP</span>
          </div>
          <span className="font-bold text-lg">JobPortal</span>
        </RouterLink>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <RouterLink to="/jobs" className="hover:text-gray-700">
            Find Jobs
          </RouterLink>
          <RouterLink to="/companies" className="hover:text-gray-700">
            Companies
          </RouterLink>
          <RouterLink to="/post-job" className="hover:text-gray-700">
            Post Jobs
          </RouterLink>
          <RouterLink to="/about" className="hover:text-gray-700">
            About
          </RouterLink>
        </div>

        {/* Right: Auth Links */}
        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <RouterLink
                to="/signin"
                className="flex items-center gap-1 text-sm text-black hover:text-gray-700"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </RouterLink>
              <RouterLink
                to="/signup"
                className="flex items-center gap-1 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 text-sm font-medium cursor-pointer"
              >
                <Building2 className="w-4 h-4" />
                <span>Sign Up</span>
              </RouterLink>
            </>
          ) : (
            <>
              <span className="truncate max-w-[100px] text-sm font-semibold">
                {user?.name || user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-black hover:text-gray-700"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
