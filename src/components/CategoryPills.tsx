import React, { useState } from 'react';
import { FaPen, FaLightbulb, FaAppleAlt, FaHotel, FaDesktop } from 'react-icons/fa';

interface CategoryPillsProps {
  loadCategory: (categoryId: number) => void;
  markActive: (categoryName: string) => void;
}

const CategoryPills: React.FC<CategoryPillsProps> = ({ loadCategory, markActive }) => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const categories = [
    { id: 2, name: 'Stationary', icon: <FaPen className="w-5 h-5 mr-4" /> },
    { id: 5, name: 'Electronic Shops', icon: <FaLightbulb className="w-5 h-5 mr-4" /> },
    { id: 3, name: 'Food', icon: <FaAppleAlt className="w-5 h-5 mr-4" /> },
    { id: 1, name: 'Hotels', icon: <FaHotel className="w-5 h-5 mr-4" /> },
    { id: 4, name: 'Computer Shops', icon: <FaDesktop className="w-5 h-5 mr-4" /> },
  ];

  return (
    <div className="flex flex-row mb-10">
      {categories.map((category) => (
        <div
          key={category.id} // Use id instead of name
          className={`flex border p-4 rounded-full items-center mr-4 cursor-pointer hover:border-gray-800 
            ${activeCategory === category.id ? 'border-blue1 bg-blue-100' : 'border-gray-400'}`} // Compare using id
          onClick={() => {
            setActiveCategory(category.id); // Set activeCategory as id
            loadCategory(category.id); // Pass the id to the parent function
            console.log(activeCategory);
            markActive(category.name);
            
          }}
        >
          {React.cloneElement(category.icon, {
            className: `w-5 h-5 mr-4 ${activeCategory === category.id ? 'text-blue1' : 'text-bluedark'}` // Apply styles based on id
          })}
          <span className={`text-blue-900 ${activeCategory === category.id ? 'font-semibold' : ''}`}>
            {category.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CategoryPills;
