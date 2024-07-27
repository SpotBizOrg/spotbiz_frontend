// src/components/Business.tsx
import React from 'react';
import Column1 from './Column1';
import Column2 from './Column2';
import Column3 from './Column3';

const Business: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 pt-12"> {/* Added padding-top */}
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Column1 />
          <Column2 />
          <Column3 />
        </div>
      </div>
    </div>
  );
};

export default Business;
