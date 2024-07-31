import { useEffect, useState } from "react";
import Businessnavbar from "../components/Customernavbar2";

import Container from "../components/Container";
import Plate2 from "../components/Plate2";
import Rating from "../components/Rating";
import Review from "../components/CusReview";
import SortByDropdown from "../components/SortBy";
import AddReviewModal from "../components/AddReviewModal";
import Customernavbar2 from "../components/Customernavbar2";

function Reviews() {
  useEffect(() => {
    document.title = "SpotBiz | Reviews | Business";
  }, []);

  const [selectedOption, setSelectedOption] = useState<string>("");

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

  const reviews = [
    {
      reviewerName: "John Doe",
      reviewDate: "2023-01-01",
      reviewTitle: "Amazing Service!",
      reviewText: "The service was excellent and the staff was very friendly.",
      reviewerAvatar:
        "data:image/jpeg;base64,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",
      rating: 5,
    },
    {
      reviewerName: "Jane Smith",
      reviewDate: "2023-02-14",
      reviewTitle: "Good Experience",
      reviewText:
        "I had a good experience. The environment was clean and well maintained.",
      reviewerAvatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?crop=faces&fit=crop&w=256&h=256&q=80",
      rating: 4,
    },
    {
      reviewerName: "Alice Johnson",
      reviewDate: "2023-03-05",
      reviewTitle: "Not Satisfied",
      reviewText:
        "The service was slow and the food was not up to the mark. Would not recommend.",
      reviewerAvatar:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?crop=faces&fit=crop&w=256&h=256&q=80",
      rating: 2,
    },
    {
      reviewerName: "Michael Brown",
      reviewDate: "2023-04-12",
      reviewTitle: "Great Value!",
      reviewText:
        "Great value for money. I would definitely visit again and recommend to others.",
      reviewerAvatar:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?crop=faces&fit=crop&w=256&h=256&q=80",
      rating: 4,
    },
  ];

  return (
    <Container>
      <Customernavbar2 />
    
      <div className="mr-12 ml-12 mt-20">
        <div className="flex justify-between items-center mb-10 border-b-gray-900 w-full">
          <h1 className="text-subsubheading text-bluedark">User Reviews</h1>
          <AddReviewModal />
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
          {reviews.map((review, index) => (
            <Review
              key={index}
              userType="business"
              reviewerName={review.reviewerName}
              reviewDate={review.reviewDate}
              reviewTitle={review.reviewTitle}
              reviewText={review.reviewText}
              reviewerAvatar={review.reviewerAvatar}
              rating={review.rating}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}

export default Reviews;
