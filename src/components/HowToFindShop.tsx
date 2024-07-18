import React from 'react';
import shopImage from '../assets/shop.png'; // Ensure you have this image in the correct path

const HowToFindShop = () => {
  return (
    <div className="container mx-auto my-8 p-8 bg-yellow-100 rounded-lg shadow flex flex-col md:flex-row items-center">
      <div className="flex-1 mb-4 md:mb-0">
        <h2 className="text-xl font-semibold mb-4">How to Find a Shop and their offers at SpotBizz ?</h2>
        <ul className="list-disc list-inside space-y-2 text-lg">
          <li>Go to SpotBizz website or download the SpotBizz mobile app</li>
          <li>Find the shops by searching</li>
          <li>Get updated about their latest offers and discounts</li>
          <li>Play games and earn points</li>
        </ul>
      </div>
      <div className="flex-shrink-0 md:ml-8">
        <img src={shopImage} alt="How to find a shop" className="h-32 w-32"/>
      </div>
    </div>
  );
};

export default HowToFindShop;
