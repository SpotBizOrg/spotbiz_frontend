import React from 'react';
import RecommendationBox from "../components/RecommendationBox";

const Recommendations = () => {
  return (
    <div className="container mx-auto my-8">
      <h2 className="text-subsubheading font-semibold mb-4">Recommendations</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <RecommendationBox /> {/* Add the new component here */}
            <RecommendationBox /> {/* Add more as needed */}
            <RecommendationBox /> {/* Add more as needed */}
          </div>
    </div>
  );
};

export default Recommendations;
