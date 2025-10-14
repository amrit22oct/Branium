import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContextObject } from "../../context/ThemeContext.jsx";

const CardImage = ({ bgImage }) => {
  const { theme } = useContext(ThemeContextObject);

  // Overlay opacity based on theme
  const initialOverlay = theme === "dark" ? "bg-black/30" : "bg-black/10";
  const hoverOverlay = theme === "dark" ? "group-hover:bg-black/50" : "group-hover:bg-black/30";

  return (
    <div className="absolute inset-0 rounded-lg overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        animate={{ backgroundPositionX: ["0%", "20%", "0%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Overlay */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-300 rounded-lg ${initialOverlay} ${hoverOverlay}`}
      />
    </div>
  );
};

export default CardImage;
