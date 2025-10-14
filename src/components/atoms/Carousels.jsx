import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const images = [
  "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630",
  "https://live.staticflickr.com/3671/9759316913_2dbf43de52_b.jpg",
  "https://cdn.pixabay.com/photo/2025/08/25/20/04/nature-9796816_1280.jpg",
  "https://media.istockphoto.com/id/1317323736/photo/a-view-up-into-the-trees-direction-sky.jpg?s=612x612&w=0&k=20&c=i4HYO7xhao7CkGy7Zc_8XSNX_iqG0vAwNsrH1ERmw2Q=",
];

const Carousel = ({ interval = 5000 }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [interval]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {images.map((img, i) => (
        <motion.img
          key={i}
          src={img}
          alt={`carousel-${i}`}
          initial={{ opacity: i === 0 ? 1 : 0 }}
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full h-full object-cover shadow-2xl hover:shadow-none transition-shadow duration-500"
        />
      ))}
    </div>
  );
};

export default Carousel;
