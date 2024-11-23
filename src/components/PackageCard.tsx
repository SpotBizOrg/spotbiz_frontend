import React from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';

interface PackageCardProps {
  feature: string;
  price: string;
  adsPerWeek: number;
  fakeReviews?: boolean;
  recommendation?: boolean;
  messaging?: boolean;
  analytics?: boolean;
  buttonText: string;
  onClick: () => void;
  isActive?: boolean;
  listing?: string;
}

const PackageCard: React.FC<PackageCardProps> = ({
  feature,
  price,
  adsPerWeek,
  fakeReviews = false,
  recommendation = false,
  messaging = false,
  analytics = false,
  buttonText,
  isActive = false,
  listing,
  onClick,
}) => {
  return (
    <div className={`flex flex-col p-4 bg-white border-2 border-gray-300 rounded-xl shadow-md transition transform hover:scale-105 duration-300 ${isActive ? 'border-primary' : 'border-gray-200'}`}>
      {isActive && <div className="text-sm font-semibold text-gray-500">Most Popular Package</div>}
      <h3 className="mt-2 text-xl font-bold text-gray-900">{feature}</h3>
      <p className="mt-4 text-2xl font-bold text-gray-900">
        {price.split('/')[0]}
        <span className="text-xs font-medium text-gray-500">/month</span>
      </p>
      <button
        className="mt-4 w-full rounded-md bg-blue1 text-white hover:bg-bluedark py-2 text-sm font-semibold"
        onClick={onClick}
      >
        {buttonText}
      </button>
      <ul className="mt-4 space-y-1 text-sm text-gray-700">
        <li>Ads Per Week: {adsPerWeek}</li>
        <li>
          Profile Analytics: {analytics ? <CheckIcon className="w-4 h-4 text-blue1" /> : <XMarkIcon className="w-4 h-4 text-red-500" />}
        </li>
        <li>
          Fake Reviews: {fakeReviews ? <CheckIcon className="w-4 h-4 text-blue1" /> : <XMarkIcon className="w-4 h-4 text-red-500" />}
        </li>
        <li>
          Recommendation: {recommendation ? <CheckIcon className="w-4 h-4 text-blue1" /> : <XMarkIcon className="w-4 h-4 text-red-500" />}
        </li>
        <li>
          Messaging: {messaging ? <CheckIcon className="w-4 h-4 text-blue1" /> : <XMarkIcon className="w-4 h-4 text-red-500" />}
        </li>
      </ul>
    </div>
  );
};

export default PackageCard;
