import React, { useContext } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import PopularCardsCarousel from "../../components/organisms/PopularCardsCarousel";
import ContentSection from "../../components/organisms/ContentSection";
import ArticleContentSection from "../../components/organisms/ArticleContentSection/ArticleContentSection";
import BrandCarousel from "../../components/organisms/BrandCarousel";
import { ThemeContextObject } from "../../context/ThemeContext";

const Home = () => {
  const { theme } = useContext(ThemeContextObject);
  const isDark = theme === "dark";

  const { scrollY } = useScroll();
  const headerHeight = 64;
  const carouselHeight = 400;
  const totalSectionHeight = headerHeight + carouselHeight;

  const scrollYClamped = useTransform(
    scrollY,
    [0, totalSectionHeight],
    [0, totalSectionHeight]
  );
  const headerYRange = useTransform(
    scrollYClamped,
    [0, carouselHeight],
    [0, carouselHeight]
  );
  const headerYSmooth = useSpring(headerYRange, { stiffness: 90, damping: 25 });

  return (
    <div className={`relative ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Most Popular Carousel */}
      <div className="w-full relative">
        <PopularCardsCarousel />
      </div>

      {/* All sections below header move with it */}
      <motion.div style={{ y: headerYSmooth }} className="relative z-10">
        {/* Main Content Section */}
        <ContentSection />

        {/* Latest Articles Section */}
        <div
          className={`px-4 sm:px-8 lg:px-16 flex justify-center items-center flex-col ${
            isDark ? "bg-gray-900" : "bg-gray-100"
          }`}
        >
          <h2
            className={`text-5xl mt-10 font-bold mb-6 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Latest Articles
          </h2>
          <ArticleContentSection />
        </div>

        {/* Brand Carousel Section */}
        <BrandCarousel />
      </motion.div>

      {/* Spacer for smooth scrolling */}
      <div
        style={{ height: `${headerHeight + carouselHeight}px` }}
        className={isDark ? "bg-gray-900" : "bg-gray-100"}
      />
    </div>
  );
};

export default Home;
