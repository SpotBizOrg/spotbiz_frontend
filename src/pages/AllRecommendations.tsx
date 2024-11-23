import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Customernavbar from "../components/Customernavbar";
import Advertisement from "../components/Advertisement";
import Footer from "../components/Footer";
import axios from "axios";
import { useAuth } from "../utils/AuthProvider";
import { BACKEND_URL } from "../../config";

interface Recommendation {
  adsId: number;
  businessId: number;
  data: string; // JSON string containing ad details
  status: boolean;
  tags: string;
}

const AllRecommendations: React.FC = () => {
  const { user, checkAuthenticated, login } = useAuth();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const navigate = useNavigate();

  const fetchAllRecommendations = async () => {
    // const userId = 39; // Replace with dynamic user ID as needed
    // const email = "shalini20020109@gmail.com";
    const userId = localStorage.getItem("user_id");
    const email = localStorage.getItem("email");

    try {
      const response = await axios.get(
        `${BACKEND_URL}/recommendation?userId=${userId}&email=${email}`
      );
      const data = response.data;

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

      setRecommendations(validRecommendations);
    } catch (error) {
      console.error("Failed to fetch recommendations");
    }
  };

  useEffect(() => {
    fetchAllRecommendations();
    if (!checkAuthenticated() || user?.role != "CUSTOMER") {
      login();
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white font-body">
      <Customernavbar />
      
      {/* Recommendations Heading */}
      <section className="p-24 text-left -ml-12">
        <h1 className="text-3xl font-semibold">Recommendations</h1>
      </section>

      <main className="flex-grow p-12 -mt-24">
        {/* Recommendations Grid */}
        <section className="text-center mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            {recommendations.map((rec, index) => {
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
        </section>
        <Footer />
      </main>
    </div>
  );
};

export default AllRecommendations;
