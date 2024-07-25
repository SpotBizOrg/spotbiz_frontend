import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import Customernavbar from '../components/Customernavbar';
import CategoriesCard from '../components/CategoriesCard';
import { Container } from '@mui/material';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults: React.FC = () => {
  const query = useQuery().get('query');

  return (
    <Container>

{/* <div className="min-h-screen bg-gray-100"> */}
      <Customernavbar />
      {/* <div className="pt-20 p-10">  */}
      <div className="flex flex-col justify-start items-center pt-28 px-20 w-full">
          <div className="w-5/6"> 
            <h1 className="text-3xl font-bold mb-1 pt-4">Search for "{query}"</h1>
            <p className="text-gray-700 mb-6 pt-1">500 Search results</p>
            <div className="flex items-center mb-10">
              <span className="text-gray-700 font-bold mr-20 ml-10">Filter by:</span>
              <button className="bg-yellow-200 text-gray-700 px-8 py-1 rounded-full flex items-center mr-10">
                Categories <FaChevronDown className="ml-3 mt-1 text-gray-600" />
              </button>
              <button className="bg-yellow-200 text-gray-700 px-8 py-1 rounded-full flex items-center mr-10">
                Location <FaChevronDown className="ml-3 mt-1 text-gray-600" />
              </button>
              <button className="bg-yellow-200 text-gray-700 px-8 py-1 rounded-full flex items-center">
                Ratings <FaChevronDown className="ml-3 mt-1 text-gray-600" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-10 ml-10">
              <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col items-center w-72">
                <img src="https://abansgroup.com/wp-content/uploads/2022/05/Brand%20Finance%20ranking%20Large.png" alt="Abans" className="mb-4 rounded w-full" />
                <div className="bg-gray-100 p-4 w-full text-center rounded-b-lg">
                  <h2 className="text-xl font-bold text-gray-900">Abans - Panadura</h2>
                  <p className="text-gray-700">672, Galle Road, Panadura</p>
                  <p className="text-gray-700">0777456722</p>
                  <p className="text-blue-500">www.abans.com</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col items-center w-72">
                <img src="https://findit-resources.s3.us-east-2.amazonaws.com/account/profilePictures/1623042343123.jpg" alt="Dealz" className="mb-4 rounded w-full" />
                <div className="bg-gray-100 p-4 w-full text-center rounded-b-lg">
                  <h2 className="text-xl font-bold text-gray-900">Dealz</h2>
                  <p className="text-gray-700">The Future Bargain</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col items-center w-72">
                <img src="https://abansgroup.com/wp-content/uploads/2022/05/Brand%20Finance%20ranking%20Large.png" alt="Abans" className="mb-4 rounded w-full" />
                <div className="bg-gray-100 p-4 w-full text-center rounded-b-lg">
                  <h2 className="text-xl font-bold text-gray-900">Abans - Panadura</h2>
                  <p className="text-gray-700">672, Galle Road, Panadura</p>
                  <p className="text-gray-700">0777456722</p>
                  <p className="text-blue-500">www.abans.com</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col items-center w-72">
                <img src="https://abansgroup.com/wp-content/uploads/2022/05/Brand%20Finance%20ranking%20Large.png" alt="Abans" className="mb-4 rounded w-full" />
                <div className="bg-gray-100 p-4 w-full text-center rounded-b-lg">
                  <h2 className="text-xl font-bold text-gray-900">Abans - Panadura</h2>
                  <p className="text-gray-700">672, Galle Road, Panadura</p>
                  <p className="text-gray-700">0777456722</p>
                  <p className="text-blue-500">www.abans.com</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col items-center w-72">
                <img src="https://findit-resources.s3.us-east-2.amazonaws.com/account/profilePictures/1623042343123.jpg" alt="Dealz" className="mb-4 rounded w-full" />
                <div className="bg-gray-100 p-4 w-full text-center rounded-b-lg">
                  <h2 className="text-xl font-bold text-gray-900">Dealz</h2>
                  <p className="text-gray-700">The Future Bargain</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col items-center w-72">
                <img src="https://findit-resources.s3.us-east-2.amazonaws.com/account/profilePictures/1623042343123.jpg" alt="Dealz" className="mb-4 rounded w-full" />
                <div className="bg-gray-100 p-4 w-full text-center rounded-b-lg">
                  <h2 className="text-xl font-bold text-gray-900">Dealz</h2>
                  <p className="text-gray-700">The Future Bargain</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/6 ml-10 pt-11 sticky top-0">
            <CategoriesCard />
          </div>
        </div>


    </Container>

  );
};

export default SearchResults;
