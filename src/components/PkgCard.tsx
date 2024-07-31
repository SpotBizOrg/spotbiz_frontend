import React from 'react';

interface PkgCardProps {
  onUpgradeClick: () => void;
}

const PkgCard: React.FC<PkgCardProps> = ({ onUpgradeClick }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-3/4 mx-auto mt-8">
      <h2 className="text-lg font-semibold mt-1 mb-5 pl-3">Current Package</h2>
      <div className="text-xl font-bold text-center mb-1">Standard</div>
      <div className="text-3xl font-bold text-center mb-4">
        Rs.300
        <span className="text-sm text-gray-500">/monthly</span>
      </div>
      <hr className="border-gray-300 my-5" />
      <ul className="list-disc list-inside text-bodysmall  space-y-2 mb-4">
        <li>Advertisements & Promotions per week - 3</li>
        <li>Display only basic details about the business</li>
        <li>Interact with customers</li>
      </ul>
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
