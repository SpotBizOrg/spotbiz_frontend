import React from "react";
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { FaSearch } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-cover bg-center h-auto py-10" style={{ backgroundImage: 'url("/Background.png")' }}>
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <img src={logo} alt="SpotBiz Logo" className="h-16 mb-4 md:mb-0" />
        <nav className="flex items-center space-x-8">
          <a href="#" className="text-white text-lg font-semibold">Home</a>
          <a href="#" className="text-white text-lg font-semibold">About</a>
          <a href="#" className="text-white text-lg font-semibold">Contact Us</a>
          <Link to="/login">
            <button className="bg-yellow-400 text-black font-semibold px-6 py-2 rounded-full hover:bg-yellow-500 transition duration-300">Sign In</button>
          </Link>
        </nav>
      </div>
      <div className="container mx-auto text-center text-white mt-10">
        <h1 className="text-3xl md:text-5xl font-bold">Explore the best places in the city</h1>
        <p className="text-xl md:text-2xl font-bold mt-4">Find the best places being at your comfort zones</p>
        <div className="relative flex items-center justify-center mt-8 px-4">
          <div className="relative w-full max-w-2xl">
            <input
              type="text"
              placeholder="What are you looking for"
              className="w-full px-4 py-4 pl-12 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-500" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
