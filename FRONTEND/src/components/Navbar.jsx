import React from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-900 text-white py-4 px-6 sticky top-0 z-50 shadow-md">
      <div className="flex justify-between items-center w-full">
        <div></div>
        <div className="flex space-x-8">
          <ScrollLink to="home" smooth={true} duration={500} className="cursor-pointer hover:text-yellow-400 text-lg">
            Home
          </ScrollLink>
          <ScrollLink to="about" smooth={true} duration={500} className="cursor-pointer hover:text-yellow-400 text-lg">
            About
          </ScrollLink>
          <ScrollLink to="contact" smooth={true} duration={500} className="cursor-pointer hover:text-yellow-400 text-lg">
            Contact
          </ScrollLink>
          <ScrollLink to="login" smooth={true} duration={500} className="cursor-pointer hover:text-yellow-400 text-lg">
            Login
          </ScrollLink>
          <RouterLink to="/register" className="cursor-pointer hover:text-yellow-400 text-lg">
            Register
          </RouterLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
