import React, { useContext } from "react";
import { motion } from "framer-motion";
import ArticleList from "./ArticleList";
import { ThemeContextObject } from "../../context/ThemeContext";

const ContentSection = () => {
  const { theme } = useContext(ThemeContextObject);
  const bgColor = theme === "dark" ? "bg-gray-900" : "bg-gray-100";
  const textColor = theme === "dark" ? "text-gray-100" : "text-gray-900";

  return (
    <div className={`flex flex-col items-center transition-colors duration-500 ${bgColor}`}>
      {/* Page Header */}
      <div className={`max-w-5xl text-center mb-8 transition-colors duration-500 ${textColor}`}>
        <h1 className="text-4xl font-extrabold font-mono capitalize mt-10">
          Latest Events Around the Globe
        </h1>
        <p className="mt-5 px-4 sm:px-8 leading-relaxed">
          The world never stands still—and neither should you. From
          groundbreaking discoveries to unexpected global shifts, every day
          unfolds a new chapter worth exploring.
        </p>
      </div>

      {/* Articles Section */}
      <motion.div
        className="w-full min-h-[60vh]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="px-4 sm:px-6 lg:px-8 mx-12">
          <ArticleList />
        </div>
      </motion.div>
    </div>
  );
};

export default ContentSection;
