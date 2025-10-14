import React, { useContext } from "react";
import BrandCarousel from "./BrandCarousel.jsx";
import SocialLinks from "../molecules/SocialLinks.jsx";
import { ThemeContextObject } from "../../context/ThemeContext.jsx";

const Footer = () => {
  const { theme } = useContext(ThemeContextObject);
  const isDark = theme === "dark";

  const bgColor = isDark ? "bg-gray-950" : "bg-gray-400";
  const textColor = isDark ? "text-gray-200" : "text-gray-900";
  const linkHoverColor = isDark ? "hover:text-indigo-400" : "hover:text-blue-600";
  const borderColor = isDark ? "border-gray-700" : "border-gray-200";
  const paragraphColor = isDark? "text-gray-300" : "text-gray-700"

  return (
    <footer className={`${bgColor} ${textColor} shadow-inner z-50`}>
    

      {/* Links & description section */}
      <div className="max-w-6xl mx-auto px-6 sm:px-12 py-8 grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
        {/* About */}
        <div>
          <h3 className="text-lg font-semibold mb-3">About Us</h3>
          <p className={` text-sm ${paragraphColor}`} >
            We are a team dedicated to building modern web experiences that are fast, reliable, and user-friendly.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className={`${linkHoverColor}`}>Home</a></li>
            <li><a href="#" className={`${linkHoverColor}`}>About</a></li>
            <li><a href="#" className={`${linkHoverColor}`}>Services</a></li>
            <li><a href="#" className={`${linkHoverColor}`}>Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className={` text-sm ${paragraphColor}`} > 123 Main Street, City, Country</p>
          <p className={` text-sm ${paragraphColor}`} >Email: info@example.com</p>
          <p className={` text-sm ${paragraphColor}`} >Phone: +123 456 7890</p>
        </div>
      </div>

      {/* Social Links */}
      <div className="flex justify-center mt-6">
        <SocialLinks
          title="Follow"
          highlight="Us"
          socials={[
            { name: "Instagram", icon: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png", link: "https://www.instagram.com/" },
            { name: "Twitter", icon: "https://cdn-icons-png.flaticon.com/512/733/733579.png", link: "https://twitter.com/" },
            { name: "LinkedIn", icon: "https://cdn-icons-png.flaticon.com/512/174/174857.png", link: "https://www.linkedin.com/" },
            { name: "YouTube", icon: "https://cdn-icons-png.flaticon.com/512/1384/1384060.png", link: "https://www.youtube.com/" },
          ]}
        />
      </div>

      {/* Footer bottom */}
      <div className={`mt-6 py-4 text-sm text-center border-t ${borderColor}`}>
        &copy; {new Date().getFullYear()} My Website. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
