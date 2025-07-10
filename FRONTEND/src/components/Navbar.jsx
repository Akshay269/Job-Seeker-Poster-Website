import { Link as RouterLink, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { toast } from "react-hot-toast";
import { User, Building2 } from "lucide-react";
import Anvaya2 from "../assets/Anvaya2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import Spinner from "./Spinner";
import { useState } from "react";

const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const { user, isLoggedIn, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      logout();
      toast.success("Logged out successfully");
      setTimeout(() => navigate("/"), 1000);
    } catch {
      toast.error("Logout failed");
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  const handlePostJobClick = async () => {
    setLoading(true);
    try {
      if (!isLoggedIn) {
        toast.error("Please login as Job-poster to post jobs first");
        setTimeout(
          () => navigate("/signin", { state: { role: "ADMIN" } }),
          500
        );
      } else if (user?.role === "ADMIN") {
        navigate("/post-job");
      }
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  return (
    <>
      {loading && <Spinner isLoading />}

      <nav className="bg-white text-black border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-9xl mx-auto flex items-center justify-between">
          {/* Left: Logo */}
          <div className="pl-10">
            <RouterLink to="/" className="flex items-center gap-2">
              <div className="h-23 w-auto flex items-center">
                <img
                  src={Anvaya2}
                  alt="Anvaya Logo"
                  className="h-23 w-30 object-cover"
                />
              </div>
            </RouterLink>
          </div>

          {/* Center Nav Links */}
          <div className="hidden md:flex gap-8 text-lg font-medium">
            {!isLoggedIn && (
              <>
                <RouterLink to="/jobs" className="hover:text-gray-700">
                  Find Jobs
                </RouterLink>
                {/* <RouterLink to="/companies" className="hover:text-gray-700">
                  Companies
                </RouterLink> */}
                <button
                  onClick={handlePostJobClick}
                  className="hover:text-gray-700"
                >
                  Post Jobs
                </button>
                <RouterLink to="/about" className="hover:text-gray-700">
                  About
                </RouterLink>
              </>
            )}

            {isLoggedIn && (
              <>
                {user?.role === "APPLICANT" && (<>
                  <RouterLink to="/jobs" className="hover:text-gray-700">
                    Find Jobs
                  </RouterLink>
                   <RouterLink to="/myapplications" className="hover:text-gray-700">
                    My Applications
                  </RouterLink>
                  </>
                )}
                {user?.role === "ADMIN" && (
                  <>
                    <RouterLink to="/dashboard" className="hover:text-gray-700">
                      Dashboard
                    </RouterLink>
                    <RouterLink to="/post-job" className="hover:text-gray-700">
                      Post Jobs
                    </RouterLink>
                  </>
                )}
    
                <RouterLink to="/about" className="hover:text-gray-700">
                  About
                </RouterLink>
              </>
            )}
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
              <div className="relative flex items-center gap-6 bg-gray-100 px-5 py-3 rounded-xl hover:shadow-lg transition">
                <div className="flex items-center gap-3 text-lg font-semibold text-gray-800">
                  <FontAwesomeIcon
                    icon={faUserTie}
                    className="text-gray-700 w-6 h-6"
                  />
                  <span className="truncate max-w-[140px]">
                    {user?.name || user?.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-base px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-bold cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
