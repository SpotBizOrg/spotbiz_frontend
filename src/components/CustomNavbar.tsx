import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';

const CustomNavbar = () => {
  return (
    <nav className="fixed top-0 z-40 w-full bg-white border-b border-gray-200 shadow-md">
      <div className="container mx-auto px-8 py-2 flex items-center justify-between">
        <div className="flex items-center mr-auto">
          <img src={Logo} alt="SpotBiz Logo" className="h-8 mr-6" /> {/* Adjusted margin */}
        </div>
        <div className="flex space-x-6 items-center ml-auto"> {/* Adjusted margin */}
          <Link to="/" className="text-gray-700 hover:text-blue-500">Home</Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-500">About</Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-500">Contact Us</Link>
          <Link to="/login">
            <button className="bg-primary text-white font-semibold px-6 py-1.5 rounded-custom2 hover:bg-primary-dark transition duration-300">Sign In</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default CustomNavbar;
