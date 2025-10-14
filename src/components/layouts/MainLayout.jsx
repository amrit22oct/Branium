import React, { useContext } from 'react';
import Navbar from '../organisms/Navbar.jsx';
import Footer from '../organisms/Footer.jsx';
import TopBar from '../organisms/TopBar.jsx';
import ContactBar from '../organisms/ContactBar.jsx';
import BoxComponnt from '../organisms/BoxComponnt.jsx';
import { ThemeContextObject } from '../../context/ThemeContext.jsx';

const MainLayout = ({ children }) => {
  const { theme, toggleTheme } = useContext(ThemeContextObject);

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* Fixed theme toggle button on the right */}
      <button
  onClick={toggleTheme}
  className={`
    fixed bottom-6 right-6 z-[200]
    px-4 py-2 rounded-lg font-semibold shadow-lg
    transition-all duration-300 ease-in-out
    ${theme === "dark"
      ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
      : "bg-gray-800 text-white hover:bg-gray-900"
    }
  `}
>
  {theme === "dark" ? "Light Mode ☀️" : "Dark Mode 🌙"}
</button>


      {/* Top sections */}
      <TopBar />
      <ContactBar />
      <BoxComponnt />
      <Navbar />

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
