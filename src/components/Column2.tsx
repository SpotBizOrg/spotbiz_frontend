// src/components/Column2.tsx
import React from 'react';
import prom1 from '../assets/prom1.jpg';
import prom2 from '../assets/prom2.png';
import prom3 from '../assets/prom3.jpg';

const Column2: React.FC = () => {
  const handleClick = (keyword: string) => {
    console.log(`Clicked on ${keyword}`);
  };

  const images = [
    { src: prom1, date: new Date('2023-07-01'), aspectRatio: '100%', title: "Mega Stock Clearance Sale!" },
    { src: prom2, date: new Date('2023-07-15'), aspectRatio: '100%', title: "Abans Home Kitchen Baking Champion" },
    { src: prom3, date: new Date('2023-07-20'), aspectRatio: '100%', title: "Newest Arrival!" },
  ];

  const calculateTimePassed = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    const diffWeeks = Math.floor(diffDays / 7);
    return diffWeeks === 1 ? '1 week ago' : `${diffWeeks} weeks ago`;
  };

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="p-2 border border-gray-400 rounded text-center mb-10">
          <p className="font-bold text-bluedark text-bodymedium">Latest Promotions</p>
        </div>
        <div className="space-y-4">
          {images.map((image, index) => (
            <div key={index} className="space-y-2 bg-white shadow-md border border-gray-300 rounded-lg p-8">
              <p className='text-subsubheading'>{image.title}</p>
              <p className="text-end text-gray-600 text-bodysmall">{calculateTimePassed(image.date)}</p>

              <div
                className="relative bg-cover rounded-md mb-2"
                style={{
                  backgroundImage: `url(${image.src})`,
                  paddingBottom: image.aspectRatio,
                  height: 0,
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10">
      <div className="p-2 border border-gray-400 rounded text-center mb-4">
                <p className="font-bold text-bluedark text-bodymedium">Keywords</p>
            </div>
        <div className="flex flex-wrap gap-4 text-blue-900 text-bodysmall font-semibold">
          {['Electronics', 'Computer', 'Keyboard', 'Phone', 'Laptops', 'Apple'].map((keyword) => (
            <div
              key={keyword}
              className="bg-blue9 text-wrap p-2 rounded-full cursor-pointer flex-auto text-center"
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
