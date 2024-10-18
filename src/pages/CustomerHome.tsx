import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Customernavbar from "../components/Customernavbar";
import {
  FaSearch,
  FaPencilAlt,
  FaHotel,
  FaLaptop,
  FaAppleAlt,
  FaLightbulb,
} from "react-icons/fa";
import HomeImage from "../assets/Background.png";
import Advertisement from "../components/Advertisement";
import Footer from "../components/Footer";
import ad1 from '../assets/ad1.png';
import ad2 from '../assets/ad2.png';
import ad3 from '../assets/ad3.png';
import ad4 from '../assets/prom3.jpg';
import axios from 'axios';

const advertisements = [
  {
    img: ad1,
    date: '2024-07-06',
    details: 'Black Friday Sales with Amex!',
  },
  {
    img: ad2,
    date: '2024-07-05',
    details: 'Black Friday Sales - 5% off!',
  },
  {
    img: ad3,
    date: '2024-07-04',
    details: 'Abans 8 days of deals',
  },
  {
    img: ad4,
    date: '2024-07-04',
    details: 'New arrivals!',
  },
];

const CustomerHome: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<any[]>([]); // Holds search results
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const navigate = useNavigate();

  const handleSearch = async () => {
    const searchQuery = query.trim();

    if (searchQuery) {
      setLoading(true);
      setError(null); // Reset error before starting the request

      try {
        // POST request to search
        const response = await axios.post('http://localhost:8080/api/v1/search/post', searchQuery, {
          params: { page: 0, size: 10 },
        });
        
        setResults(response.data); // Set the search results
        setLoading(false);

        if (response.data.length === 0) {
          setError("No results found");
        }
      } catch (error) {
        setError("Failed to fetch search results");
        setLoading(false);
      }
    } else {
      setError("Please enter a valid search term");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-body">
      <Customernavbar />
      <header className="relative">
        <img
          src={HomeImage}
          alt="Cityscape"
          className="w-full h-95.5 object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-semibold">
            Find what you need, Where you need it!
          </h1>
          <p className="text-xl md:text-2xl font-medium mt-4">
            Search for local Businesses tailored to your preferences
          </p>
          <div className="flex items-center mt-8 w-full max-w-2xl">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="What are you looking for"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress} // Trigger search on Enter key press
                className="w-full py-3 pl-4 pr-12 rounded-full text-gray-600"
                style={{ boxShadow: 'none' }}
              />
              <FaSearch 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600"
                onClick={handleSearch} // Trigger search on click
              />
            </div>
          </div>
          {loading && <div className="text-white mt-4">Loading...</div>}
          {error && <div className="text-red-500 mt-4">{error}</div>}
          {results.length > 0 && (
            <div className="mt-8 bg-white rounded-lg shadow-lg text-gray-900 w-full max-w-2xl">
              <h2 className="text-xl font-semibold mb-4">Search Results</h2>
              <ul>
                {results.map((result, index) => (
                  <li key={index} className="border-b border-gray-300 p-4">
                    <h3 className="font-bold">{result.name}</h3>
                    <p>{result.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </header>
      <main className="flex-grow p-8">
        <section className="text-center mb-12">
          <div className="container mx-auto my-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-primary p-4 rounded-full">
                <FaPencilAlt className="w-12 h-12 text-blue10" />
              </div>
              <p className="mt-2 text-primary">Stationary</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary p-4 rounded-full">
                <FaHotel className="w-12 h-12 text-blue10" />
              </div>
              <p className="mt-2 text-primary">Hotels</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary p-4 rounded-full">
                <FaLaptop className="w-12 h-12 text-blue10" />
              </div>
              <p className="mt-2 text-gray-800">Computer Shops</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary p-4 rounded-full">
                <FaAppleAlt className="w-12 h-12 text-blue10" />
              </div>
              <p className="mt-2 text-primary">Food</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary p-4 rounded-full">
                <FaLightbulb className="w-12 h-12 text-blue10" />
              </div>
              <p className="mt-2 text-primary">Electronic Shops</p>
            </div>
          </div>
          <p className="mt-6 text-gray-500 italic">
            Discover latest offers and win vouchers in Sri Lankan shops being at your comfort zones
          </p>
        </section>
        <section>
          <h2 className="text-subsubheading font-bold mb-4">Recommended</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {advertisements.map((ad, index) => (
              <Advertisement key={index} img={ad.img} details={ad.details} />
            ))}
          </div>
          <div className="mt-4 text-center mb-10">
            <Link to="/advertisements" className="text-slate-600 hover:underline">
              See more
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CustomerHome;
