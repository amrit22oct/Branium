import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom"; // for SPA navigation
import Navlinks from "../atoms/Navlinks";

const Hamburger = ({
  links = [],
  drawerWidth = "w-72", // slightly wider for a better look
  buttonClass = "p-3 rounded-full bg-white shadow hover:bg-gray-100",
  drawerBg = "bg-white",
  headerGradient = "from-blue-500 to-indigo-500",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    hidden: { x: 300, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 250, damping: 28 },
    },
    exit: {
      x: 300,
      opacity: 0,
      transition: { type: "spring", stiffness: 250, damping: 28 },
    },
  };

  return (
    <div className="relative">
      {/* Hamburger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${buttonClass} transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500`}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Animated Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 cursor-crosshair"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`fixed top-0 right-0 h-full ${drawerWidth} ${drawerBg} shadow-2xl rounded-l-2xl z-50 flex flex-col`}
            >
              {/* Header */}
              <div
                className={`p-5 bg-gradient-to-b ${headerGradient} rounded-l-2xl text-white font-bold text-2xl text-center shadow-lg mb-2`}
              >
                Menu
              </div>

              {/* Nav Links */}
              <div className="p-6 flex flex-col gap-6 items-center">
                <Navlinks
                  links={links}
                  as={Link}
                  onLinkClick={() => setIsOpen(false)} // close drawer on link click
                  className="flex flex-col gap-8 w-full justify-center items-center "
                  linkClassName="text-gray-800 text-xl  shadow-md m-2 font-semibold w-full  flex items-center justify-center  h-9 transition-colors duration-200 hover:text-indigo-600"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hamburger;
