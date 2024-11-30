import React, { useEffect, useState } from 'react';
import { FaPenNib, FaHotel, FaLaptop, FaAppleAlt, FaLightbulb } from 'react-icons/fa';
import axios from 'axios';
import { BACKEND_URL } from '../../config';

interface CategoriesProps {
  categoryId: number;
  categoryName: string;
}

const Categories = () => {
  const [categories, setCategories] = useState<CategoriesProps[]>([]);
  

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/admin/business_type/all`);  // Replace with your actual endpoint
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };



  useEffect(() => {

    fetchCategories();
  }, []); 

  // Map category names to icons
  const categoryIcons: { [key: string]: JSX.Element } = {
    'Stationary': <FaPenNib size={32} className="text-blue10" />,
    'Hotels': <FaHotel size={32} className="text-blue10" />,
    'Computer': <FaLaptop size={32} className="text-blue10" />,
    'Electronic': <FaLightbulb size={32} className="text-blue10" />,
    'Food': <FaAppleAlt size={32} className="text-blue10" />
  };

  return (
    <div className="container mx-auto my-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center">
      {categories.map((category) => (
        <div 
        key={category.categoryId} 
        className="flex flex-col items-center"
        >
          <div className="bg-primary p-4 rounded-full mb-2">
            {categoryIcons[category.categoryName as keyof typeof categoryIcons] || <FaPenNib size={32} className="text-blue10" />} {/* Default icon */}
          </div>
          <div className="text-lg font-semibold">{category.categoryName}</div>
        </div>
      ))}
    </div>
  );
};

export default Categories;
