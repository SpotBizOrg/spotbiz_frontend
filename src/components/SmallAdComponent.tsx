import React, { useEffect, useState } from "react";
import ad1 from "../assets/ad1.png";
import ad2 from "../assets/ad2.png";
import ad3 from "../assets/ad3.png";
import ad4 from "../assets/ad4.png";
import ad5 from "../assets/ad5.jpeg";
import ad6 from "../assets/ad6.jpg";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import Advertisement from "./Advertisement";
import { HashLoader } from "react-spinners";

interface AdProps {
  onClose: () => void;
}

const ads = [
  { imgSrc: ad1, url: "http://localhost:3000/page1" },
  { imgSrc: ad2, url: "http://localhost:3000/page2" },
  { imgSrc: ad3, url: "http://localhost:3000/page3" },
  { imgSrc: ad4, url: "http://localhost:3000/page3" },
  { imgSrc: ad5, url: "http://localhost:3000/page3" },
  { imgSrc: ad6, url: "http://localhost:3000/page3" },
];

interface Recommendation {
  adsId: number;
  businessId: number;
  data: string;
  status: boolean;
  tags: string;
}

const AdComponent: React.FC<AdProps> = ({ onClose }) => {
  const [currentAd, setCurrentAd] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  const fetchRecommendations = async () => {
    // const userId = 38;
    // const email = "nirashanelki@gmail.com";
    const userId = localStorage.getItem("user_id");
    const email = localStorage.getItem("email");

    try {
      const response = await axios.get(
        `${BACKEND_URL}/recommendation?userId=${userId}&email=${email}`
      );
      const data = response.data;

      console.log("Raw Recommendation Data:", data);

      const today = new Date();

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

  const displayRandomAd = () => {
    if (recommendations.length > 0) {
      const randomIndex = Math.floor(Math.random() * recommendations.length);
      setCurrentAd(recommendations[randomIndex]);
    } else {
      const randomAd = ads[Math.floor(Math.random() * ads.length)];
      setCurrentAd(randomAd);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(displayRandomAd, 10000);
    return () => clearInterval(intervalId);
  }, [recommendations]);

  return (
    <div className="ad-container fixed bottom-4 right-4 flex justify-end items-end z-50">
      {currentAd ? (
        <div className="relative p-4rounded shadow-lg max-w-sm w-full">
          <button
            onClick={onClose}
            className="absolute top-0 right-1 p-2 text-gray-600 hover:scale-105 z-10"
          >
            &times;
          </button>
          <Advertisement
            key={currentAd.adsId || currentAd.imgSrc}
            img={
              currentAd.data ? JSON.parse(currentAd.data).img : currentAd.imgSrc
            }
            details={
              currentAd.data ? JSON.parse(currentAd.data).details : undefined
            }
            description={
              currentAd.data
                ? JSON.parse(currentAd.data).description
                : undefined
            }
            businessId={currentAd.businessId || undefined}
          />
        </div>
      ) : (
        <div className="fixed bottom-4 right-4 flex items-center justify-center bg-black bg-opacity-50 rounded shadow-lg">
          <HashLoader color="#36d7b7" size={30} />
        </div>
      )}
    </div>
  );
};

export default AdComponent;
