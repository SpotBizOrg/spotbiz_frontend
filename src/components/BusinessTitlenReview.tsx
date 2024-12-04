import React from 'react';
import { FaMapMarkerAlt, FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

interface WeeklySchedule {
  startTime: string;
  endTime: string;
  specialNote: string;
  isOpen: boolean;
}

interface BusinessTitlenReviewProps {
  businessName: string;
  location: string;
  rating: number;
  totReviws: number;
  weeklySchedule?: {
    Monday: WeeklySchedule;
    Tuesday: WeeklySchedule;
    Wednesday: WeeklySchedule;
    Thursday: WeeklySchedule;
    Friday: WeeklySchedule;
    Saturday: WeeklySchedule;
    Sunday: WeeklySchedule;
  }
}



const BusinessTitlenReview: React.FC<BusinessTitlenReviewProps> = ({ businessName, location, rating, totReviws, weeklySchedule}) => {

  // Helper function to convert time strings like "22:00" to Date objects
  const getTimeAsDate = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0); // Set the hours, minutes, seconds, and milliseconds
    return date;
  };

  // Get the current day and time in Sri Lanka time zone
  const today = new Date();
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDay = daysOfWeek[today.getDay()];  

  // Convert the Sri Lankan time to a comparable Date object
  const currentTime = new Date().toLocaleString("en-US", { 
    timeZone: "Asia/Colombo", 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: false // 24-hour format
  });
  const currentSriLankanTime = getTimeAsDate(currentTime);
  console.log(currentSriLankanTime);
  
  

  // Initialize the status, defaulting to "Open Now"
  let updatedStatus = "Open Now";

  // If weeklySchedule exists, use it to determine the status
  if (weeklySchedule) {
    const todaySchedule = weeklySchedule[currentDay as keyof typeof weeklySchedule];
    console.log(todaySchedule);
    
    

    if (todaySchedule && todaySchedule.isOpen) {
      const startTime = getTimeAsDate(todaySchedule.startTime);
      const endTime = getTimeAsDate(todaySchedule.endTime);      
      

      // Check if current time is within startTime and endTime
      if (currentSriLankanTime.getTime() >= startTime.getTime() && currentSriLankanTime.getTime() <= endTime.getTime()) { 
        updatedStatus = "Open Now";
      } else {
        updatedStatus = "Closed Now";
      }
    } else {
      updatedStatus = "Closed Now";
    }
  } else {
    updatedStatus = "Open Now"
  }


  return (
    <div className="bg-white border border-gray-300 p-4 rounded-md shadow-md space-y-2 mb-5 flex justify-between items-center px-10">
      <div>
        <h1 className="text-subheading font-bold text-bluedark">{businessName}</h1>
        <div className="flex items-center text-gray-800 mb-3">
          <FaMapMarkerAlt className="mr-1" />
          <p>{location}</p>
        </div>
        {
          updatedStatus === "Open Now" ? (
            <div className="w-40 border border-green-500 text-green-500 font-bold px-4 py-1 rounded-md text-center text-bodysmall mb-2">{updatedStatus}</div>
          ) : (
            <div className="w-40 border border-red-500 text-red-500 font-bold px-4 py-1 rounded-md text-center text-bodysmall mb-2">{updatedStatus}</div>
          )
        }
        

      </div>
      <div className="text-right">
        <p className="text-blue-900 font-bold">Ratings & Reviews</p>
        <div className="flex items-center">
          <span className="text-3xl font-bold text-blue-900">{rating}</span>
          <span className="ml-1">out of </span>
          <span className="ml-1">{totReviws}</span>
          <div className="flex ml-2">
            {
              Array.from({ length: 5 }).map((_, index) => {
                if (index < Math.floor(rating)) {
                  return <FaStar key={index} className="text-gray-800" />;
                } else if (index === Math.floor(rating) && rating % 1 !== 0) {
                  return <FaStarHalfAlt key={index} className="text-gray-800" />;
                } else {
                  return <FaRegStar key={index} className="text-gray-800" />;
                }
              })
            }
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessTitlenReview;
