import React from 'react';
import { FaFlag, FaStar } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const MainReview: React.FC = () => {
  const navigate = useNavigate();

  function navigateToPage() {
    navigate('/customer/reviews');
  }

  return (
    <>
      <div className="max-w-sm pl-4 pt-4 pr-4 pb-2 bg-white rounded-lg shadow-md border border-gray-300 text-bodysmall">
        <div className="p-2 border border-gray-400 rounded text-center">
          <p className="font-bold text-bluedark text-bodymedium">Reviews</p>
        </div>
        <div className="mt-4 mb-2">
          <p className="font-semibold text-gray-800">S.A.Edirisinghe</p>
          <div className="flex items-center text-yellow-400">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
        </div>
        <p className="text-gray-700 mb-4">
          The selection of electronics and computers is top-notch and always up-to-date.
        </p>
        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          <span className="text-gray-500 text-body">July 28</span>
          <button
            onClick={navigateToPage}
            className="text-sm bg-gray-800 text-white px-3 py-1 rounded-lg hover:bg-gray-500"
          >
            See more
          </button>
        </div>
        <div className="flex p-2 gap-6 flex-row justify-center text-bodysmall text-gray-600 mt-2">
          <div className="flex flex-row items-center gap-2 cursor-pointer">
            <HiPencilAlt />
            <p>Add</p>
          </div>
          <div className="flex flex-row items-center gap-2 cursor-pointer">
            <FaFlag />
            <p>Report</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainReview;
