import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="w-1/6 z-40 bg-gray-800 h-full flex flex-col p-4 text-white fixed">
      <div className="font-bold text-lg mb-4">Sidebar</div>
      <div className="flex-1">Menu Items</div>
    </div>
  );
};

export default Sidebar;
