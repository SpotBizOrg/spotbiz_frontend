import React from "react";
import { FaStar } from "react-icons/fa";
import AbansImage from '../assets/Abans.png';

const RecommendationBox: React.FC = () => {
  return (
    <div className="max-w-xs bg-customYellow2 rounded-custom shadow-lg overflow-hidden">
      <img src={AbansImage} alt="Abans" className="w-full h-32 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold text-primary">Abans Panadura</h3>
        <div className="flex items-left text-yellow-500 mb-2">
          {[...Array(4)].map((_, i) => (
            <FaStar key={i} />
          ))}
          <FaStar className="text-gray-300" />
        </div>
        <p className="text-gray-700 mb-2">
          532, A, B Galle Road, <br />
          0777456732
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-2 py-1 rounded">electronics</span>
          <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-2 py-1 rounded">computer</span>
        </div>
      </div>
    </div>
  );
};

export default RecommendationBox;
