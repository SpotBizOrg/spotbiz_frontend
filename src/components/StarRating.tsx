import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({
  avgReview,
  reviewCount,
}: {
  avgReview: number;
  reviewCount: number;
}) => {
  const maxStars = 5;
  const filledStars = Math.floor(avgReview);
  const hasHalfStar = avgReview % 1 >= 0.5;
  const emptyStars = maxStars - filledStars - (hasHalfStar ? 1 : 0);

  return (
    <>
      {Array(filledStars)
        .fill(0)
        .map((_, index) => (
          <FaStar key={`filled-${index}`} className="text-yellow-500" />
        ))}
      {hasHalfStar && <FaStarHalfAlt className="text-yellow-500" />}
      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <FaRegStar key={`empty-${index}`} className="text-gray-400" />
        ))}
    </>
  );
};

export default StarRating;
