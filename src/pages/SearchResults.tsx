// import React, { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Customernavbar from '../components/Customernavbar';
// import SortByDropdown from '../components/SortBy';
// import CategoryPills from '../components/CategoryPills';
// import NearMeBtn from '../components/NearMeBtn';
// import { SearchPagination } from '../components/SearchPagePagination';
// import { Rating, RatingStar, Badge } from "flowbite-react";
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import Footer from '../components/Footer';
// import Container2 from '../components/Container2';

// const useQuery = () => {
//   return new URLSearchParams(useLocation().search);
// };

// const starCountOptions = [
//   "5 Star Reviews",
//   "4 Star Reviews",
//   "3 Star Reviews",
//   "2 Star Reviews",
//   "1 Star Reviews",
// ];

// const handleSelectOption = (option: string) => {
//   // Handle whatever logic you need here based on the selected option
// };

// interface ResultCardProps {
//   imageSrc: string;
//   name: string;
//   place_location: string;
//   rating: number;
//   badges: string[];
//   description: string;
//   status: string;
// }

// const ResultCard: React.FC<ResultCardProps> = ({ imageSrc, name, place_location, rating, badges, description, status }) => {

//   const navigate = useNavigate();

//   function navigateToPage() {
//     navigate('/customer/business_page');
//   }
//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col items-center" onClick={navigateToPage}>
//       <img src={imageSrc} alt={name} className="mb-4 rounded w-full" />
//       <div className='flex flex-col divide-y w-full'>
//         <div className="flex flex-col gap-3 p-4 rounded-b-lg">
//           <p className='text-xl font-semibold'>{name} - {place_location}</p>
//           <Rating>
//             <RatingStar className='text-yellow-500' />
//             <p className="ml-2 text-lg font-bold text-gray-900 dark:text-white">{rating.toFixed(2)}</p>
//           </Rating>
//           <div className='flex flex-row gap-1 truncate'>
//             {badges.map((badge, index) => (
//               <Badge key={index} className='bg-blue text-gray-800'>{badge}</Badge>
//             ))}
//           </div>
//           <div className='text-wrap text-sm text-gray-800 mt-4 truncate'>
//             <p>{description}</p>
//           </div>
//           <div className='flex flex-row gap-1 items-center mt-4'>
//             <LocationOnIcon className='text-gray-800' />
//             <p className="text-gray-700">{place_location}</p>
//           </div>
//         </div>
//         <div className={`p-4 flex justify-end text-sm font-semibold ${status === 'Open Now' ? 'text-green-600' : 'text-red-600'}`}>
//           <p>{status}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const SearchResults: React.FC = () => {
//   // const query = useQuery().get('query');

