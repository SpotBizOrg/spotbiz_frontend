import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Nousernavbar from "./Nousernavbar";
import HomeImage from "../assets/Background.png";
import axios from "axios"; // Axios for POST request
import { useAuth } from "../utils/AuthProvider";
import Adminnavbar from "./Adminnavbar";
import Businessnavbar from "./Businessnavbar";
import CustomNavbar from "./Customernavbar";

type SearchResult = {
  name: string;
  description: string;
};

const Header = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]); // Holds search results
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const { user } = useAuth();

  const handleSearch = async () => {
    const searchQuery = query.trim();

    if (searchQuery) {
      setLoading(true); // Start loading
      try {
        // Sending a POST request to the backend with the search query
        const response = await axios.post(
          "http://localhost:8080/api/v1/search", // no use error
          searchQuery,
          {
            params: { page: 0, size: 10 }, // Optional: Handle pagination if needed
          }
        );

        // Update state with search results
        setResults(response.data); // Assuming the response is a JSON array
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch search results");
        setLoading(false);
      }
    } else {
      setError("Please enter a valid search term");
    }
  };

  // This function will be called when pressing "Enter"
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative">
      {user ? (
        user.role === "ADMIN" ? (
          <Adminnavbar />
        ) : user.role === "BUSINESS_OWNER" ? (
          <Businessnavbar />
        ) : (
          <CustomNavbar />
        )
      ) : (
        <Nousernavbar />
      )}

      <header className="relative">
        <img
          src={HomeImage}
          alt="Cityscape"
          className="w-full h-95.5 object-cover brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
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
                onKeyDown={handleKeyDown} // Listen for "Enter" key press
                className="w-full py-3 pl-4 pr-12 rounded-full text-gray-600"
                style={{ boxShadow: "none" }}
              />
              <FaSearch
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600"
                onClick={handleSearch} // Call the search handler
              />
            </div>
          </div>
          {loading && <div className="text-white mt-4">Loading...</div>}
          {error && <div className="text-red-500 mt-4">{error}</div>}
          {results.length > 0 && (
            <div className="mt-8 bg-white rounded-lg shadow-lg text-gray-900">
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
    </div>
  );
};

export default Header;
