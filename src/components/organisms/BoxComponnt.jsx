import React, { useRef, useContext } from "react";
import { motion } from "framer-motion";
import Carousel from "../atoms/Carousels.jsx";
import { ThemeContextObject } from "../../context/ThemeContext.jsx";

const BoxComponent = () => {
  const constraintsRef = useRef(null);
  const { theme } = useContext(ThemeContextObject);
  const isDark = theme === "dark";

  return (
    <div
      className={`w-full h-[550px] md:h-[600px] lg:h-[600px] relative flex items-center justify-center ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      }`}
      ref={constraintsRef}
    >
      {/* Responsive Carousel Background */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        <Carousel />
        <div
          className={`absolute inset-0 transition-colors duration-500 ${
            isDark ? "bg-black/40" : "bg-white/20"
          }`}
        />
      </div>

      {/* Draggable Overlay Box */}
      <motion.div
        className={`relative z-10 w-[90%] max-w-[850px] h-[40%] max-h-[300px] flex items-center justify-center flex-col rounded-lg cursor-grab shadow-2xl ${
          isDark ? "bg-black/60 border-amber-400" : "bg-white/60 border-amber-500"
        } border-2`}
        dragConstraints={constraintsRef}
        dragElastic={0.3}
        dragMomentum={false}
        whileDrag={{ cursor: "grabbing", scale: 1.02 }}
        whileHover={{ scale: 1.01 }}
        animate={{ x: 0, y: 0 }}
        transition={{ type: "spring", stiffness: 250, damping: 25 }}
      >
        <div className="w-[95%] h-[90%] flex items-center justify-center flex-col">
          <h1
            className={`font-extrabold text-6xl sm:text-8xl md:text-9xl lg:text-9xl font-mono py-2 text-center transition-colors duration-500 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            BRAINIUM
          </h1>
          <p
            className={`font-medium text-md sm:text-lg md:text-3xl lg:text-3xl text-center transition-colors duration-500 ${
              isDark ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Adding magic at its extreme
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default BoxComponent;
