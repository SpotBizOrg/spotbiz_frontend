// import React from 'react';
// import { CheckIcon } from '@heroicons/react/20/solid';

// interface PackageCardProps {
//   title: string;
//   description: string;
//   price: string;
//   features: string[];
//   buttonText: string;
//   isPopular?: boolean;
//   onClick?: () => void; // Make onClick optional
// }

// const PackageCard: React.FC<PackageCardProps> = ({ title, description, price, features, buttonText, isPopular = false, onClick }) => {
//   return (
//     <div className={`flex flex-col p-10 bg-white border-2 rounded-2xl shadow-md ${isPopular ? 'border-primary' : 'border-gray-200'}`}>
//       {isPopular && <div className="text-sm font-semibold text-primary">Current Plan</div>}
//       <h3 className="mt-2 text-2xl font-bold text-gray-900">{title}</h3>
//       <p className="mt-4 text-base text-gray-500">{description}</p>
//       <p className="mt-4 text-3xl font-bold text-gray-900">{price}<span className="text-base font-medium text-gray-500">/month</span></p>
//       <button
//         className={`mt-6 w-full rounded-md bg-blue1 py-2 text-sm font-semibold text-white hover:bg-blue5`}
//         onClick={onClick} // Attach onClick if provided
//       >
//         {buttonText}
//       </button>
//       <ul className="mt-8 space-y-3 text-sm text-gray-700">
//         {features.map((feature, index) => (
//           <li key={index} className="flex items-center">
//             <CheckIcon className="w-5 h-5 text-blue1" aria-hidden="true" />
//             <span className="ml-3">{feature}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default PackageCard;

import React from 'react';
import { CheckIcon, XMarkIcon  } from '@heroicons/react/20/solid';

interface PackageCardProps {
  title: string;
  description: string;
  price: string;
  features: { [key: string]: string | number };
  buttonText: string;
  isPopular?: boolean;
  onClick?: () => void; // Make onClick optional
}

const PackageCard: React.FC<PackageCardProps> = ({ title, description, price, features, buttonText, isPopular = false, onClick }) => {
  return (
    <div className={`flex flex-col p-10 bg-white border-2 rounded-2xl shadow-md transition transform hover:scale-105 duration-300  ${isPopular ? 'border-primary' : 'border-gray-200'}`}>
      {isPopular && <div className="text-sm font-semibold text-primary">Current Plan</div>}
      <h3 className="mt-2 text-2xl font-bold text-gray-900">{title}</h3>
      <p className="mt-4 text-base text-gray-500">{description}</p>
      <p className="mt-4 text-3xl font-bold text-gray-900">{price}<span className="text-base font-medium text-gray-500">/month</span></p>
      <button
        className={`mt-6 w-full rounded-md  ${isPopular ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue1 text-white hover:bg-blue5 '} py-2 text-sm font-semibold text-white `}
        onClick={onClick} // Attach onClick if provided
      >
        {buttonText}
      </button>
      <ul className="mt-8 space-y-3 text-sm text-gray-700">
      {Object.entries(features).map(([feature, value], index) => (
          <li  key={index} className="flex items-center text-left">
            {value === "❌" ? (
              <>
                <XMarkIcon className="w-5 h-5 text-red-500" aria-hidden="true" />
                <span className="ml-3 font-semibold">{feature}</span>
              </>
            ) : value === "✅" ? (
              <>
                <CheckIcon className="w-5 h-5 text-blue1" aria-hidden="true" />
                <span className="ml-3 font-semibold">{feature}</span>
              </>
            ) : (
              <>
              <CheckIcon className="w-5 h-5 text-blue1" aria-hidden="true" />
              <span className="ml-3 font-semibold">{feature}: {value}</span>
              </>
              
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PackageCard;

