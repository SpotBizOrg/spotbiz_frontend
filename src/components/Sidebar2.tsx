import React from 'react';

const Sidebar2: React.FC = () => {
  return (
    <div className="w-1/6 h-full bg-bluedark flex flex-col p-4 text-white fixed z-0">
      <div className="font-bold text-lg mb-4">Sidebar</div>
      <div className="flex-1">Menu Items</div>
    </div>
  );
};

export default Sidebar2;
