import React from "react";
import { FaSearch } from 'react-icons/fa';
import CustomNavbar from '../components/CustomNavbar';
import HomeImage from '../assets/Background.png'; 

const Header = () => {
  return (
    <div className="relative">
      <CustomNavbar />
      <header className="relative">
        <img src={HomeImage} alt="Cityscape" className="w-full h-95.5 object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-3xl md:text-5xl font-semibold">Explore the best places in the city</h1>
          <p className="text-xl md:text-2xl font-medium mt-4">Find the best places being at your comfort zones</p>
          <div className="relative flex items-center justify-center mt-8 px-4 w-full max-w-2xl">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="What are you looking for"
                className="w-full px-4 py-4 pl-12 rounded-full shadow border-0 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                style={{ boxShadow: 'none' }}
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue3" />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
