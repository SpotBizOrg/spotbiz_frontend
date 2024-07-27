import React, { useState } from 'react';
import { FaPen, FaLightbulb, FaAppleAlt, FaHotel, FaDesktop } from 'react-icons/fa';

const CategoryPills = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = [
    { name: 'Stationary', icon: <FaPen className="w-5 h-5 mr-4" /> },
    { name: 'Electronic Shops', icon: <FaLightbulb className="w-5 h-5 mr-4" /> },
    { name: 'Food', icon: <FaAppleAlt className="w-5 h-5 mr-4" /> },
    { name: 'Hotels', icon: <FaHotel className="w-5 h-5 mr-4" /> },
    { name: 'Computer Shops', icon: <FaDesktop className="w-5 h-5 mr-4" /> },
  ];

  return (
    <div className="flex flex-row mb-10">
      {categories.map((category) => (
        <div
          key={category.name}
          className={`flex border p-4 rounded-full items-center mr-4 cursor-pointer hover:border-gray-800 
            ${activeCategory === category.name ? 'border-blue1 bg-blue-100' : 'border-gray-400'}`}
          onClick={() => setActiveCategory(category.name)}
        >
          {React.cloneElement(category.icon, {
            className: `w-5 h-5 mr-4 ${activeCategory === category.name ? 'text-blue1' : 'text-bluedark'}`
          })}
          <span className={`text-blue-900 ${activeCategory === category.name ? 'font-semibold' : ''}`}>{category.name}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryPills;
