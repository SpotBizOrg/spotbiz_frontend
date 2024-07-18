function Rating() {
  return (
    <div className="md:grid md:grid-cols-2 gap-x-10">
      <div className="flex flex-col items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-md ">
        <div className="text-subsubheading font-bold text-gray-900 dark:text-white mb-2">
          4.0
        </div>
        <div className="flex justify-between items-center mb-2">
          {[...Array(4)].map((_, index) => (
            <svg
              key={index}
              className="w-6 h-6 text-yellow-300 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          ))}
          <svg
            className="w-6 h-6 text-gray-300 me-1 dark:text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center">
          1,745 ratings
        </p>
      </div>
      <div className="md:col-end-3">
        {[
          { stars: "5 star", percentage: 70 },
          { stars: "4 star", percentage: 17 },
          { stars: "3 star", percentage: 8 },
          { stars: "2 star", percentage: 4 },
          { stars: "1 star", percentage: 1 },
        ].map((rating, index) => (
          <div className="flex items-center mt-4" key={index}>
            <a
              href="#"
              className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              {rating.stars}
            </a>
            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
              <div
                className="h-5 bg-yellow-300 rounded"
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
}

export default Rating;
