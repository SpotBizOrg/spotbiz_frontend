import React from 'react';
import { FaMapMarkerAlt, FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const BusinessTitlenReview: React.FC = () => {
  return (
    <div className="p-4 flex justify-between items-center mb-4">
      <div>
        <h1 className="text-subheading font-bold text-bluedark">Abans</h1>
        <div className="flex items-center text-gray-800">
          <FaMapMarkerAlt className="mr-1" />
          <p>Colombo 7</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-blue-900 font-bold">Ratings & Reviews</p>
        <div className="flex items-center">
          <span className="text-3xl font-bold text-blue-900">4.3</span>
          <span className="ml-1">out of 5</span>
          <div className="flex ml-2">
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStar className="text-yellow-400" />
            <FaStarHalfAlt className="text-yellow-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessTitlenReview;
