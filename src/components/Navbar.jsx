import React from "react";
import logo from "../assets/logo.png";
import menu from "../assets/menu.svg";
import close from "../assets/close.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <nav className="w-full h-[77px] fixed top-0 z-50 flex items-center justify-between px-6 md:px-14">
      <div className="flex items-center">
        <img className="w-[40px] h-[50px] mr-4" src={logo} alt="Logo" />
        <div className="text-white text-[24px] font-semibold font-['Poppins']">
          Hippocrate
        </div>
      </div>
      <div className="hidden md:flex space-x-8">
        <Link
          to="/"
          className="mt-2 text-white text-sm font-bold font-['Poppins'] tracking-tight hover:text-[#1f8287]"
        >
          Accueil
        </Link>
        <Link
          to="/services"
          className="mt-2 text-[#e6e6e6] text-sm font-normal font-['Poppins'] tracking-tight hover:text-[#1f8287]"
        >
          Services
        </Link>
        <Link
          to="/contact"
          className="text-white text-sm font-semibold font-['Poppins'] tracking-tight bg-[#1f8287] px-4 py-2 hover:text-[#1f8287] hover:bg-white"
        >
          Contact
        </Link>
      </div>
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="focus:outline-none"
        >
          <img src={isOpen ? close : menu} alt="Menu" className="w-3 h-3" />
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-[77px] right-0 w-full flex flex-col items-center space-y-4 py-4 md:hidden">
          <Link
            to="/"
            className="text-white text-sm font-bold font-['Poppins'] tracking-tight hover:text-[#1f8287]"
          >
            Accueil
          </Link>
          <Link
            to="/services"
            className="text-[#e6e6e6] text-sm font-normal font-['Poppins'] tracking-tight hover:text-[#1f8287]"
          >
            Services
          </Link>
          <Link
            to="/contact"
            className="text-white text-sm font-semibold font-['Poppins'] tracking-tight bg-[#1f8287] px-4 py-2 hover:text-[#1f8287] hover:bg-white"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
