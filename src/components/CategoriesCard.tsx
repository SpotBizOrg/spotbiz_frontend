import React from 'react';
import { FaPen, FaLightbulb, FaAppleAlt, FaDesktop, FaHotel } from 'react-icons/fa';

const CategoriesCard: React.FC = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg pl-6 pr-2 pt-4 pb-4 w-48 h-96"> {/* Adjusted padding */}
      <h2 className="text-blue-900 font-bold text-lg mb-4 border-b border-gray-300 pb-2">Browse Categories</h2>
      <div className="space-y-6"> {/* Increased line space */}
        <div className="flex items-center">
          <FaPen className="text-yellow-500 w-7 h-7 mr-4" /> {/* Increased icon size and space */}
          <span className="text-blue-900">Stationary</span> {/* Changed text color to dark blue */}
        </div>
        <div className="flex items-center">
          <FaLightbulb className="text-yellow-500 w-7 h-7 mr-4" /> {/* Increased icon size and space */}
          <span className="text-blue-900">Electronic Shops</span> {/* Changed text color to dark blue */}
        </div>
        <div className="flex items-center">
          <FaAppleAlt className="text-yellow-500 w-7 h-7 mr-4" /> {/* Increased icon size and space */}
          <span className="text-blue-900">Food</span> {/* Changed text color to dark blue */}
        </div>
        <div className="flex items-center">
          <FaDesktop className="text-yellow-500 w-7 h-7 mr-4" /> {/* Increased icon size and space */}
          <span className="text-blue-900">Computer Shops</span> {/* Changed text color to dark blue */}
        </div>
        <div className="flex items-center">
          <FaHotel className="text-yellow-500 w-7 h-7 mr-4" /> {/* Increased icon size and space */}
          <span className="text-blue-900">Hotels</span> {/* Changed text color to dark blue */}
        </div>
      </div>
    </div>
  );
};

export default CategoriesCard;
