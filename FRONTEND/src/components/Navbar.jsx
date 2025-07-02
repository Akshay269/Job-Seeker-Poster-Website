import { Link as RouterLink, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { toast } from "react-hot-toast";
import { User, Building2 } from "lucide-react";

import Anvaya2 from "../assets/Anvaya2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import Anvaya from "../assets/Anvaya.png";

const Navbar = () => {
  const { user, isLoggedIn, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <nav className="bg-white text-black border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-9xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <div className="pl-10">
          <RouterLink to="/" className="flex items-center gap-2">
            {/* <LogoCenter/> */}
            <div className="h-23 w-auto flex items-center">
              <img
                src={Anvaya2}
                alt="Anvaya Logo"
                className="h-23 w-30 object-cover"
              />
            </div>
          </RouterLink>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex gap-8 text-lg font-medium">
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
        <div className="flex items-center gap-4 pr-10">
          {!isLoggedIn ? (
            <>
              <RouterLink
                to="/signin"
                className="flex items-center gap-1 text-lg text-black hover:text-gray-700"
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
              <div className="flex items-center gap-2 text-lg">
                <FontAwesomeIcon
                  icon={faUserTie}
                  className="text-gray-700 w-4 h-4"
                />
                <span className="truncate max-w-[100px] font-semibold">
                  {user?.name || user?.email}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="text-lg text-black hover:text-gray-700 font-semibold"
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
