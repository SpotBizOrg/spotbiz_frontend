import React from 'react';
import { FaPenNib, FaHotel, FaLaptop, FaAppleAlt, FaLightbulb } from 'react-icons/fa';

const categories = [
  { name: 'Stationary', icon: <FaPenNib size={32} className="text-black" /> , link: '#'},
  { name: 'Hotels', icon: <FaHotel size={32} className="text-black" /> , link: '#'},
  { name: 'Computer Shops', icon: <FaLaptop size={32} className="text-black" /> , link: '#'},
  { name: 'Food', icon: <FaAppleAlt size={32} className="text-black" /> , link: '#'},
  { name: 'Electronic Shops', icon: <FaLightbulb size={32} className="text-black" /> , link: '#'},
];

const Categories = () => {
  return (
    <div className="container mx-auto my-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center">
      {categories.map((category) => (
        <div key={category.name} className="flex flex-col items-center">
          <div className="bg-yellow-400 p-4 rounded-full mb-2">
            {category.icon}
          </div>
          <div className="text-lg font-semibold">{category.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
