import React, { useContext } from "react";
import { ThemeContextObject } from "../../context/ThemeContext.jsx";

const SocialLinks = ({
  title = "Follow",
  highlight = "Us",
  socials = [
    { name: "Instagram", icon: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png", link: "https://www.instagram.com/" },
    { name: "Twitter", icon: "https://cdn-icons-png.flaticon.com/512/733/733579.png", link: "https://twitter.com/" },
    { name: "LinkedIn", icon: "https://cdn-icons-png.flaticon.com/512/174/174857.png", link: "https://www.linkedin.com/" },
    { name: "YouTube", icon: "https://cdn-icons-png.flaticon.com/512/1384/1384060.png", link: "https://www.youtube.com/" },
  ],
  className = "",
}) => {
  const { theme } = useContext(ThemeContextObject);
  const isDark = theme === "dark";

  const headingColor = isDark ? "text-gray-200" : "text-gray-800";
  const highlightColor = isDark ? "text-indigo-400" : "text-blue-600";
  const bgColor = isDark ? "bg-gray-800" : "bg-white";
  const hoverBg = isDark ? "group-hover:bg-indigo-500/20" : "group-hover:bg-blue-500/10";

  return (
    <div className={`mt-16 flex flex-col items-center space-y-6 ${className}`}>
      {/* Heading */}
      <h2 className={`text-2xl sm:text-3xl font-bold text-center ${headingColor}`}>
        {title} <span className={highlightColor}>{highlight}</span> On
      </h2>

      {/* Social Icons */}
      <div className="flex gap-6 sm:gap-8 flex-wrap justify-center">
        {socials.map((social, index) => (
          <a
            key={index}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex items-center justify-center 
                        ${bgColor} shadow-md hover:shadow-xl transition-all duration-300 hover:scale-110`}
          >
            <img
              src={social.icon}
              alt={social.name}
              className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 group-hover:scale-110"
            />
            <div className={`absolute inset-0 rounded-full transition-all duration-300 ${hoverBg}`} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;
