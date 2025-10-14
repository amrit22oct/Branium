import React from "react";
import { Link } from "react-router-dom"; // if using react-router

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 text-center">
      {/* Big 404 text */}
      <h1 className="text-6xl sm:text-8xl font-bold text-gray-800 mb-4">404</h1>

      {/* Message */}
      <p className="text-xl sm:text-2xl text-gray-600 mb-6">
        Oops! The page you are looking for does not exist.
      </p>

      {/* Optional description */}
      <p className="text-gray-500 mb-8 max-w-md">
        It might have been removed, renamed, or never existed in the first
        place.
      </p>

      {/* Button to go home */}
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
