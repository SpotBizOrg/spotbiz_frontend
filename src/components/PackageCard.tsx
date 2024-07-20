import React from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';

interface PackageCardProps {
  key: number;
  title: string;
  description: string;
  price: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
}

const PackageCard: React.FC<PackageCardProps> = ({ key, title, description, price, features, buttonText, isPopular = false }) => {
  return (
    <div className={`flex flex-col p-10 bg-white border-2 rounded-2xl shadow-md ${isPopular ? 'border-purple-500' : 'border-gray-200'}`} key={key}>
      {isPopular && <div className="text-sm font-semibold text-purple-600">Most popular</div>}
      <h3 className="mt-2 text-2xl font-bold text-gray-900">{title}</h3>
      <p className="mt-4 text-base text-gray-500">{description}</p>
      <p className="mt-4 text-3xl font-bold text-gray-900">{price}<span className="text-base font-medium text-gray-500">/month</span></p>
      <button
        className={`mt-6 w-full rounded-md bg-purple-600 py-2 text-sm font-semibold text-white hover:bg-purple-500`}
      >
        {buttonText}
      </button>
      <ul className="mt-8 space-y-3 text-sm text-gray-700">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <CheckIcon className="w-5 h-5 text-purple-500" aria-hidden="true" />
            <span className="ml-3">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PackageCard;
