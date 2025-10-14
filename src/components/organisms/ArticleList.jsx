import React, { useContext } from "react";
import { motion } from "framer-motion";
import ArticleCard from "./ArticleCard.jsx";
import articles from "../../constants/articles.js";
import { ThemeContextObject } from "../../context/ThemeContext.jsx";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const ArticleList = () => {
  const { theme } = useContext(ThemeContextObject);
  const bgColor = theme === "dark" ? "bg-gray-900" : "bg-gray-100";

  return (
    <motion.div
      className={`w-full flex justify-center transition-colors duration-500 ${bgColor}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 justify-items-center max-w-[1500px] p-4 md:p-6">
        {articles.slice(0, 4).map((article) => (
          <motion.div key={article.id} variants={cardVariants}>
            <ArticleCard article={article} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ArticleList;
