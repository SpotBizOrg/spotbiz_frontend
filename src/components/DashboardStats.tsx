// src/components/DashboardStats.tsx
import React, { useState } from 'react';
import CouponPopup from './CouponPopup';
import { Card } from 'flowbite-react';
import BadgeImg from "../assets/badge.png";

interface DashboardStatsProps{
  subscriberCount: number;
  clicks: number;

}

const DashboardStats: React.FC<DashboardStatsProps> = ({ subscriberCount, clicks }) => {
  const [isCPopupOpen, setIsCPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsCPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsCPopupOpen(false);
  };

  return (
    <div className=" flex relative">
      <div className="flex justify-between  mt-12">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 flex-1">
        <div className="bg-white p-8 rounded shadow-lg shadow-grey text-center flex-col w-full sm:w-60 md:w-80 lg:w-96 flex  justify-center">
          <h2 className="text-xl font-medium">Subscribers</h2>
          <div className="text-3xl font-bold">{subscriberCount}</div>
          <div className="text-gray-500">Total Subscribers</div>
        </div>
        <div className="flex flex-col justify-center bg-white p-8 rounded shadow-lg shadow-grey text-center w-full sm:w-60 md:w-80 lg:w-96">
          <h2 className="text-xl font-medium">Views</h2>
          <div className="text-3xl font-bold">{clicks}</div>
          <div className="text-gray-500">Total Views</div>
        </div>
        <div className="bg-white flex flex-col p-8 rounded shadow-lg shadow-grey w-full sm:w-60 md:w-80 lg:w-96">
        <h3 className="text-xl font-medium">Badges</h3>

        <div className='flex flex-row items-center justify-between'>
        <div className='w-1/2'>
            <img
              src={BadgeImg}
              alt="Badge"
              className="w-20 h-20 mx-auto"
            />
        </div>
            <div className="flex flex-col justify-center  w-1/2">
            <p className="text-md font-medium">Abans</p>

              <p className="text-sm text-gray-500">April 2024</p>
            </div>
        </div>

        </div>
        
        </div>
        
      </div>
      <CouponPopup isOpen={isCPopupOpen} onClose={handleClosePopup} />
    </div>
  );
};

export default DashboardStats;
