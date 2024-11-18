import { Key, useEffect, useState } from "react";
import Businessnavbar from "../components/Businessnavbar";
import Businesssidebar from "../components/Businesssidebar";
import Container from "../components/Container";
import Plate2 from "../components/Plate2";
import Rating from "../components/Rating";
import Review from "../components/Review";
import SortByDropdown from "../components/SortBy";
import { useAuth } from "../utils/AuthProvider";

interface Review {
  reviewId: Key | null | undefined;
  user: any;
  date: string | number | Date;
  title: string;
  description: string;
  rating: number;
  reviewerName: string;
  reviewDate: string;
  reviewTitle: string;
  reviewText: string;
  reviewerAvatar: string;
}

function Reviews() {
  useEffect(() => {
    document.title = "SpotBiz | Reviews | Business";
  }, []);

  const [selectedOption, setSelectedOption] = useState<string>("");
  const { token, user, checkAuthenticated } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);

  const starCountOptions = [
    "5 Star Reviews",
    "4 Star Reviews",
    "3 Star Reviews",
    "2 Star Reviews",
    "1 Star Reviews",
  ];
  const timeOptions = ["Newest First", "Oldest First"];
  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    // Handle whatever logic you need here based on the selected option
  };

  const fetchReviews = async () => {
    try {
      fetch(`http://localhost:8080/api/v1/review/all/${user?.email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setReviews(data);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <Container>
      <Businessnavbar />
      <Businesssidebar selectedTile="Reviews" />
      <div className="px-12 sm:ml-64 mt-20">
        <div className="w-fit mb-10 border-b-gray-900">
          <h1 className="text-subsubheading text-bluedark">User Reviews</h1>
        </div>
        <Plate2>
          <Rating></Rating>
        </Plate2>
        <div className="md:ml-auto mt-8 space-y-4 md:space-y-0 md:space-x-4 flex flex-wrap md:flex-nowrap justify-end">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-700 mr-2">
              Sort by:
            </span>
            <SortByDropdown
              defaultTitle="Time"
              options={timeOptions}
              onSelect={handleSelectOption}
            />
          </div>
          <div className="flex items-center">
            <SortByDropdown
              defaultTitle="Star Reviews"
              options={starCountOptions}
              onSelect={handleSelectOption}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {reviews.map((review) => (
            <Review
              key={review.reviewId}
              userType="business"
              reviewerName={review.user.name}
              reviewDate={new Date(review.date).toLocaleDateString()}
              reviewTitle={review.title}
              rating={review.rating}
              reviewerAvatar={""}
              isReported={""}
              reviewText={review.description}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}

export default Reviews;
