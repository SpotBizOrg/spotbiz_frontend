// src/components/Column2.tsx
import React from 'react';
import prom1 from '../assets/prom1.jpg';
import prom2 from '../assets/prom2.png';
import prom3 from '../assets/prom3.jpg';

const Column2: React.FC = () => {
  const handleClick = (keyword: string) => {
    console.log(`Clicked on ${keyword}`);
  };

  return (
    <div className="space-y-4 flex flex-col h-full justify-between">
      <div>
        <h3 className="text-2xl font-bold text-blue-900">Latest Promotions</h3>
        <div className="space-y-2">
          <div 
            className="bg-gray-200 w-full bg-cover rounded-md mb-6"
            style={{ backgroundImage: `url(${prom1})`, height: '450px' }}
          ></div>
        </div>
        <div className="space-y-2">
          <div 
            className="bg-gray-200 w-full bg-cover rounded-md mb-6"
            style={{ backgroundImage: `url(${prom2})`, height: '400px' }}
          ></div>
        </div>
        <div className="space-y-2">
          <div 
            className="bg-gray-200 w-full bg-cover rounded-md mb-6"
            style={{ backgroundImage: `url(${prom3})`, height: '450px' }}
          ></div>
        </div>
      </div>
      <div className="mt-8">
        <h4 className="text-lg font-bold text-blue-900">Keywords</h4>
        <hr className="border-t-2 border-gray-300 my-2" />
        <div className="flex flex-wrap gap-4 text-blue-900 font-semibold">
          {['Electronics', 'Computer', 'Keyboard', 'Phone', 'Laptops', 'Apple'].map(keyword => (
            <div 
              key={keyword} 
              className="bg-gray-200 p-4 rounded-md cursor-pointer flex-auto"
              onClick={() => handleClick(keyword)}
            >
              {keyword}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Column2;
