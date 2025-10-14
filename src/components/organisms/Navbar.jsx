import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navlinks from "../atoms/Navlinks.jsx";
import Logo from "../atoms/Logo.jsx";
import { navLinks } from "../../constants/navlinks.js";
import { ThemeContextObject } from "../../context/ThemeContext.jsx";

const MotionLink = motion.create(Link);

const Navbar = () => {
  const { theme, setTheme } = useContext(ThemeContextObject);
  const isDark = theme === "dark";

  const [scrolled, setScrolled] = useState(false);
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!navbarRef.current) return;
      const rect = navbarRef.current.getBoundingClientRect();
      setScrolled(rect.top <= 0);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeSlide = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <nav
      ref={navbarRef}
      className={`sticky top-0 z-150 w-full shadow-md ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      }`}
      style={{ height: "80px" }}
    >
      <div className="relative h-full px-6 md:px-12 flex items-center justify-center">
        {/* Center: Navlinks */}
        <div className="flex justify-center w-full">
          <Navlinks
            links={navLinks}
            as={MotionLink}
            className="flex flex-wrap justify-center gap-6 md:gap-10"
            linkClassName={`relative font-semibold text-lg transition-colors duration-300 ${
              isDark
                ? "text-gray-200 hover:text-indigo-400"
                : "text-gray-800 hover:text-indigo-600"
            } after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-indigo-600 after:w-0 after:transition-all after:duration-300 hover:after:w-full`}
          />
        </div>

        {/* Left: Logo */}
        <AnimatePresence>
          {scrolled && (
            <motion.div
              key="logo"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={fadeSlide}
              transition={{ duration: 0.3 }}
              className="absolute left-6"
            >
              <Link to="/">
                <Logo theme={theme} />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right: Lets Explore + Theme Toggle */}
        <AnimatePresence>
          {scrolled && (
            <motion.div
              key="right-section"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={fadeSlide}
              transition={{ duration: 0.3 }}
              className="absolute right-6 flex items-center gap-4"
            >
              <span
                className={`text-lg sm:text-xl md:text-2xl font-bold select-none ${
                  isDark ? "text-gray-200" : "text-gray-800"
                }`}
              >
                Lets Explore
              </span>
           
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
