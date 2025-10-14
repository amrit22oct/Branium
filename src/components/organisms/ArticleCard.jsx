import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Loader from "../atoms/Loader.jsx";
import "../organisms/ArticleCard.css";
import { ThemeContextObject } from "../../context/ThemeContext.jsx";

const ArticleCard = ({
  article,
  showImage = true,
  showSummary = true,
  className = "",
  large = false, // 👈 added for featured card
}) => {
  const { theme } = useContext(ThemeContextObject);

  if (!article) return <Loader />;

  const { id, image, title, summary, author, date } = article;

  // Theme-based styles
  const cardBg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const contentBg = theme === "dark" ? "bg-gray-800" : "bg-white";
  const titleColor =
    theme === "dark"
      ? "text-gray-100 hover:text-blue-400"
      : "text-gray-900 hover:text-blue-600";
  const summaryColor = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const overlayInitial = theme === "dark" ? "bg-black/50" : "bg-black/30";
  const overlayHover = theme === "dark" ? "hover:opacity-20" : "hover:opacity-10";

  // ✅ Card size configs
  const cardSize = large
    ? "w-[800px] h-[1100px]" // 2× larger
    : "w-[350px] h-[600px]";
  const imageHeight = large ? "h-[550px]" : "h-60";
  const contentHeight = large
    ? "h-[calc(1100px-550px)]" // perfectly balances content area
    : "h-[calc(600px-15rem)]";

  return (
    <article
      id="card"
      className={`shadow-lg m-6 overflow-hidden transition-colors duration-500 rounded-2xl ${cardBg} ${cardSize} ${className}`}
    >
      {/* Image */}
      {showImage && image && (
        <Link
          to={`/articles/${id}`}
          className={`relative block overflow-hidden group ${imageHeight}`}
        >
          <img
            src={image}
            alt={title || "Article image"}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div
            className={`absolute inset-0 ${overlayInitial} opacity-100 transition-all duration-500 ${overlayHover}`}
          />
        </Link>
      )}

      {/* Content */}
      <div
        className={`p-6 flex flex-col justify-between transition-colors duration-500 ${contentBg} ${contentHeight}`}
      >
        <div>
          <Link to={`/articles/${id}`}>
            <h3
              className={`font-bold ${
                large ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"
              } ${titleColor}`}
            >
              {title || "Untitled Article"}
            </h3>
          </Link>

          {showSummary && summary && (
            <p
              className={`mt-3 ${summaryColor} ${
                large
                  ? "text-lg leading-relaxed line-clamp-10" // show 5 lines max for large card
                  : "text-base line-clamp-5"
              }`}
            >
              {summary}
            </p>
          )}
        </div>

        {/* Author and Date */}
        <div
          className={`mt-6 flex justify-between items-center ${
            large ? "text-sm" : "text-xs"
          } text-gray-500`}
        >
          <span>{author || "Unknown Author"}</span>
          <time dateTime={date}>{date || "No date"}</time>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
