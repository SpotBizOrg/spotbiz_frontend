import React, { useState } from "react";
import { FaSearch } from 'react-icons/fa';
import Nousernavbar from "./Nousernavbar";
import HomeImage from '../assets/Background.png'; 
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Header = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const searchQuery = query.trim(); 
  
    if (searchQuery) {
      navigate('/search', { state: { query: searchQuery } });
    } else {
      navigate("/")
    }
  };

  return (
    <div className="relative">
      <Nousernavbar />
      <header className="relative">
        <img src={HomeImage} alt="Cityscape" className="w-full h-95.5 object-cover brightness-50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-3xl md:text-5xl font-semibold">Find what you need, Where you need it!</h1>
          <p className="text-xl md:text-2xl font-medium mt-4">Search for local Businesses tailored to your preferences</p>
          <div className="flex items-center mt-8 w-full max-w-2xl">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="What are you looking for"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full py-3 pl-4 pr-12 rounded-full text-gray-600"
                style={{ boxShadow: 'none' }}
              />
              <FaSearch 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600"
                onClick={handleSearch}
              />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
