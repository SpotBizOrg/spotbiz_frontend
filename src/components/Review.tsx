import React, { useEffect, useState } from "react";
import { Card, Avatar, Rating } from "flowbite-react";
import { toast } from "react-toastify";

interface ReviewProps {
  userType: "business" | "regular";
  reviewerName: string;
  reviewDate: string;
  reviewTitle: string;
  reviewText: string;
  reviewerAvatar: string;
  rating: number;
  isReported: string;
  reviewId: number;
}

const Review: React.FC<ReviewProps> = ({
  userType,
  reviewerName,
  reviewDate,
  reviewTitle,
  reviewText,
  reviewerAvatar,
  rating,
  isReported,
  reviewId,
}) => {
  const [isFullReviewShown, setIsFullReviewShown] = useState(false);
  const [reportStatus, setReportStatus] = useState(isReported);

  useEffect(() => {
    setReportStatus(isReported);
  }, [isReported]);

  const toggleFullReview = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsFullReviewShown(!isFullReviewShown);
  };

  const truncatedReview =
    reviewText.length > 100 && !isFullReviewShown
      ? reviewText.slice(0, 100) + "..."
      : reviewText;

  const handleReport = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/review-report/mark/${reviewId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setReportStatus("REPORTED");
        toast.success("Review has been successfully reported.");
      } else {
        toast.error("Failed to report the review. Please try again.");
      }
    } catch (error) {
      console.error("Error reporting review:", error);
      toast.error("An error occurred while reporting the review.");
    }
  };

  return (
    <Card className="w-full">
      <div className="flex items-center mb-4">
        <Avatar img={reviewerAvatar} rounded />
        <div className="font-medium dark:text-white ml-4">
          <p>{reviewerName}</p>
        </div>
      </div>
      <div className="flex items-center mb-1 space-x-1">
        <Rating>
          {[...Array(5)].map((_, i) => (
            <Rating.Star key={i} filled={i < rating} />
          ))}
        </Rating>
        <h3 className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
          {reviewTitle}
        </h3>
      </div>
      <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
        <p>
          Reviewed on <time dateTime={reviewDate}>{reviewDate}</time>
        </p>
      </footer>
      <p className="mb-2 text-gray-500 dark:text-gray-400">
        {isFullReviewShown ? reviewText : truncatedReview}
      </p>

      {reviewText.length > 100 && (
        <a
          href="#"
          onClick={toggleFullReview}
          className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          {isFullReviewShown ? "Read less" : "Read more"}
        </a>
      )}

      {userType === "business" && (
        <aside>
          <div className="flex items-center mt-3">
            {reportStatus === "REPORTED" ? (
              <button
                className="px-2 py-1.5 text-xs font-medium text-gray-900 focus:outline-none bg-gray-200 rounded-lg border border-gray-200   focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 cursor-not-allowed "
                disabled
              >
                Reported
              </button>
            ) : (
              <button
                onClick={handleReport}
                className="px-2 py-1.5 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Report abuse
              </button>
            )}
          </div>
        </aside>
      )}
    </Card>
  );
};

export default Review;
