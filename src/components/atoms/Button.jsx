import React from "react";
import { motion } from "framer-motion";

const Button = ({
  children,
  onClick,
  className = "",
  gradientColors = "from-cyan-400 via-purple-500 to-pink-500",
  hoverScale = 0.95,
  hoverGlowOpacity = 0.15,
  animationDuration = 2,
  animationEase = "easeInOut",
  repeat= Infinity
}) => {
  return (
    <motion.button
      onClick={onClick}
      className={`relative px-8 py-2 rounded-lg overflow-hidden font-medium bg-black cursor-pointer text-white ${className}`}
      whileHover={{ scale: hoverScale }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Animated Gradient Background */}
      <motion.span
        className={`absolute inset-0 rounded-lg bg-gradient-to-r ${gradientColors} opacity-70 blur-md`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1, backgroundPositionX: ["0%", "200%"] }}
        whileHover={{ backgroundPositionX: ["0%", "300%"] }}
        transition={{
          duration: animationDuration,
          ease: animationEase,
          repeat: repeat,
          repeatType: "mirror",
        }}
      />

      {/* Button content */}
      <span className="relative z-10">{children}</span>

      {/* Hover glow overlay */}
      <motion.span
        className="absolute inset-0 rounded-lg bg-white opacity-0"
        whileHover={{ opacity: hoverGlowOpacity }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
};

export default Button;
