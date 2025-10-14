import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaGithub,
  FaPinterestP,
  FaSnapchatGhost,
  FaRedditAlien,
  FaTiktok,
} from "react-icons/fa";

const Icon = () => {
  const icons = [
    { component: FaFacebookF, name: "Facebook" },
    { component: FaTwitter, name: "Twitter" },
    { component: FaInstagram, name: "Instagram" },
    { component: FaLinkedinIn, name: "LinkedIn" },
    { component: FaYoutube, name: "YouTube" },
    { component: FaGithub, name: "GitHub" },
    { component: FaPinterestP, name: "Pinterest" },
    { component: FaSnapchatGhost, name: "Snapchat" },
    { component: FaRedditAlien, name: "Reddit" },
    { component: FaTiktok, name: "TikTok" },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {icons.map((icon, index) => {
        const IconComponent = icon.component;
        return (
          <div
            key={index}
            className="text-black hover:text-[aqua] cursor-pointer "
            title={icon.name}
          >
            <IconComponent />
          </div>
        );
      })}
    </div>
  );
};

export default Icon;
