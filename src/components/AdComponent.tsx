import React, { useEffect, useState } from 'react';
import ad1 from '../assets/ad1.png';
import ad2 from '../assets/ad2.png';
import ad3 from '../assets/ad3.png';
import ad4 from '../assets/ad4.png';
import ad5 from '../assets/ad5.jpeg';
import ad6 from '../assets/ad6.jpg';

interface AdProps {
    onClose: () => void;
  }
  
  const ads = [
    { imgSrc: ad1, url: 'http://localhost:3000/page1' },
    { imgSrc: ad2, url: 'http://localhost:3000/page2' },
    { imgSrc: ad3, url: 'http://localhost:3000/page3' },
    { imgSrc: ad4, url: 'http://localhost:3000/page3' },
    { imgSrc: ad5, url: 'http://localhost:3000/page3' },
    { imgSrc: ad6, url: 'http://localhost:3000/page3' },
  ];
  
  const AdComponent: React.FC<AdProps> = ({ onClose }) => {
    const [currentAd, setCurrentAd] = useState(ads[0]);
  
    useEffect(() => {
      const randomAd = ads[Math.floor(Math.random() * ads.length)];
      setCurrentAd(randomAd);
    }, []);
  
    return (
      <div className="ad-container fixed inset-0 flex justify-center items-center z-50">
        <div className="relative bg-white p-4 rounded shadow-lg max-w-md w-full">
        
          <button
            onClick={onClose}
            className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-900"
          >
            &times;
          </button>
          <a href={currentAd.url} target="_blank" rel="noopener noreferrer">
            <img
              src={currentAd.imgSrc}
              alt="Ad"
              className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 w-full"
            />
          </a>
        </div>
      </div>
    );
  };
  
  export default AdComponent;

