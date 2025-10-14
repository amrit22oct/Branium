import React from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay },
  }),
};

const ArticleText = ({ title, text, delay = 0, button = true }) => {
  return (
    <motion.div
      className="md:w-1/2 w-full md:px-8"
      variants={fadeInUp}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <h2 className="text-3xl font-bold mb-4 text-blue-600">{title}</h2>
      <p className="text-gray-600 leading-relaxed">{text}</p>
      {button && (
        <button className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-xl shadow hover:bg-blue-700 transition">
          Learn More
        </button>
      )}
    </motion.div>
  );
};

export default ArticleText;
