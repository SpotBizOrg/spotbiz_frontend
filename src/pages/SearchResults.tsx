import React, { ReactElement, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import Customernavbar from '../components/Customernavbar';
import CategoriesCard from '../components/CategoriesCard';
import Container from '../components/Container';
import SortByDropdown from '../components/SortBy';
import CategoryPills from '../components/CategoryPills';
import { Button } from 'flowbite-react';
import NearMeBtn from '../components/NearMeBtn';
import { SearchPagination } from '../components/SearchPagePagination';
import { Rating, RatingStar } from "flowbite-react";
import { Badge } from "flowbite-react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};


const starCountOptions = [
  "5 Star Reviews",
  "4 Star Reviews",
  "3 Star Reviews",
  "2 Star Reviews",
  "1 Star Reviews",
];

const handleSelectOption = (option: string) => {
  // setSelectedOption(option);
  // Handle whatever logic you need here based on the selected option
};

const SearchResults: React.FC = () => {
  const query = useQuery().get('query');


  return (
    <Container>

{/* <div className="min-h-screen bg-gray-100"> */}
      <Customernavbar />
      {/* <div className="pt-20 p-10">  */}
      <div className="flex flex-col justify-start px-20 mt-20 pt-5 w-full">
          <div className="w-full"> 
            <div className='flex flex-row justify-center'>
              <CategoryPills/>
            </div>
            <h1 className="text-3xl font-bold mb-1 pt-4">Search for "{query}"</h1>
            <p className="text-gray-700 mb-6 pt-1">500 Search results</p>
            {/* <div className="flex items-center mb-10">
              <span className="text-gray-700 font-bold mr-20">Filter by:</span>
              <button className="bg-yellow-200 text-gray-700 px-8 py-1 rounded-full flex items-center mr-10">
                Categories <FaChevronDown className="ml-3 mt-1 text-gray-600" />
              </button>
              <button className="bg-yellow-200 text-gray-700 px-8 py-1 rounded-full flex items-center mr-10">
                Location <FaChevronDown className="ml-3 mt-1 text-gray-600" />
              </button>
              <button className="bg-yellow-200 text-gray-700 px-8 py-1 rounded-full flex items-center">
                Ratings <FaChevronDown className="ml-3 mt-1 text-gray-600" />
              </button>
            </div> */}
            <div className="sticky top-4 p-4 space-y-4 md:space-y-0 md:space-x-4 flex flex-wrap md:flex-nowrap justify-start mb-6 bg-gray-100 -ml-10 pl-10 -mr-10">
              <div className="flex items-center">
                <span className="text font-medium text-gray-700 mr-2">
                  Sort by:
                </span>
              </div>
              <div className="flex items-center gap-2">
                <NearMeBtn/>
                {/* <div className='flex bg-white p-2 text-bodysmall rounded-md border border-gray-300 px-4 cursor-pointer '>Near Me</div> */}
                <SortByDropdown
                  defaultTitle="Star Reviews"
                  options={starCountOptions}
                  onSelect={handleSelectOption}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-8 mb-10">
              <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col items-center ">
                <img src="https://abansgroup.com/wp-content/uploads/2022/05/Brand%20Finance%20ranking%20Large.png" alt="Abans" className="mb-4 rounded w-full" />
                <div className='flex flex-col divide-y w-full'>
                <div className="flex flex-col gap-3  p-4 rounded-b-lg">
                  <p className='text-xl font-semibold'>Abans - Colombo</p>
                  <Rating>
                    <RatingStar className='text-yellow-500' />
                    <p className="ml-2 text-lg font-bold text-gray-900 dark:text-white">4.95</p>
                  </Rating>
                  <div className='flex flex-row gap-1 truncate'>
                    <Badge className='bg-blue text-gray-800'>Computer</Badge>
                    <Badge className='bg-blue text-gray-800'>AC</Badge>
                    <Badge className='bg-blue text-gray-800'>Laptop</Badge>
                    <Badge className='bg-blue text-gray-800'>Kitchen items</Badge>

                  </div>
                  <div className='text-wrap text-sm text-gray-800 mt-4 truncate'>
                  <p>Dealers in all kinds of Laptops, electronic items and accessories</p>

                  </div>
                  <div className='flex flex-row gap-1 items-center mt-4'>
                    <LocationOnIcon className='text-gray-800'/>
                    <p className="text-gray-700">672, Galle Road, Colombo</p>
                  </div>
                </div>
                <div className='p-4 flex justify-end text-red-600 text-sm font-semibold'>
                  <p>Closed Now</p>
                </div>
                </div>
                
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col items-center">
                <img src="https://findit-resources.s3.us-east-2.amazonaws.com/account/profilePictures/1623042343123.jpg" alt="Dealz" className="mb-4 rounded w-full" />
                <div className="bg-gray-100 p-4 w-full text-center rounded-b-lg">
                  <h2 className="text-xl font-bold text-gray-900">Dealz</h2>
                  <p className="text-gray-700">The Future Bargain</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col items-center">
                <img src="https://abansgroup.com/wp-content/uploads/2022/05/Brand%20Finance%20ranking%20Large.png" alt="Abans" className="mb-4 rounded w-full" />
                <div className="bg-gray-100 p-4 w-full text-center rounded-b-lg">
                  <h2 className="text-xl font-bold text-gray-900">Abans - Panadura</h2>
                  <p className="text-gray-700">672, Galle Road, Panadura</p>
                  <p className="text-gray-700">0777456722</p>
                  <p className="text-blue-500">www.abans.com</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col items-center">
                <img src="https://abansgroup.com/wp-content/uploads/2022/05/Brand%20Finance%20ranking%20Large.png" alt="Abans" className="mb-4 rounded w-full" />
                <div className="bg-gray-100 p-4 w-full text-center rounded-b-lg">
                  <h2 className="text-xl font-bold text-gray-900">Abans - Panadura</h2>
                  <p className="text-gray-700">672, Galle Road, Panadura</p>
                  <p className="text-gray-700">0777456722</p>
                  <p className="text-blue-500">www.abans.com</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col items-center">
                <img src="https://findit-resources.s3.us-east-2.amazonaws.com/account/profilePictures/1623042343123.jpg" alt="Dealz" className="mb-4 rounded w-full" />
                <div className="bg-gray-100 p-4 w-full text-center rounded-b-lg">
                  <h2 className="text-xl font-bold text-gray-900">Dealz</h2>
                  <p className="text-gray-700">The Future Bargain</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col items-center">
                <img src="https://findit-resources.s3.us-east-2.amazonaws.com/account/profilePictures/1623042343123.jpg" alt="Dealz" className="mb-4 rounded w-full" />
                <div className="bg-gray-100 p-4 w-full text-center rounded-b-lg">
                  <h2 className="text-xl font-bold text-gray-900">Dealz</h2>
                  <p className="text-gray-700">The Future Bargain</p>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="flex flex-col bg-black justify-start w-1/6 ml-10 fixec top-0">
            <CategoriesCard />
          </div> */}

          <SearchPagination/>
        </div>


    </Container>

  );
};

export default SearchResults;