//   const results = [
//     {
//       imageSrc: "https://media.licdn.com/dms/image/C560BAQGplG-OJazYng/company-logo_200_200/0/1630646931271?e=2147483647&v=beta&t=bm-AX73n6sJpT_Pamn2_IVmWTwj7UnKuPZBJvIfzu18",
//       name: "Abans",
//       place_location: "Colombo",
//       rating: 4.95,
//       badges: ["Computer", "AC", "Laptop", "Kitchen items"],
//       description: "Dealers in all kinds of Laptops, electronic items and accessories",
//       status: "Open Now",
//     },
//     {
//       imageSrc: "https://findit-resources.s3.us-east-2.amazonaws.com/account/profilePictures/1623042343123.jpg",
//       name: "Idealz Lanka",
//       place_location: "Colombo",
//       rating: 4.85,
//       badges: ["Mobile Phones", "Accessories", "Laptops", "Gadgets"],
//       description: "Dealers in mobile phones, accessories, laptops, and various gadgets.",
//       status: "Open Now",
//     },
//     {
//       imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDYuPDso2Uc5jgFr_T0Fxh3idtz0y_UqdQOg&s",
//       name: "Softlogic Holdings",
//       place_location: "Colombo",
//       rating: 4.80,
//       badges: ["Electronics", "IT Products", "Home Appliances", "Retail"],
//       description: "Providers of a wide range of electronics, IT products, and home appliances.",
//       status: "Open Now",
//     },
//     {
//       imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9941BHlFTlJrJSW2i2HaB6Aj6bOJ35cO2lA&s",
//       name: "Redline Technologies",
//       place_location: "Colombo",
//       rating: 4.75,
//       badges: ["Gaming PCs", "Custom-built PCs", "Hardware", "Gaming Gear"],
//       description: "Specializing in high-end gaming and custom-built PCs.",
//       status: "Closed Now",
//     },
//     {
//       imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjiqQieKfS-RLsZgOmiYt62UJkJaKUbwKBiA&s",
//       name: "Nanotek",
//       place_location: "Colombo",
//       rating: 4.70,
//       badges: ["Computers", "Accessories", "Peripherals"],
//       description: "Offering a variety of tech products, from laptops to peripherals.",
//       status: "Open Now",
//     },
//     {
//       imageSrc: "https://www.americanexpress.lk/images/specialOffers/homecare/lifemobile_600x600.jpg",
//       name: "Life Mobile",
//       place_location: "Colombo",
//       rating: 4.65,
//       badges: ["Mobile Phones", "Tablets", "Accessories", "Gadgets"],
//       description: "Providers of a range of mobile phones, tablets, and accessories.",
//       status: "Closed Now",
//     },
//   ];


//   const location = useLocation();
//   const { query } = location.state;

//   const page = 0;
//   const size = 8;

//   const fetchData = async () => {
//     const url = `http://localhost:8080/api/v1/search/${query}?page=${page}&size=${size}`;

//     try {
//       const response = await fetch(url);
//       const data = await response.json();

//       if (response.ok) {

//         console.log(data);
//         const list = data.content;

//       } else {
//         throw new Error('Failed to fetch data');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
//     // Fetch data here

//   useEffect(() => {
//     document.title = "SpotBiz | Search Results";

//     fetchData();
//   }, []);

//   return (
//     <>
//       <Container2>
//       <Customernavbar />
//       <div className="flex flex-col justify-start px-20 mt-20 pt-5 w-full mb-20">
//         <div className="w-full">
//           <h1 className="text-3xl font-bold mb-1 pt-4">Search for "{query ? query : 'computers'}"</h1>
//           <p className="text-gray-700 mb-6 pt-1">6 Search results</p>
//           <div className='flex flex-row justify-center'>
//             <CategoryPills />
//           </div>
//           <div className="sticky top-4 p-4 space-y-4 md:space-y-0 md:space-x-4 flex flex-wrap md:flex-nowrap justify-start mb-6 bg-gray-100 -ml-10 pl-10 -mr-10">
//             <div className="flex items-center">
//               <span className="text font-medium text-gray-700 mr-2">Sort by:</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <NearMeBtn />
//               <SortByDropdown
//                 defaultTitle="Star Reviews"
//                 options={starCountOptions}
//                 onSelect={handleSelectOption}
//               />
//             </div>
//           </div>
//           <div className="grid grid-cols-4 gap-8 mb-10">
//             {results.map((result, index) => (
//               <ResultCard key={index} {...result} />
//             ))}
//           </div>
//         </div>
//       </div>
//       <SearchPagination />
//     </Container2>
//     <Footer />
    
//     </>
    
//   );
// };

// export default SearchResults;

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Customernavbar from '../components/Customernavbar';
import { GridLoader } from 'react-spinners';
import SortByDropdown from '../components/SortBy';
import CategoryPills from '../components/CategoryPills';
import NearMeBtn from '../components/NearMeBtn';
import { SearchPagination } from '../components/SearchPagePagination';
import { Rating, RatingStar, Badge } from "flowbite-react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Footer from '../components/Footer';
import Container2 from '../components/Container2';

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
  // Handle whatever logic you need here based on the selected option
};

