import React from 'react';

const Navbar: React.FC = () => {
  return (
    <div className="w-full h-16 bg-blue flex items-center justify-between px-4 z-10 fixed top-0 left-0">
      <div className="text-white font-bold">Navbar</div>
      <div className="text-white">Menu Items</div>
    </div>
  );
};

export default Navbar;
