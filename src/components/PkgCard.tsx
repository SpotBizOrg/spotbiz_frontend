import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';
import React from 'react';

interface PkgCardProps {
  packageId: number;
  feature: string;
  adsPerWeek: number;
  analytics: boolean;
  fakeReviews: boolean;
  recommendation: boolean;
  messaging: boolean;
  price: number;
  listing: string;
  onUpgradeClick: () => void;
}

const PkgCard: React.FC<PkgCardProps> = ({ 
  onUpgradeClick,
  packageId,
  feature,
  adsPerWeek,
  analytics,
  fakeReviews,
  recommendation,
  messaging,
  price,
  listing


  }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-8 ml-10 w-full">
      <h2 className="text-sm font-semibold mt-1 mb-5 pl-3 text-center">Current Package</h2>
      <h3 className="mt-2 text-xl font-bold text-gray-900 text-center">{feature}</h3>
      {/* <p className="mt-2 text-sm text-gray-500">{description}</p> */}
      <hr className="border-gray-300 my-4" />
      <p className="text-2xl font-bold text-gray-900 text-center">
        {price}
        <span className="text-xs font-medium text-gray-500">/month</span>
      </p>
      <p className='font-semibold text-sm text-center text-gray-500 mt-4'>Features</p>
      <div className='flex items-center justify-center mb-4'>
        <ul className="mt-4 space-y-1 text-sm text-gray-700 list-disc list-inside">
          <li className="flex items-center text-left">
            {adsPerWeek}
            <span className="ml-2 font-semibold">Ads & Promos per week</span>
          </li>
          <li className="flex items-center text-left">
            {analytics == false ? <XMarkIcon className="w-4 h-4 text-red-500" aria-hidden="true" />:<CheckIcon className="w-4 h-4 text-blue1" aria-hidden="true" />}
            {analytics == false && <span className="ml-2 font-semibold">Profile analytics</span>}
            {analytics == true && <span className="ml-2 font-semibold">Profile analytics</span>}
            {/* {analytics == 't && <span className="ml-2 font-semibold">Profile analytics</span>} */}
          </li>
          <li className="flex items-center text-left">
            {fakeReviews == false ? <XMarkIcon className="w-4 h-4 text-red-500" aria-hidden="true" />:<CheckIcon className="w-4 h-4 text-blue1" aria-hidden="true" />}
            <span className="ml-2 font-semibold">Report Fake reviews</span>
          </li>
          <li className="flex items-center text-left">
            {recommendation == false ? <XMarkIcon className="w-4 h-4 text-red-500" aria-hidden="true" />:<CheckIcon className="w-4 h-4 text-blue1" aria-hidden="true" />}
            <span className="ml-2 font-semibold">Customer Recommondation</span>
          </li>
          <li className="flex items-center text-left">
            {messaging == false ? <XMarkIcon className="w-4 h-4 text-red-500" aria-hidden="true" />:<CheckIcon className="w-4 h-4 text-blue1" aria-hidden="true" />}
            <span className="ml-2 font-semibold">Interact with customers</span>
          </li>
          <li className="flex items-center text-left">
            <CheckIcon className="w-4 h-4 text-blue1" aria-hidden="true" />
            <span className="ml-2 font-semibold">{listing} Listing </span>
          </li>
        </ul>
      </div>
      <div className="flex justify-center">
        <button
          className="bg-bluedark text-white py-3 px-4 rounded-full hover:bg-black"
          onClick={onUpgradeClick} // Call the onUpgradeClick function when the button is clicked
        >
          Upgrade the Package
        </button>
      </div>
    </div>
  );
};

export default PkgCard;
