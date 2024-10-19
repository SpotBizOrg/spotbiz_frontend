import React from "react";

interface AdvertisementProps {
  img: string;
  //   date: string;
  details: string;
}

const Advertisement: React.FC<AdvertisementProps> = ({ img, details }) => {
  return (
    <div className="bg-white p-5 rounded-md shadow-md mb-5 border border-gray-300 cursor-pointer transform transition-transform duration-300 hover:scale-105">
      <img
        src={img}
        alt="Ad"
        className="w-full h-auto object-cover rounded-lg mb-5"
      />
      <p className="text-bodylarge">{details}</p>
      {/* <p className="mt-2 text-bodysmall text-gray-600"><b>Posted on:</b> {date}</p> */}
    </div>
  );
};

export default Advertisement;
