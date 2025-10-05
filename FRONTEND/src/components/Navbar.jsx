import { Link as RouterLink, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { toast } from "react-hot-toast";
import {
  LogIn,
  UserPlus,
  Briefcase,
  Users,
  FileText,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoggedIn, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      logout();
      toast.success("Logged out successfully");
      setTimeout(() => navigate("/"), 500);
    } catch {
      toast.error("Logout failed");
    } 
  };

  const navItems = [];
  if (isLoggedIn && user?.role === "APPLICANT") {
    navItems.push({
      name: "Jobs",
      href: "/jobs",
      icon: Briefcase,
    });
    navItems.push({
      name: "My Applications",
      href: "/myapplications",
      icon: FileText,
    });
  }

  if (isLoggedIn && user?.role === "ADMIN") {
    navItems.unshift({ name: "Dashboard", href: "/dashboard", icon: Users });
  }

  return (
    <>

      <nav className="relative bg-black/90 backdrop-blur-lg border-b border-gray-800 top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-16">
            <RouterLink to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                JobPortal
              </span>
            </RouterLink>

            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <RouterLink
                  key={item.name}
                  to={item.href}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </RouterLink>
              ))}

              {!isLoggedIn ? (
                <>
                  <RouterLink
                    to="/signin"
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </RouterLink>
                  <RouterLink
                    to="/signup"
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Sign Up</span>
                  </RouterLink>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <FontAwesomeIcon
                      icon={faUserTie}
                      className="text-blue-500"
                    />
                    <span>{user?.name || user?.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-sm px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {isOpen && (
            <div className="md:hidden mt-2 space-y-2 pb-4">
              {navItems.map((item) => (
                <RouterLink
                  key={item.name}
                  to={item.href}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </RouterLink>
              ))}

              {!isLoggedIn ? (
                <>
                  <RouterLink
                    to="/signin"
                    className="block px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </RouterLink>
                  <RouterLink
                    to="/signup"
                    className="block px-4 py-2 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </RouterLink>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Logout
                </button>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
