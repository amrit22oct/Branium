import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../atoms/Logo";
import Hamburger from "../molecules/Hamburger";
import { navLinks } from "../../constants/navlinks";
import { ThemeContextObject } from "../../context/ThemeContext";

const TopBar = () => {
  const { theme } = useContext(ThemeContextObject);
  const isDark = theme === "dark";

  return (
    <nav
      className={`flex items-center justify-between w-full h-14 px-4 sm:px-6 md:px-10 shadow-md sticky top-0 z-50 transition-colors duration-500 ${
        isDark ? "bg-gray-800 text-white" : "bg-gray-400 text-gray-950"
      }`}
    >
      {/* Left: Logo */}
      <Link to="/" className="inline-flex">
        <Logo />
      </Link>

      {/* Center / Right Text: visible on xl */}
      <div className="hidden xl:block text-lg sm:text-xl md:text-2xl font-bold select-none text-right truncate">
        Lets Explore
      </div>

      {/* Hamburger Menu: visible on sm to lg */}
      <div className="xl:hidden">
        <Hamburger links={navLinks} />
      </div>
    </nav>
  );
};

export default TopBar;
