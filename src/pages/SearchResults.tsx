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
import Empty from '../components/Empty';
import { BACKEND_URL } from '../../config';

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
let selectedCategoryId: number = 0;

interface WeeklySchedule {
  startTime: string;
  endTime: string;
  specialNote: string;
  isOpen: boolean;
}

interface ResultCardProps {
  imageSrc: string;
  name: string;
  place_location: string;
  rating: number;
  badges: string[];
  description: string;
  status: string;
  weeklySchedule: {
    Monday: WeeklySchedule;
    Tuesday: WeeklySchedule;
    Wednesday: WeeklySchedule;
    Thursday: WeeklySchedule;
    Friday: WeeklySchedule;
    Saturday: WeeklySchedule;
    Sunday: WeeklySchedule;
  };
}

const ResultCard: React.FC<ResultCardProps> = ({ imageSrc, name, place_location, rating, badges, description, status, weeklySchedule }) => {
  const navigate = useNavigate();

  function navigateToPage() {
    navigate('/customer/business_page');
  }

  // Helper function to convert time strings like "22:00" to Date objects
  const getTimeAsDate = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0); // Set the hours, minutes, seconds, and milliseconds
    return date;
  };

  // Get the current day and time in Sri Lanka time zone
  const today = new Date();
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDay = daysOfWeek[today.getDay()];

  // Convert the Sri Lankan time to a comparable Date object
  const currentTime = new Date().toLocaleString("en-US", { 
    timeZone: "Asia/Colombo", 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: false // 24-hour format
  });
  const currentSriLankanTime = getTimeAsDate(currentTime);
  

  // Initialize the status, defaulting to "Open Now"
  let updatedStatus = "Open Now";

  // If weeklySchedule exists, use it to determine the status
  if (weeklySchedule) {
    const todaySchedule = weeklySchedule[currentDay as keyof typeof weeklySchedule];
    

    if (todaySchedule && todaySchedule.isOpen) {
      const startTime = getTimeAsDate(todaySchedule.startTime);
      const endTime = getTimeAsDate(todaySchedule.endTime);
      

      // Check if current time is within startTime and endTime
      if (currentSriLankanTime.getTime() >= startTime.getTime() && currentSriLankanTime.getTime() <= endTime.getTime()) {
        updatedStatus = "Open Now";
      } else {
        updatedStatus = "Closed Now";
      }
    } else {
      updatedStatus = "Closed Now";
    }
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
        <div className={`p-4 flex justify-end text-sm font-semibold ${updatedStatus === 'Open Now' ? 'text-green-600' : 'text-red-600'}`}>
          <p>{updatedStatus}</p>
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
  const [locationFilter, setLocationFilter] = useState(false);
  // const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [currentPageS, setCurrentPageS] = useState(1);
  const [currentPageC, setCurrentPageC] = useState(1);
  // const [totalItems, setTotalItems] = useState(0);
  const [totalPagesS, setTotalPagesS] = useState(0);
  const [totalPagesC, setTotalPagesC] = useState(0);


  
  // const page = 0;
  const size = 4;

  const fetchData = async (page: number) => {
    const url = `${BACKEND_URL}/search/${query}?page=${page-1}&size=${size}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setTotalPagesS(data.totalPages);  // Set the total pages
        setResults(data.content);  // Set the results to the fetched content
        starRating = 0;
        selectedCategoryId = 0
        console.log(currentPageS);
        
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

  const loadBusinessByCategory = async (categoryId: number, page: number) => {
    const url = `${BACKEND_URL}/search/category/${categoryId}?page=${page-1}&size=${size}`;

    try {
      setLoading(true);
      const response = await axios.get(url);
      setTotalPagesC(response.data.totalPages); 
      setResults(response.data.content);
      console.log(currentPageC);
      
      starRating = 0;
      // query.set('category', categoryId.toString());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);  // Update loading state after the fetch is complete
    }
  };

  useEffect(() => {
    document.title = "SpotBiz | Search Results";
    fetchData(currentPageS);
  }, [currentPageS]);

  useEffect(() => {
    document.title = "SpotBiz | Search Results";
    loadBusinessByCategory(selectedCategoryId, currentPageC);
  }, [currentPageC]);

  const onPageChangeS = (page: number) => setCurrentPageS(page);
  const onPageChangeC = (page: number) =>{ 
    setCurrentPageC(page);
    // loadBusinessByCategory(selectedCategoryId)
  };


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

  const geocodeAddress = async (address: string): Promise<any | null> => {
    const api_key = ''; // Add your OpenCage API key here
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${api_key}`;
  
    try {
      const response = await axios.get(url);
      const data = response.data;
  
      // Check if the response contains valid results
      if (data && data.results && data.results.length > 0) {
        const result = data.results[0]; // Take the first result
        const geometry = result.geometry; // Extract geometry
        return {
          name: result.formatted, // Extract the formatted address
          latitude: geometry.lat, // Extract latitude
          longitude: geometry.lng, // Extract longitude
        };
      }
    } catch (error) {
      console.error(`Error geocoding address ${address}:`, error);
    }
    return null;
  };

  // let clickOnce: boolean = true;
  // const handleFilterNearBy = async () => {
    
  //   setLocationFilter(!locationFilter);
  //   const updatedRes: any[] = [];
    
  //   if (locationFilter) {
  //     // Get user location
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(async (position) => {
  //       const userLat = position.coords.latitude;
  //       const userLng = position.coords.longitude;
  
  //       console.log("User Location:", userLat, userLng);
  
  //       // Geocode all the business addresses
  //       const addressPromises = results.map((business) =>
  //         geocodeAddress(business.address)
  //       );
        
  //       const businessLocations = await Promise.all(addressPromises);
  
  //       // Calculate distances and log them
  //       businessLocations.map((businessLocation, index) => {
  //         if (businessLocation) {
  //           const distance = calculateDistance(
  //             userLat,
  //             userLng,
  //             businessLocation.latitude,
  //             businessLocation.longitude
  //           );
  //           console.log(
  //             `Distance to ${results[index].name}: ${distance.toFixed(2)} km`
  //           );

  //           updatedRes.push({ ...results[index], distance });
  //         }
  //       });

  //       // console.log(updatedRes);

  //       const sortedRes = updatedRes.sort((a, b) => a.distance - b.distance);

  //       // console.log(sortedRes);

  //       if (starRating > 0) {
  //         setSortedResults(sortedRes);
  //       } else{
  //         setResults(sortedRes);
  //       }
        
        

  //       // console.log(withDistance);

  //     });
  //   } else {
  //     console.error("Geolocation is not supported by this browser.");
  //   }
  //   } 
  //   else {
  //     if (starRating > 0) {
  //       setSortedResults(results);
  //     } else{
  //       setResults(results);
  //     }
  //   }
  // };

  const handleFilterNearBy = async () => {
    setLocationFilter(!locationFilter);
    console.log("Location Filter:", locationFilter);
    
    const updatedRes: any[] = [];
  
    if (locationFilter) {  // If toggling to apply proximity filter
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
  
          console.log("User Location:", userLat, userLng);
  
          // Geocode all the business addresses
          const addressPromises = results.map((business) =>
            geocodeAddress(business.address)
          );
  
          const businessLocations = await Promise.all(addressPromises);
  
          // Calculate distances and add to updated results
          businessLocations.map((businessLocation, index) => {
            if (businessLocation) {
              const distance = calculateDistance(
                userLat,
                userLng,
                businessLocation.latitude,
                businessLocation.longitude
              );
              console.log(
                `Distance to ${results[index].name}: ${distance.toFixed(2)} km`
              );
              updatedRes.push({ ...results[index], distance });
            }
          });
  
          // Sort by proximity
          const sortedRes = updatedRes.sort((a, b) => a.distance - b.distance);
  
          // If starRating is applied, filter after sorting by proximity
          if (starRating > 0) {
            const filteredSortedRes = sortedRes.filter((result) => result.avgRating >= starRating);
            setSortedResults(filteredSortedRes);
          } else {
            setResults(sortedRes);
          }
        });
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    } else {  // If toggling to remove proximity filter
      if (starRating > 0) {
        const filteredResults = results.filter((result) => result.avgRating >= starRating);
        setSortedResults(filteredResults);
      } else {
        setResults(results);  // Reset to original results
      }
    }
  };
  
  
  // Haversine formula to calculate the distance between two lat/lng points
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const toRad = (value: number) => (value * Math.PI) / 180;
  
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    const distance = R * c; // Distance in kilometers
    return distance;
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
              <CategoryPills loadCategory={(categoryId: number) => {
                loadBusinessByCategory(categoryId, currentPageC);
                selectedCategoryId = categoryId;
              }} 
              
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

            {results.length === 0 && <Empty />}

            <div className="grid grid-cols-4 gap-8 mb-10">

              {results.length > 0 && starRating == 0 && results.map((result, index) => (
                <ResultCard
                  key={result.businessId}
                  imageSrc={result.logo}
                  name={result.name}
                  place_location={result.address}
                  rating={result.avgRating}
                  badges={result.tags} // You can replace with actual badges if available in your data
                  description={result.description}
                  status={result.status === "open now" ? "Open Now" : "Closed Now"}
                  weeklySchedule={result.weeklySchedule}
                />
              ))}
              {results.length > 0 && starRating > 0 && sortedResults.map((result, index) => (
                <ResultCard
                  key={result.businessId}
                  imageSrc={result.logo}
                  name={result.name}
                  place_location={result.address}
                  rating={result.avgRating}
                  badges={result.tags} // You can replace with actual badges if available in your data
                  description={result.description}
                  status={result.status === "open now" ? "Open Now" : "Closed Now"}
                  weeklySchedule={result.weeklySchedule}
                />
              ))}
            </div>
          </div>
        </div>
        {/* pagination for keyword search */}
        {results.length !== 0 && selectedCategory == null && <SearchPagination currentPage={currentPageS} totalPages={totalPagesS} onPageChange={onPageChangeS}/>}
        {/* pagination for category search */}
        {results.length !== 0 && selectedCategory != null && <SearchPagination currentPage={currentPageC} totalPages={totalPagesC} onPageChange={onPageChangeC}/>}
      </Container2>
      <Footer />
    </>
  );
};

export default SearchResults;