interface ResultCardProps {
  imageSrc: string;
  name: string;
  place_location: string;
  rating: number;
  badges: string[];
  description: string;
  status: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ imageSrc, name, place_location, rating, badges, description, status }) => {
  const navigate = useNavigate();

  function navigateToPage() {
    navigate('/customer/business_page');
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 flex flex-col items-center" onClick={navigateToPage}>
      <img src={imageSrc} alt={name} className="mb-4 rounded w-full" />
      <div className='flex flex-col divide-y w-full'>
        <div className="flex flex-col gap-3 p-4 rounded-b-lg">
          <p className='text-xl font-semibold'>{name}</p>
          <Rating>
            <RatingStar className='text-yellow-500' />
            <p className="ml-2 text-lg font-bold text-gray-900 dark:text-white">{rating.toFixed(2)}</p>
          </Rating>
          <div className='flex flex-row gap-1 truncate'>
            {badges.map((badge, index) => (
              <Badge key={index} className='bg-blue text-gray-800'>{badge}</Badge>
            ))}
          </div>
          <div className='text-wrap text-sm text-gray-800 mt-4 truncate'>
            <p>{description}</p>
          </div>
          <div className='flex flex-row gap-1 items-center mt-4'>
            <LocationOnIcon className='text-gray-800' />
            <p className="text-gray-700">{place_location}</p>
          </div>
        </div>
        <div className={`p-4 flex justify-end text-sm font-semibold ${status === 'Open Now' ? 'text-green-600' : 'text-red-600'}`}>
          <p>{status}</p>
        </div>
      </div>
    </div>
  );
};

const SearchResults: React.FC = () => {
  const location = useLocation();
  const { query } = location.state;

  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const page = 0;
  const size = 8;

  const fetchData = async () => {
    const url = `http://localhost:8080/api/v1/search/${query}?page=${page}&size=${size}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setResults(data.content);  // Set the results to the fetched content
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);  // Update loading state after the fetch is complete
    }
  };

  useEffect(() => {
    document.title = "SpotBiz | Search Results";
    fetchData();
  }, []);

  if (loading) {
    return (
    
      <div className='flex flex-row justify-center items-center h-screen'>
         <GridLoader
          color="#0D3B66"
          margin={10}
          size={30}
        />
      </div>
    
   );  // Display a loading state while the data is being fetched
  }

  return (
    <>
      <Container2>
        <Customernavbar />
        <div className="flex flex-col justify-start px-20 mt-20 pt-5 w-full mb-20">
          <div className="w-full">
            <h1 className="text-3xl font-bold mb-1 pt-4">Search for "{query ? query : 'computers'}"</h1>
            <p className="text-gray-700 mb-6 pt-1">{results.length} Search results</p>
            <div className='flex flex-row justify-center'>
              <CategoryPills />
            </div>
            <div className="sticky top-4 p-4 space-y-4 md:space-y-0 md:space-x-4 flex flex-wrap md:flex-nowrap justify-start mb-6 bg-gray-100 -ml-10 pl-10 -mr-10">
              <div className="flex items-center">
                <span className="text font-medium text-gray-700 mr-2">Sort by:</span>
              </div>
              <div className="flex items-center gap-2">
                <NearMeBtn />
                <SortByDropdown
                  defaultTitle="Star Reviews"
                  options={starCountOptions}
                  onSelect={handleSelectOption}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-8 mb-10">
              {results.map((result, index) => (
                <ResultCard
                  key={result.businessId}
                  imageSrc={result.logo}
                  name={result.name}
                  place_location={result.address}
                  rating={result.avgRating}
                  badges={["Category 1", "Category 2"]} // You can replace with actual badges if available in your data
                  description={result.description}
                  status={result.status === "open now" ? "Open Now" : "Closed Now"}
                />
              ))}
            </div>
          </div>
        </div>
        <SearchPagination />
      </Container2>
      <Footer />
    </>
  );
};

export default SearchResults;

