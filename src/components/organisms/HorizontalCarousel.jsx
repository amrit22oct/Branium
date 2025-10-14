import React, { useState, useEffect, useRef, useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContextObject } from "../../context/ThemeContext.jsx";

const HorizontalCarousel = ({ children, speed = 2 }) => {
  const { theme } = useContext(ThemeContextObject);
  const carouselRef = useRef(null);
  const [x, setX] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [totalWidth, setTotalWidth] = useState(0);

  // Calculate total width of one set of children
  useEffect(() => {
    if (carouselRef.current) {
      const firstSet = carouselRef.current.querySelector(".carousel-set");
      if (firstSet) {
        setTotalWidth(firstSet.scrollWidth);
        setX(-firstSet.scrollWidth); // start off-screen
      }
    }
  }, []);

  // Animation loop
  useEffect(() => {
    let animationFrame;
    const animate = () => {
      if (!isPaused && totalWidth > 0) {
        setX((prev) => {
          let next = prev + speed;
          if (next >= 0) next -= totalWidth; // loop infinitely
          return next;
        });
      }
      animationFrame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [isPaused, totalWidth, speed]);

  return (
    <div
      className={`relative w-full overflow-hidden transition-colors duration-500 ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <motion.div
        ref={carouselRef}
        className="flex w-max"
        style={{ x }}
      >
        {[...Array(2)].map((_, setIndex) => (
          <div className="flex carousel-set" key={setIndex}>
            {React.Children.map(children, (child, i) => (
              <div
                key={i}
                className="flex-shrink-0 transition-colors duration-500"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {child}
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default HorizontalCarousel;
