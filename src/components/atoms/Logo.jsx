import React, { useContext } from "react";
import { ThemeContextObject } from "../../context/ThemeContext";

const logoText = "Brainium";
const baseColorLight = "#1f2937"; // dark gray
const accentColorLight = "#2563eb"; // blue

const baseColorDark = "#f3f4f6"; // light gray
const accentColorDark = "#3b82f6"; // lighter blue

const Logo = () => {
  const { theme } = useContext(ThemeContextObject);
  const isDark = theme === "dark";

  const baseColor = isDark ? baseColorDark : baseColorLight;
  const accentColor = isDark ? accentColorDark : accentColorLight;

  return (
    <h1
      className="inline-flex font-bold w-40 cursor-pointer p-0 select-none transition-colors duration-300"
      style={{
        fontFamily: "Inter, sans-serif",
        fontSize: "2.4rem",
        letterSpacing: "0.05em",
      }}
    >
      {logoText.split("").map((letter, index) => (
        <span
          key={index}
          className="inline-block transition-colors duration-300 hover:text-indigo-400"
          style={{ color: index === 0 ? accentColor : baseColor }}
        >
          {letter}
        </span>
      ))}
    </h1>
  );
};

export default Logo;
