import React from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import {toast} from 'react-hot-toast';
const Navbar = () => {
  const { user, isLoggedIn, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="bg-blue-900 text-white py-4 px-6 sticky top-0 z-50 shadow-md">
      <div className="flex justify-between items-center w-full">
        <div className="text-xl font-bold">Job Portal</div>

        <div className="flex space-x-6 items-center">
          <ScrollLink
            to="home"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-yellow-400 text-lg"
          >
            Home
          </ScrollLink>

          <ScrollLink
            to="about"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-yellow-400 text-lg"
          >
            About
          </ScrollLink>

          <ScrollLink
            to="contact"
            smooth={true}
            duration={500}
            className="cursor-pointer hover:text-yellow-400 text-lg"
          >
            Contact
          </ScrollLink>

          {!isLoggedIn ? (
            <>
              <ScrollLink
                to="login"
                smooth={true}
                duration={500}
                className="cursor-pointer hover:text-yellow-400 text-lg"
              >
                Login
              </ScrollLink>
              <RouterLink
                to="/register"
                className="cursor-pointer hover:text-yellow-400 text-lg"
              >
                Register
              </RouterLink>
            </>
          ) : (
            <>
              {user?.role === "APPLICANT" && (
                <RouterLink to="/jobs" className="hover:text-yellow-400 text-lg">
                  Jobs
                </RouterLink>
              )}
              {user?.role === "ADMIN" && (
                <RouterLink to="/dashboard" className="hover:text-yellow-400 text-lg">
                  Dashboard
                </RouterLink>
              )}

              <span className="text-sm italic">Hi, {user?.name || user?.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-sm ml-2"
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
