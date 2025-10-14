import React, { useContext } from "react";
import ArticleImage from "./ArticleImage";
import { ThemeContextObject } from "../../../context/ThemeContext";

const ArticleGrid = ({ items, theme }) => {
  const { theme: currentTheme } = useContext(ThemeContextObject);
  const activeTheme = theme || currentTheme;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {/* Left Column */}
      <div className="grid grid-rows-[2fr_1fr] gap-6 md:gap-8">
        {/* Big card */}
        <ArticleImage
          image={items[0].image}
          title={items[0].title}
          text={items[0].text}
          delay={0}
          big
          theme={activeTheme}
        />

        {/* Two smaller cards below */}
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {[items[1], items[2]].map((item, index) => (
            <ArticleImage
              key={index}
              image={item.image}
              title={item.title}
              text={item.text}
              delay={index * 0.2}
              theme={activeTheme}
            />
          ))}
        </div>
      </div>

      {/* Right Column */}
      <div className="grid grid-rows-[1fr_2fr] gap-6 md:gap-8">
        {/* Two smaller cards on top */}
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {[items[3], items[4]].map((item, index) => (
            <ArticleImage
              key={index}
              image={item.image}
              title={item.title}
              text={item.text}
              delay={index * 0.2}
              theme={activeTheme}
            />
          ))}
        </div>

        {/* Big card below */}
        <ArticleImage
          image={items[5].image}
          title={items[5].title}
          text={items[5].text}
          delay={0}
          big
          theme={activeTheme}
        />
      </div>
    </div>
  );
};

export default ArticleGrid;
