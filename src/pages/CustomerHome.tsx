import React, { useState, useEffect } from "react";
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
import axios from "axios";

interface SearchResult {
  name: string;
  description: string;
}

interface Recommendation {
  adsId: number;
  businessId: number;
  data: string; // JSON string containing ad details
  status: boolean;
  tags: string;
}

const CustomerHome: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    const searchQuery = query.trim();

    if (searchQuery) {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/search/post",
          searchQuery,
          {
            params: { page: 0, size: 10 },
          }
        );

        setResults(response.data);
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

  const fetchRecommendations = async () => {
    const userId = 39;
    const email = "shalini20020109@gmail.com";

    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/recommendation?userId=${userId}&email=${email}`
      );
      const data = response.data;

      console.log("Raw Recommendation Data:", data);

      const today = new Date();

      // Filter and parse recommendations based on `status` and `endDate`
      const validRecommendations = data.filter((rec: Recommendation) => {
        if (rec.status) {
          const adData = JSON.parse(rec.data);
          const endDate = new Date(adData.endDate);
          return endDate >= today;
        }
        return false;
      });

      console.log("Valid Recommendations:", validRecommendations);

      setRecommendations(validRecommendations);
    } catch (error) {
      console.error("Failed to fetch recommendations");
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

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
                onKeyPress={handleKeyPress}
                className="w-full py-3 pl-4 pr-12 rounded-full text-gray-600"
                style={{ boxShadow: "none" }}
              />
              <FaSearch
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600"
                onClick={handleSearch}
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

      {/* Conditional Recommendations Section */}
      {recommendations.length >= 4 && (
        <main className="flex-grow p-8">
          <section className="text-center mb-12">
            <h2 className="text-subsubheading font-bold mb-4">
              Your Recommendations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {recommendations.slice(0, 4).map((rec, index) => {
                const adData = JSON.parse(rec.data);

                // Construct the full image URL if necessary
                const imageUrl = adData.img;

                return (
                  <Advertisement
                    key={index}
                    img={imageUrl}
                    details={adData.details || undefined}
                    description={adData.description || undefined}
                  />
                );
              })}
            </div>
            {/* "See More" Link */}
            <div className="mt-8 text-center">
              <Link to="/allrecommendations" className="text-slate-600 hover:underline text-lg font-semibold">
                See More
              </Link>
            </div>
          </section>
          <Footer />
        </main>
      )}
    </div>
  );
};

export default CustomerHome;
