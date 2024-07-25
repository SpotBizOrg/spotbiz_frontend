import React from 'react';
import PackageCard from './PackageCard';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const packagesData = [
  {
    id: 1,
    title: 'Free',
    description: 'Get started with basic features for small businesses.',
    monthlyPrice: 0,
    features: {
      'Advertisements & promotions per week': 1,
      'Display business details to customer': '❌',
      'Profile analytics': '❌',
      'Interact with customers': '❌'
    },
    buttonText: 'Upgrade Plan',
  },
  {
    id: 2,
    title: 'Standard',
    description: 'A suitable plan for growing businesses with essential features.',
    monthlyPrice: 300,
    features: {
      'Advertisements & promotions per week': 3,
      'Display business details to customer': 'Only basic details',
      'Profile analytics': '❌',
      'Interact with customers': '✅'
    },
    buttonText: 'Purchased',
    isPopular: true,
  },
  {
    id: 3,
    title: 'Moderate',
    description: 'Comprehensive plan including advanced features and extended support.',
    monthlyPrice: 500,
    features: {
      'Advertisements & promotions per week': 5,
      'Display business details to customer': 'All excluding business hours',
      'Profile analytics': 'Only reviews',
      'Interact with customers': '✅'
    },
    buttonText: 'Upgrade Plan',
  },
  {
    id: 4,
    title: 'Premium',
    description: 'The ultimate plan for businesses needing full access and premium support.',
    monthlyPrice: 1000,
    features: {
      'Advertisements & promotions per week': 7,
      'Display business details to customer': 'All',
      'Profile analytics': 'Visit count and reviews',
      'Interact with customers': '✅'
    },
    buttonText: 'Upgrade Plan',
  },
];

const Popup: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed font-body inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
      <div className="bg-white p-8 rounded-md shadow-lg w-5/6">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-xl font-bold">&times;</button>
        </div>
        <div className="mt-2">
          <p className="text-subsubheading ">Subscription Plans</p>
          <div className="mt-16 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {packagesData.map((pkg) => (
              <PackageCard
                key={pkg.id}
                title={pkg.title}
                description={pkg.description}
                price={"Rs. " + pkg.monthlyPrice.toString()}
                features={pkg.features}
                buttonText={pkg.buttonText}
                isPopular={pkg.isPopular}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;

