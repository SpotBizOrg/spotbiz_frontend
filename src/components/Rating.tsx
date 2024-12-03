import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import StarRating from "./StarRating";

interface RatingProps {
  businessId?: number;
}

const Rating: React.FC<RatingProps> = ({ businessId }) => {
  const [totalReviews, setTotalReview] = useState(null);
  const [avgReviews, setAvgReview] = useState(null);
  const [ratingPercentages, setRatingPercentages] = useState({
    oneStar: 0,
    twoStar: 0,
    threeStar: 0,
    fourStar: 0,
    fiveStar: 0,
  });

  useEffect(() => {
    const fetchReviewStats = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/review/rating/statistics/${businessId}`
        );

        if (!response.ok) {
          console.error("Failed to fetch:", response.status);
          return;
        }

        const data = await response.json();
        const totalReviews = data.numberOfRatings;

        const newRatingPercentages = {
          oneStar: (data.oneStars / totalReviews) * 100,
          twoStar: (data.twoStars / totalReviews) * 100,
          threeStar: (data.threeStars / totalReviews) * 100,
          fourStar: (data.fourStars / totalReviews) * 100,
          fiveStar: (data.fiveStars / totalReviews) * 100,
        };
        console.log(totalReviews);
        console.log(data);

        setRatingPercentages(newRatingPercentages);
        setTotalReview(data.numberOfRatings);
        setAvgReview(data.averageRating);
      } catch (error) {
        console.error("Error fetching review stats:", error);
      }
    };

    if (businessId) {
      fetchReviewStats();
    }
  }, [businessId]);
  if (!businessId) {
    return <div>Loading ratings...</div>;
  }

  return (
    <div className="md:grid md:grid-cols-2 gap-x-10">
      <div className="flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-800 rounded-md ">
        <div className="text-subsubheading font-bold text-gray-900 dark:text-white mb-2">
          {avgReviews}
        </div>
        <div className="flex justify-between items-center mb-2">
          <StarRating
            avgReview={avgReviews ?? 0}
            reviewCount={totalReviews ?? 0}
          />
        </div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center">
          {totalReviews} ratings
        </p>
      </div>
      <div className="md:col-end-3">
        {[
          { stars: "5 star", percentage: ratingPercentages.fiveStar },
          { stars: "4 star", percentage: ratingPercentages.fourStar },
          { stars: "3 star", percentage: ratingPercentages.threeStar },
          { stars: "2 star", percentage: ratingPercentages.twoStar },
          { stars: "1 star", percentage: ratingPercentages.oneStar },
        ].map((rating, index) => (
          <div className="flex items-center mt-4 justify-evenly" key={index}>
            <a
              href="#"
              className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              {rating.stars}
            </a>
            <div className="w-3/4 h-3 mx-4 bg-gray-200 rounded dark:bg-gray-700">
              <div
                className="h-3 bg-bluedark rounded"
                style={{ width: `${rating.percentage}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {rating.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rating;
