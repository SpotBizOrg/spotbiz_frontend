import React, { useState } from "react";
import { Card, Avatar, Rating } from "flowbite-react";

interface ReviewProps {
  userType: "business" | "regular";
}

const Review: React.FC<ReviewProps> = ({ userType }) => {
  const [isFullReviewShown, setIsFullReviewShown] = useState(false);

  const toggleFullReview = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault(); // Prevent default anchor behavior
    setIsFullReviewShown(!isFullReviewShown);
  };

  const reviewText =
    "This is my third Invicta Pro Diver. They are just fantastic value for money. This one arrived yesterday and the first thing I did was set the time, popped on an identical strap from another Invicta and went in the shower with it to test the waterproofing. It kept perfect time in the shower and didn't fog up at all. The waterproofing is really impressive for the price. I've been swimming with it, snorkeling, and it's been great. If you're looking for a durable and stylish watch at a reasonable price, the Invicta Pro Diver is a great choice.";

  const truncatedReview =
    reviewText.length > 100 && !isFullReviewShown
      ? reviewText.slice(0, 100) + "..."
      : reviewText;

  return (
    <Card>
      <div className="flex items-center mb-4">
        <Avatar
          img="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          rounded
        />
        <div className="font-medium dark:text-white ml-4">
          <p>Jese Leos</p>
        </div>
      </div>
      <div className="flex items-center mb-1 space-x-1">
        <Rating>
          <Rating.Star filled />
          <Rating.Star filled />
          <Rating.Star filled />
          <Rating.Star filled />
          <Rating.Star />
        </Rating>
        <h3 className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
          Thinking to buy another one!
        </h3>
      </div>
      <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
        <p>
          Reviewed on <time dateTime="2017-03-03 19:00">March 3, 2017</time>
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
            <a
              href="#"
              className="px-2 py-1.5 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Report abuse
            </a>
          </div>
        </aside>
      )}
    </Card>
  );
};

export default Review;
