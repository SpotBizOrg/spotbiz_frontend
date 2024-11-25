// src/components/PackageCard.tsx
import React from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';
import Button from './Button';

interface PackageCardProps {
  feature: string;
  adPerWeek: number;
  price: string;
  analytics: boolean;
  fakeReviews: boolean;
  listing: string;
  messaging: boolean;
  recommondation: boolean;
  isActive?: boolean;
  selectOption?: () => void;
}

const PackageCard: React.FC<PackageCardProps> = ({
  feature,
  adPerWeek,
  price,
  analytics,
  fakeReviews,
  listing,
  messaging,
  recommondation,
  isActive = false,
  selectOption

}) => {

  return (
    <div className={`flex flex-col p-4 bg-white border-2 rounded-xl shadow-md transition transform hover:scale-105 duration-300 ${isActive ? 'border-primary' : 'border-gray-200'}`}>
      {isActive && <div className="text-sm font-semibold text-gray-500">Activated</div>}
      <h3 className="mt-2 text-xl font-bold text-gray-900">{feature}</h3>
      {/* <p className="mt-2 text-sm text-gray-500">{description}</p> */}
      <hr className="border-gray-300 my-4" />
      <p className="text-2xl font-bold text-gray-900">
        {price}
        <span className="text-xs font-medium text-gray-500">/month</span>
      </p>
      <p className='font-semibold text-sm text-gray-500 mt-4'>Features</p>
      <ul className="mt-4 space-y-1 text-sm text-gray-700 list-disc list-inside">
        <li className="flex items-center text-left">
          {adPerWeek}
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
          {recommondation == false ? <XMarkIcon className="w-4 h-4 text-red-500" aria-hidden="true" />:<CheckIcon className="w-4 h-4 text-blue1" aria-hidden="true" />}
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
      <div className='flex flex-row items-center mt-4 justify-center'>
        {/* {!isActive &&<button className='items-center justify-center bg-bluedark flex p-2 text-sm text-white rounded-md w-5/6' >Buy</button>} */}
        {!isActive &&<button onClick={selectOption} className='items-center justify-center bg-bluedark flex p-2 text-sm text-white rounded-md w-5/6' >Buy</button>}
        {isActive &&<button className='items-center justify-center bg-gray-800 flex p-2 text-sm text-white rounded-md w-5/6' disabled >Actiavated</button>}
      </div>
    </div>
  );
};

export default PackageCard;
