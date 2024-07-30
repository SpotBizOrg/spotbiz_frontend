import React from 'react';
import { FaMapMarkerAlt, FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const BusinessTitlenReview: React.FC = () => {
  return (
    <div className="bg-white border border-gray-300 p-4 rounded-md shadow-md space-y-2 mb-5 flex justify-between items-center px-10">
      <div>
        <h1 className="text-subheading font-bold text-bluedark">Abans</h1>
        <div className="flex items-center text-gray-800 mb-3">
          <FaMapMarkerAlt className="mr-1" />
          <p>Colombo 7</p>
        </div>
        <button className="border border-green-500 text-green-500 font-bold px-4 py-1 rounded-md  text-bodysmall mb-2">Open Now</button>

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
