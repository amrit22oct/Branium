import React from "react";
import { motion } from "framer-motion";
import ArticleCard from "../../components/organisms/ArticleCard";
import articles from "../../constants/articles";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ArticlePage = () => {
  // Handle case when there are no articles
  if (!articles || articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl font-semibold text-gray-600">
          No articles available.
        </h2>
      </div>
    );
  }

  // Split articles into featured and others
  const [featuredArticle, ...otherArticles] = articles;

  return (
    <div className="flex flex-col items-center w-full">
      {/* Header */}
      <header className="text-center py-10">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-800  dark:text-gray-800">
          Articles — Let's Deep Dive Into It...
        </h1>
      </header>

      {/* Featured Article (2x size) */}
      <motion.div
        className="w-full flex justify-center px-4 md:px-6"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <ArticleCard article={featuredArticle} large />
      </motion.div>

      {/* Other Articles in 2 Columns */}
      <motion.div
        className="grid gap-8 sm:grid-cols-2 max-w-6xl px-4 md:px-6 py-10"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1 }}
      >
        {otherArticles.slice(0, 6).map((article) => (
          <motion.div key={article.id} variants={cardVariants}>
            <ArticleCard article={article} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ArticlePage;
