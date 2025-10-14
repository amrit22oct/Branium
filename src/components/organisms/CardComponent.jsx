import React, { useContext } from "react";
import { motion } from "framer-motion";
import CardImage from "../molecules/CardImage";
import CardContent from "../molecules/CardContent";
import { ThemeContextObject } from "../../context/ThemeContext";

// Mock data for cards
const mockData = [
  {
    title: "Card One",
    description: "This is the first card. It has some interesting content.",
    catogary: "Nature",
    bgImage:
      "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=500&q=80",
  },
  {
    title: "Card Two",
    description: "This is the second card. Learn more about it here.",
    catogary: "Nature",
    bgImage:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80",
  },
  {
    title: "Card Three",
    description: "The third card has additional info and highlights.",
    catogary: "Nature",
    bgImage:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=500&q=80",
  },
  {
    title: "Card Four",
    description: "Another card with cool features and data.",
    catogary: "Nature",
    bgImage:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=500&q=80",
  },
  {
    title: "Card Five",
    description: "The final card in the set. It’s full of surprises!",
    catogary: "Nature",
    bgImage:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=500&q=80",
  },
];

const CardComponent = ({ index }) => {
  const card = mockData[index % mockData.length];
  const { theme } = useContext(ThemeContextObject);

  return (
    <motion.div
      className={`h-[400px] w-[600px] group shadow-xl flex flex-col items-center justify-center p-6 cursor-pointer overflow-hidden relative transition-colors duration-500
        ${theme === "dark" ? "text-gray-100" : "text-gray-900"}
      `}
      whileHover={{
        scale: 1.05,
        y: -5,
        boxShadow: "0px 20px 40px rgba(0,0,0,0.3)",
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <CardImage bgImage={card.bgImage} />
      <CardContent
        title={card.title}
        catogary={card.catogary}
        description={card.description}
        theme={theme} // Pass theme if CardContent needs it
      />
      {/* Optional overlay for dark mode */}
      {theme === "dark" && (
        <div className="absolute inset-0 bg-black/30 pointer-events-none rounded-lg" />
      )}
    </motion.div>
  );
};

export default CardComponent;
