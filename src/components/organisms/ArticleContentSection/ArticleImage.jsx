import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContextObject } from "../../../context/ThemeContext.jsx";

const ArticleImage = ({ image, title, text, delay = 0, big = false }) => {
  const { theme } = useContext(ThemeContextObject);
  const isDark = theme === "dark";

  return (
    <motion.div
      className={`relative w-full rounded-2xl shadow-xl overflow-hidden cursor-pointer group ${
        big ? "h-96 md:h-[28rem]" : "h-48 md:h-56"
      }`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Image */}
      <img
        src={image}
        alt={title}
        className={`w-full h-full object-cover transition-all duration-500 ${
          isDark
            ? "brightness-60 group-hover:brightness-90"
            : "brightness-90 group-hover:brightness-110"
        } group-hover:scale-105`}
      />

      {/* Gradient Overlay */}
      <div
        className={`absolute left-0 bottom-0 w-full p-4 md:p-6 flex flex-col justify-end
          ${isDark ? "bg-gradient-to-t from-black/60 to-transparent" : "bg-gradient-to-t from-black/40 to-transparent"}`}
      >
        <h2
          className={`${
            big ? "text-xl md:text-2xl" : "text-lg md:text-xl"
          } font-bold text-white mb-1 transition-colors duration-300`}
        >
          {title}
        </h2>
        <p
          className={`${
            big ? "text-base md:text-lg" : "text-sm md:text-base"
          } text-white transition-colors duration-300`}
        >
          {text}
        </p>
      </div>
    </motion.div>
  );
};

export default ArticleImage;
