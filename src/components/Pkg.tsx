// src/components/PackageCard.tsx
import React from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';

interface PackageCardProps {
  title: string;
  description: string;
  price: string;
  features: { [key: string]: string | number };
  isPopular?: boolean;
}

const PackageCard: React.FC<PackageCardProps> = ({
  title,
  description,
  price,
  features,
  isPopular = false,
}) => {
  return (
    <div className={`flex flex-col p-4 bg-white border-2 rounded-xl shadow-md transition transform hover:scale-105 duration-300 ${isPopular ? 'border-primary' : 'border-gray-200'}`}>
      {isPopular && <div className="text-sm font-semibold text-gray-500">Most Popular Package</div>}
      <h3 className="mt-2 text-xl font-bold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
      <hr className="border-gray-300 my-4" />
      <p className="text-2xl font-bold text-gray-900">
        {price.split('/')[0]}
        <span className="text-xs font-medium text-gray-500">/month</span>
      </p>
      <ul className="mt-4 space-y-1 text-sm text-gray-700">
        {Object.entries(features).map(([feature, value], index) => (
          <li key={index} className="flex items-center text-left">
            {value === '❌' ? (
              <>
                <XMarkIcon className="w-4 h-4 text-red-500" aria-hidden="true" />
                <span className="ml-2 font-semibold">{feature}</span>
              </>
            ) : value === '✅' ? (
              <>
                <CheckIcon className="w-4 h-4 text-blue1" aria-hidden="true" />
                <span className="ml-2 font-semibold">{feature}</span>
              </>
            ) : (
              <>
                <CheckIcon className="w-4 h-4 text-blue1" aria-hidden="true" />
                <span className="ml-2 font-semibold">{feature}: {value}</span>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PackageCard;
