import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContextObject } from "../../context/ThemeContext.jsx";

const CardContent = ({ title, description, catogary }) => {
  const { theme } = useContext(ThemeContextObject);

  // Determine text colors based on theme
  const categoryColor = theme === "dark" ? "text-indigo-300" : "text-indigo-600";
  const titleColor = theme === "dark" ? "text-white hover:text-amber-200" : "text-gray-900 hover:text-amber-600";
  const descriptionColor = theme === "dark" ? "text-gray-200" : "text-gray-700";

  return (
    <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 md:p-8 transition-colors duration-500">
      {/* Category */}
      {catogary && (
        <p className={`uppercase tracking-widest mb-2 text-sm ${categoryColor}`}>
          {catogary}
        </p>
      )}

      {/* Title */}
      <h2 className={`font-extrabold text-3xl md:text-4xl lg:text-5xl mb-4 font-serif ${titleColor}`}>
        {title}
      </h2>

      {/* Description */}
      {description && (
        <motion.p
          className={`text-base md:text-lg leading-relaxed ${descriptionColor}`}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

export default CardContent;
