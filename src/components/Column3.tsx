// src/components/Column3.tsx
import React from 'react';
import { FaStar } from 'react-icons/fa';
import map from '../assets/map.png';

const Column3: React.FC = () => {
  return (
    <div className="space-y-4">
      <h4 className="text-xl font-bold text-blue-900">Rating and Reviews</h4>
      <p className="font-bold text-3xl">4.3 </p><p>out of 5</p>
      <div className="space-y-1">
        {[5, 4, 3, 2, 1].map(stars => (
          <div key={stars} className="flex items-center space-x-2">
            <div className="flex">
              {Array.from({ length: stars }).map((_, i) => (
                <FaStar key={i} className="text-yellow-500" />
              ))}
            </div>
            <div className="bg-gray-200 h-2 flex-1 rounded-md">
              <div className="bg-blue-500 h-full" style={{ width: `${stars * 20}%` }}></div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white p-4 rounded-md shadow-md">
        <h5 className="font-bold text-blue-900">About Us</h5>
        <p>Group of Companies has been built through entrepreneurial spirit and an authentic sense of empathy for our customers. Over 50 years ago, Mrs. Aban Pestonjee began this journey from humble beginnings, ...</p>
      </div>
      <div className="bg-white p-4 rounded-md shadow-md">
        <h5 className="font-bold text-blue-900">Location</h5>
        <div 
          className="bg-gray-200 w-full bg-cover rounded-md relative"
          style={{ backgroundImage: `url(${map})`, height: '300px' }}
        >
          <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-200 border border-blue-500 text-blue-700 px-4 py-2 rounded-md font-semibold">
            Explore using app
          </button>
        </div>
      </div>
      <div className="bg-white p-4 rounded-md shadow-md">
        <h5 className="font-bold">Opening Time</h5>
        <p>Open Hours : 10:00am - 5:00pm</p>
      </div>
    </div>
  );
};

export default Column3;
