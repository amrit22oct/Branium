import React, { useContext } from 'react';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';
import TopBar from '../organisms/TopBar';
import ContactBar from '../organisms/ContactBar';
import BoxComponnt from '../organisms/BoxComponnt';
import { ThemeContextObject } from '../../context/ThemeContext';

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
