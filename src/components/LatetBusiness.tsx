import React from 'react';

const businesses = [
  { name: 'Business One', owner: 'John Doe', subscription: 'free' },
  { name: 'Business Two', owner: 'Jane Smith', subscription: 'premium' },
  { name: 'Business Three', owner: 'Alice Johnson', subscription: 'premium' },
  { name: 'Business Four', owner: 'Bob Brown', subscription: 'standard' },
];

const LatestBusinesses: React.FC = () => {
  return (
    <div className="bg-primary p-6 rounded-lg shadow-lg text-customWhite">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Latest Registered Businesses</h2>
        {/* <button className="bg-green-500 text-white p-2 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 9.293a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L13 11.414V17a1 1 0 11-2 0v-5.586l-4.293 4.293a1 1 0 01-1.414-1.414l5-5z" clipRule="evenodd" />
          </svg>
        </button> */}
      </div>
      <hr className="border-t border-white opacity-50" />
      <div className="flex justify-around items-center mt-4">
        {businesses.map((business, index) => (
          <div key={index} className="text-center">
            <div className="w-16 h-16 bg-white rounded-full mx-auto mb-2 flex items-center justify-center text-primary text-2xl font-bold">
              {business.name.charAt(0)}
            </div>
            <p className="font-semibold">{business.owner}</p>
            <p className="text-sm">{business.name}</p>
            <p className="mt-2 font-semibold">{business.subscription}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-4">
        <button className="bg-customBlue text-primary px-4 py-2 rounded-full flex items-center">
          See More Businesses
        </button>
      </div>
    </div>
  );
};

export default LatestBusinesses;
