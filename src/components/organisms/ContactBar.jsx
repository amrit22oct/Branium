import React, { useContext } from "react";
import Icon from "../atoms/Icon.jsx"; // Assuming your Icon component is ready
import { ThemeContextObject } from "../../context/ThemeContext.jsx";

const ContactBar = () => {
  const { theme } = useContext(ThemeContextObject);
  const isDark = theme === "dark";

  return (
    <div
      className={`hidden sm:flex flex-wrap items-center justify-between h-16 w-full px-8 transition-colors duration-500 ${
        isDark ? "bg-gray-800 text-white" : "bg-gray-500 text-black"
      }`}
    >
      {/* Left: Contact Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <h3 className="text-lg font-medium p-2">Let's Role</h3>
        <h3 className="text-lg font-medium p-2">+91 1998564925</h3>
      </div>

      {/* Center: Icons */}
      <div className="flex items-center gap-4 my-2 sm:my-0">
        <Icon />
      </div>

      {/* Right: Search */}
      <div className="flex-shrink-0">
        <input
          type="text"
          placeholder="Search..."
          className={`px-4 py-1 rounded-md border focus:outline-none focus:ring-2 transition-colors duration-500 ${
            isDark
              ? "border-gray-300 bg-gray-700 text-white focus:ring-cyan-400"
              : "border-black bg-white text-black focus:ring-cyan-400"
          }`}
        />
      </div>
    </div>
  );
};

export default ContactBar;
