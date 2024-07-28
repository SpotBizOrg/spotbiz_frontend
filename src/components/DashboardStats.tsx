// src/components/DashboardStats.tsx
import React, { useState } from 'react';
import CouponPopup from './CouponPopup';

const DashboardStats: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mt-12 ml-9">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 flex-1">
        <div className="bg-white p-8 rounded shadow-lg shadow-grey text-center w-full sm:w-60 md:w-80 lg:w-96">
          <h2 className="text-xl font-medium">Subscribers</h2>
          <div className="text-3xl font-bold">10,000</div>
          <div className="text-gray-500">Total Subscribers</div>
        </div>
        <div className="bg-white p-8 rounded shadow-lg shadow-grey text-center w-full sm:w-60 md:w-80 lg:w-96">
          <h2 className="text-xl font-medium">Views</h2>
          <div className="text-3xl font-bold">500,000</div>
          <div className="text-gray-500">Total Views</div>
        </div>
        </div>
        <button
          onClick={handleOpenPopup}
          className="bg-black text-white py-3 px-5 rounded shadow mr-7 text-center"
        >
          <span className="block">Check Coupon</span>
          <span className="block">Code</span>
        </button>
      </div>
      <CouponPopup isOpen={isPopupOpen} onClose={handleClosePopup} />
    </div>
  );
};

export default DashboardStats;
