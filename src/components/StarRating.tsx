const Star = ({ filled }: { filled: boolean }) => (
  <svg
    className={`w-6 h-6 ${filled ? "text-yellow-300" : "text-gray-400"} me-1`}
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 22 20"
  >
    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
  </svg>
);

const HalfStar = () => (
  <svg
    className="w-6 h-6 text-yellow-300 me-1"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 22 20"
  >
    {/* Left (filled) half */}
    <defs>
      <clipPath id="half-clip">
        <rect x="0" y="0" width="11" height="20" />
      </clipPath>
    </defs>
    <path
      d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
      fill="currentColor"
      clipPath="url(#half-clip)"
    />
    {/* Right (unfilled) half */}
    <path
      d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.5"
    />
  </svg>
);

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
    <div className="flex items-center">
      {/* Filled stars */}
      {Array(filledStars)
        .fill(0)
        .map((_, index) => (
          <Star key={`filled-${index}`} filled />
        ))}
      {/* Half star */}
      {hasHalfStar && <HalfStar />}
      {/* Empty stars */}
      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <Star key={`empty-${index}`} filled={false} />
        ))}
    </div>
  );
};

export default StarRating;
