import React from "react";
import { useNavigate } from "react-router-dom";

const businesses = [
  {
    name: "Green Earth Initiative",
    owner: "Kusum Senanayake",
    subscription: "free",
  },
  {
    name: "Global Ventures PLC",
    owner: "Chandana Perera",
    subscription: "Moderate",
  },
  {
    name: "Creative Solutions",
    owner: "Rajitha Fernando",
    subscription: "premium",
  },
  // {
  //   name: "Finance Experts Branch",
  //   owner: "Mahesh Kumara",
  //   subscription: "standard",
  // },
];

const LatestBusinesses: React.FC = () => {
  const navigate = useNavigate();
  function navigateToPage() {
    navigate("../admin/businesses");
  }
  return (
    <div className="bg-primary p-6 rounded-lg shadow-lg text-customWhite h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Latest Registered Businesses</h2>
      </div>
      <hr className="border-t border-white opacity-50" />
      <div className="flex justify-around items-center mt-4 gap-4">
        {businesses.map((business, index) => (
          <div key={index} className="text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-white rounded-full mb-2 flex items-center justify-center text-primary text-2xl font-bold">
              {business.name.charAt(0)}
            </div>
            <p className="font-semibold mb-1">{business.name}</p>
            <p className="text-sm mb-1">{business.owner}</p>
            <p className="mt-2 font-semibold">{business.subscription}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-4">
        <button
          className="bg-customBlue text-primary px-4 py-2 rounded-full flex items-center"
          onClick={navigateToPage}
        >
          See More Businesses
        </button>
      </div>
    </div>
  );
};

export default LatestBusinesses;
