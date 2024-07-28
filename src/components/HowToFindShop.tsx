import React from 'react';
import ShopImage from '../assets/Untitled design-7.png'; // Ensure this image path is correct

const HowToFindShop = () => {
  return (
    <div className="flex items-center bg-blue10 p-8 rounded-custom3 shadow-lg mx-4 md:mx-8 lg:mx-16">
      <div className="mr-8 text-left">
        <h2 className="text-3xl font-bold mb-4">How to Find a Shop and their offers at SpotBizz?</h2>
        <p className="text-lg mb-6">
          Discover a variety of shops and their exclusive offers on SpotBizz. 
          Here's how you can find them:
        </p>
        <ul className="list-disc list-inside text-lg space-y-2">
          <li>Go to SpotBizz website or download the SpotBizz mobile app</li>
          <li>Search for shops by category or location</li>
          <li>Stay updated on their latest offers and discounts</li>
          <li>Engage with games and earn points</li>
        </ul>
        <button className="bg-green-500 text-white py-2 px-6 rounded-full text-lg mt-4">
          Explore Now
        </button>
      </div>
      <img src={ShopImage} alt="How to find a shop" className="w-1/3 h-auto" />
    </div>
  );
};

export default HowToFindShop;
