import React from 'react';

const Recommendations = () => {
  return (
    <div className="container mx-auto my-8">
      <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-200 h-40"></div>
        <div className="bg-gray-200 h-40"></div>
        <div className="bg-gray-200 h-40"></div>
      </div>
    </div>
  );
};

export default Recommendations;
