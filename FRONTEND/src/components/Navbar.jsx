import { Link as RouterLink, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { toast } from "react-hot-toast";
import {
  LogIn,
  UserPlus,
  Briefcase,
  Users,
  Info,
  FileText,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { useLoading } from "../context/LoadingContext";
import Anvaya2 from "../assets/Anvaya2.png";
import { useState } from "react";

const Navbar = () => {
const { setIsLoading } = useLoading();
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoggedIn, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
     setIsLoading(true);
    try {
      logout();
      toast.success("Logged out successfully");
      setTimeout(() => navigate("/"), 500);
    } catch {
      toast.error("Logout failed");
    } finally {
      setTimeout(() =>   setIsLoading(false), 500);
    }
  };

  const navItems = [
    { name: "About", href: "/about", icon: Info },
  ];
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

      <nav className="relative bg-white/80 backdrop-blur-lg border-b border-gray-200 top-0 z-50">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/20 via-pink-100/20 to-orange-100/20"></div>

        <div className="max-w-10xl mx-auto px-4 sm:px-7 lg:px-3 relative">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <RouterLink to="/" className="flex items-center gap-0">
              <div className="relative">
                <img
                  src={Anvaya2}
                  alt="Anvaya Logo"
                  className="w-20 h-20 object-cover drop-shadow-xl"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
                  Anvaya
                </span>
                <span className="text-xs text-gray-500 -mt-1">
                  Sacred Careers 🌸
                </span>
              </div>
            </RouterLink>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <RouterLink
                  key={item.name}
                  to={item.href}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-purple-100/40 transition"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </RouterLink>
              ))}

              {!isLoggedIn ? (
                <>
                  <RouterLink
                    to="/signin"
                    className="flex items-center gap-2 text-gray-700 hover:text-purple-700"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </RouterLink>
                  <RouterLink
                    to="/signup"
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-orange-500 text-white px-4 py-2 rounded-lg shadow hover:from-purple-700 hover:to-orange-600"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Sign Up</span>
                  </RouterLink>
                </>
              ) : (
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-base font-semibold text-black">
                    <FontAwesomeIcon
                      icon={faUserTie}
                      className="text-purple-600"
                    />
                    <span>{user?.name || user?.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-sm px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg shadow-md hover:from-red-600 hover:to-pink-700 transition-all cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Dropdown */}
          {isOpen && (
            <div className="md:hidden mt-2 space-y-2 pb-4">
              {navItems.map((item) => (
                <RouterLink
                  key={item.name}
                  to={item.href}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg bg-purple-50 hover:bg-purple-100"
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
                    className="block px-4 py-2 text-gray-700 hover:bg-purple-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </RouterLink>
                  <RouterLink
                    to="/signup"
                    className="block px-4 py-2 bg-purple-600 text-white rounded-lg text-center hover:bg-purple-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </RouterLink>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
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
