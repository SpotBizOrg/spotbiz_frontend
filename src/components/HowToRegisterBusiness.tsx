import React from 'react';
import registerImage from '../assets/register.png'; // Ensure you have this image in the correct path

const HowToRegisterBusiness = () => {
  return (
    <div className="container mx-auto my-8 p-8 bg-yellow-400 rounded-lg shadow flex flex-col md:flex-row items-center">
      <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-8">
        <img src={registerImage} alt="How to register your business" className="h-32 w-32"/>
      </div>
      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-4">How to Register your Business at SpotBizz ?</h2>
        <ul className="list-disc list-inside space-y-2 text-lg">
          <li>Go to SpotBizz website or download the SpotBizz mobile app</li>
          <li>Register your shop at the relevant category</li>
          <li>Publish your latest offers and discounts</li>
          <li>Buy packages for more services</li>
          <li>Boost your business at SpotBizz</li>
        </ul>
      </div>
    </div>
  );
};

export default HowToRegisterBusiness;
