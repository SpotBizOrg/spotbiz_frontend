import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

let selectedCategory: string | null = null
let starRating: number = 0;



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
      <img src={imageSrc} alt={name} className="mb-4 rounded w-full h-full object-fill" />
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
  const [sortedResults, setSortedResults] = useState<any[]>([]);

  const page = 0;
  const size = 8;

  const fetchData = async () => {
    const url = `http://localhost:8080/api/v1/search/${query}?page=${page}&size=${size}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setResults(data.content);  // Set the results to the fetched content
        starRating = 0;
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);  // Update loading state after the fetch is complete
    }
  };

  const filterOnStarRating = (rating: number) => {

    const filteredResults = results.filter((result) => {
      return result.avgRating >= rating;
    });

    setSortedResults(filteredResults);
  
  }
  
  
  const handleSelectOption = (option: string) => {
    // Handle whatever logic you need here based on the selected option
    starRating = parseInt(option.charAt(0));
    console.log(starRating);
  
    filterOnStarRating(starRating);
    
    
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
    
   ); 
  }

  const handleFilterNearBy = () => {
    // Handle logic for filtering near
  };


  const loadBusinessByCategory = async (categoryId: number) => {
    const url = `http://localhost:8080/api/v1/search/category/${categoryId}?page=${page}&size=${size}`;

    try {
      setLoading(true);
      const response = await axios.get(url);
      setResults(response.data.content);
      starRating = 0;
      // query.set('category', categoryId.toString());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);  // Update loading state after the fetch is complete
    }
  };

  return (
    <>
      <Container2>
        <Customernavbar />
        <div className="flex flex-col justify-start px-20 mt-20 pt-5 w-full mb-20">
          <div className="w-full">
            <h1 className="text-3xl font-bold mb-1 pt-4">Search for "{ selectedCategory != null ? selectedCategory : (query ? query : 'computers')}"</h1>
            <p className="text-gray-700 mb-6 pt-1">{results.length} Search results</p>
            <div className='flex flex-row justify-center'>
              <CategoryPills loadCategory={(categoryId: number) => loadBusinessByCategory(categoryId)} 
              markActive={function (categoryName: string): void {
                selectedCategory = categoryName;
              } }                 />
            </div>
            <div className="sticky top-4 p-4 space-y-4 md:space-y-0 md:space-x-4 flex flex-wrap md:flex-nowrap justify-start mb-6 bg-gray-100 -ml-10 pl-10 -mr-10">
              <div className="flex items-center">
                <span className="text font-medium text-gray-700 mr-2">Sort by:</span>
              </div>
              <div className="flex items-center gap-2">
                <NearMeBtn filterNearBy={handleFilterNearBy}/>
                <SortByDropdown
                  defaultTitle="Star Reviews"
                  options={starCountOptions}
                  onSelect={handleSelectOption}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-8 mb-10">
              {starRating == 0 && results.map((result, index) => (
                <ResultCard
                  key={result.businessId}
                  imageSrc={result.logo}
                  name={result.name}
                  place_location={result.address}
                  rating={result.avgRating}
                  badges={result.tags} // You can replace with actual badges if available in your data
                  description={result.description}
                  status={result.status === "open now" ? "Open Now" : "Closed Now"}
                />
              ))}
              {starRating > 0 && sortedResults.map((result, index) => (
                <ResultCard
                  key={result.businessId}
                  imageSrc={result.logo}
                  name={result.name}
                  place_location={result.address}
                  rating={result.avgRating}
                  badges={result.tags} // You can replace with actual badges if available in your data
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

