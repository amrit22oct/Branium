import React, { useContext } from "react";
import CardImage from "../molecules/CardImage"; // make sure path is correct
import { ThemeContextObject } from "../../context/ThemeContext";

const cardImages = [
  "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1758801304977-fbb605f3858f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1759590029861-cd53285ab514?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1759434225861-e834192ccdaf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
];

const BrandCarousel = () => {
  const { theme } = useContext(ThemeContextObject);
  const isDark = theme === "dark";

  return (
    <div className={`w-full py-12 ${isDark ? "bg-gray-900" : "bg-gray-100"}`}>
      {/* Card container */}
      <div className="flex flex-wrap justify-center gap-6 sm:gap-8 items-center">
        {cardImages.map((image, index) => (
          <div
            key={index}
            className={`relative group w-36 h-24 sm:w-44 sm:h-28 md:w-56 md:h-36 
                       rounded-xl overflow-hidden shadow-md hover:shadow-xl 
                       transition-all duration-300 transform cursor-pointer`}
          >
            <CardImage bgImage={image} />

            {/* Initial overlay depending on theme */}
            <div
              className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                isDark ? "bg-black/20 group-hover:bg-black/0" : "bg-black/10 group-hover:bg-black/0"
              }`}
            />

            {/* Brightness hover */}
            <div className="absolute inset-0 rounded-xl transition-all duration-300 group-hover:brightness-150" />
          </div>
        ))}
      </div>

      {/* Description below carousel */}
      <div className="mt-8 text-center">
        <h3 className={`text-lg sm:text-xl font-semibold ${isDark ? "text-white" : "text-gray-700"}`}>
          Our Trusted Partners
        </h3>
        <p className={`text-sm sm:text-base mt-2 max-w-xl mx-auto ${isDark ? "text-gray-300" : "text-gray-500"}`}>
          We collaborate with leading brands to bring you the best products and services.
        </p>
      </div>
    </div>
  );
};

export default BrandCarousel;
