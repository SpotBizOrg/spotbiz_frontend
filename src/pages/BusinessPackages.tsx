// src/pages/BusinessPackages.tsx

import React from 'react';
import Businessnavbar from '../components/Businessnavbar';
import Businesssidebar from '../components/Businesssidebar';

const Packages: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Businessnavbar />
      <div className="flex flex-1">
        <Businesssidebar />
        <main className="flex-1 bg-gray-100 p-8">
          <h1 className="text-4xl font-bold">Our Packages</h1>
          <p className="mt-4">Here is a list of packages we offer...</p>
          {/* Add your content here */}
        </main>
      </div>
    </div>
  );
};

export default Packages;
