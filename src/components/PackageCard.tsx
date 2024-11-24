import React from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';

interface PackageCardProps {
  feature: string;
  price: string;
  listing: string | undefined;
  adsPerWeek: number | string;
  fakeReviews?: boolean;
  recommendation?: boolean;
  messaging?: boolean;
  analytics?: boolean;
  buttonText: string;
  onClick: () => void;
  deleteButton: () => void;
  isPopular?: boolean;
}

const PackageCard: React.FC<PackageCardProps> = ({
  feature,
  price,
  adsPerWeek,
  listing = 'N/A',
  fakeReviews = false,
  recommendation = false,
  messaging = false,
  analytics = false,
  buttonText,
  isPopular = false,
  onClick,
  deleteButton,
}) => {
  return (
    <div className={`flex flex-col p-4 bg-white border-2 border-gray-300 rounded-xl shadow-md transition transform hover:scale-105 duration-300 ${isPopular ? 'border-primary' : 'border-gray-200'}`}>
      {isPopular && <div className="text-sm font-semibold text-gray-500">Most Popular Package</div>}
      <h3 className="mt-2 text-xl font-bold text-gray-900">{feature}</h3>
      <p className="mt-4 text-2xl font-bold text-gray-900">
        {price.split('/')[0]}
        <span className="text-xs font-medium text-gray-500">/month</span>
      </p>
      <p className="mt-2 text-sm text-gray-700">
        <strong>Ads per Week:</strong> {adsPerWeek}
      </p>
      <p className="mt-1 text-sm text-gray-700">
        <strong>Listing:</strong> {listing}
      </p>
      <button
        className="mt-4 w-full rounded-md bg-blue1 text-white hover:bg-bluedark py-2 text-sm font-semibold"
        onClick={onClick}
      >
        {buttonText}
      </button>
      
      <ul className="mt-4 space-y-2 text-sm text-gray-700">
        <li>{analytics ? '✔️ Enabled' : '✖️ Disabled'} Profile Analytics</li>
        <li>{fakeReviews ? '✔️ Enabled' : '✖️ Disabled'} Fake Reviews</li>
        <li>{recommendation ? '✔️ Enabled' : '✖️ Disabled'} Recommendation</li>
        <li>{messaging ? '✔️ Enabled' : '✖️ Disabled'} Messaging</li>
      </ul>

    </div>
  );
};

export default PackageCard;
