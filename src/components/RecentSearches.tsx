import React from 'react';

const searches = [
  'Computer', 'Laptop', '5 star hotels', 'Books', 'Pens', 
  'Mouse', 'Keyboard'
];

const RecentSearches = () => {
  return (
    <div className="container mx-auto my-8 p-4">
      {/* <h2 className="text-xl font-semibold mb-4">Recent Searches</h2> */}
      <div className="flex flex-wrap gap-2">
        {searches.map((search, index) => (
          <div
            key={index}
            className={`px-4 py-2 rounded-full border border-blue-500 text-blue-500 bg-white`}
          >
            {search}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;
