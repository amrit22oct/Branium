import React from "react";
import { Link } from "react-router-dom";

const Navlinks = ({ 
  links = [], 
  className = "", 
  linkClassName = "", 
  as: Component = "a", 
  onLinkClick 
}) => {
  return (
    <nav className={className}>
      {links.map((link, index) => (
        <Component
          key={index}
          to={Component === Link ? link.href : undefined}
          href={Component === "a" ? link.href : undefined}
          className={`${linkClassName} `}
          onClick={onLinkClick}
        >
          {link.label}
        </Component>
      ))}
    </nav>
  );
};

export default Navlinks;
