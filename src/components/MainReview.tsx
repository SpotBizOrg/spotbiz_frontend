import React from 'react';
import { FaFlag, FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState, useRef } from 'react';
import { BACKEND_URL } from '../../config';
import axios from 'axios';


interface MainReviewProps {
    rating: number;
    description: string;
    date: string;
    userId: number;
    businessId: number;
    title: string;
    storedEmail: string;
}





const MainReview: React.FC<MainReviewProps> = ({ rating, description, date, userId, businessId, title, storedEmail }) => {
  const [openModal1, setOpenModal1] = useState(false);
  const titleInputRef1 = useRef<HTMLInputElement>(null);
  const [openModal2, setOpenModal2] = useState(false);
  const titleInputRef2 = useRef<HTMLInputElement>(null);
  const [reviewTitle, setReviewTitle] = useState<string>('');
  const [reviewDescription, setReviewDescription] = useState<string>('');
  const [reportReason, setReportReason] = useState<string>('');

  const storedUserId = localStorage.getItem('user_id');

  const closeModal1 = () => {
    setOpenModal1(false);
  };
  const closeModal2 = () => {
    setOpenModal2(false);
  };

  const navigate = useNavigate();

  function navigateToPage() {
    navigate('/customer/reviews');
  }

  const formatDate = (inputDate: string): string => {
    const date = new Date(inputDate);
  
    // Define options for formatting the date
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long", // Full month name like 'July'
      day: "numeric", // Day of the month like '26'
    };
  
    // Format the date
    return date.toLocaleDateString("en-US", options);
  };

  const openAddReviwModal = () => {
    setOpenModal1(true);
  }

  const openReportModal = () => {
    setOpenModal2(true);
  }

  const saveReportRequest =  () => {
    console.log(reportReason);
    setReportReason('');
    closeModal2();
    
  }

  const saveReview = async () => {
    const url = `${BACKEND_URL}/review/create/${storedEmail}`;

    const body = JSON.stringify({
      title: reviewTitle,
      description: reviewDescription,
      rating: 0,
      userId: storedUserId,
      businessId: businessId,
      date: new Date().toISOString()
    })

    try{
      const response = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      // setReviewTitle('');
      // setReviewDescription('');
      closeModal1();
    } catch (error) {
      console.error(error);
    }
    

  }
  

  return (
    <>
      <div className="max-w-sm pl-4 pt-4 pr-4 pb-2 bg-white rounded-lg shadow-md border border-gray-300 text-bodysmall">
        <div className="p-2 border border-gray-400 rounded text-center">
          <p className="font-bold text-bluedark text-bodymedium">Reviews</p>
        </div>
        <div className="mt-4 mb-2">
          <p className="font-semibold text-gray-800">{title}</p>
          <div className="flex items-center text-yellow-400">
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
        <p className="text-gray-700 mb-4">
          {description}
        </p>
        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          <span className="text-gray-500 text-body">{formatDate(date)}</span>
          <button
            onClick={navigateToPage}
            className="text-sm bg-gray-800 text-white px-3 py-1 rounded-lg hover:bg-gray-500"
          >
            See more
          </button>
        </div>
        <div className="flex p-2 gap-6 flex-row justify-center text-bodysmall text-gray-600 mt-2">
          <div onClick={openAddReviwModal} className="flex flex-row items-center gap-2 cursor-pointer">
            <HiPencilAlt />
            <p>Add</p>
          </div>

          {/* redner add reivew modal */}
          <Modal
            show={openModal1}
            popup
            onClose={closeModal1}
            initialFocus={titleInputRef1}
            theme={{
              content: {
                base: "bg-white w-3/4 rounded-lg", // Added rounded-lg here
              },
            }}
          >
            <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-600 pb-2 mb-4">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Add a Review
                </h3>
                <button
                  aria-label="Close"
                  onClick={closeModal1}
                  className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white p-1.5 rounded-lg"
                  type="button"
                >
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-5 w-5"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="title" value="Review Title" />
                  <TextInput
                    id="title"
                    ref={titleInputRef1}
                    placeholder="Title of your review"
                    required
                    className="mt-1 p-2.5 text-sm"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="review" value="Your Review" />
                  <textarea
                    id="review"
                    rows={4}
                    className="block w-full mt-1 p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write your review here"
                    required
                    value={reviewDescription}
                    onChange={(e) => setReviewDescription(e.target.value)}
                  ></textarea>
                </div>
                <p className='text-xs text-gray-500'>*Ratings will be automatically calculated based on your review</p>
                <div className="flex justify-between">
                  <Button onClick={closeModal1} className="bg-bluedark">
                    Cancel
                  </Button>
                  <Button onClick={saveReview} className="bg-bluedark">
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </Modal>
          <div onClick={openReportModal} className="flex flex-row items-center gap-2 cursor-pointer">
            <FaFlag />
            <p>Report</p>
          </div>
          <Modal
            show={openModal2}
            popup
            onClose={closeModal2}
            initialFocus={titleInputRef2}
            theme={{
              content: {
                base: "bg-white w-3/4 rounded-lg", // Added rounded-lg here
              },
            }}
          >
            <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-600 pb-2 mb-4">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Report Business
                </h3>
                <button
                  aria-label="Close"
                  onClick={closeModal2}
                  className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white p-1.5 rounded-lg"
                  type="button"
                >
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-5 w-5"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="review" value="Why do you want to report this business?" />
                  <textarea
                    id="report"
                    rows={4}
                    className="block w-full mt-1 p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write your reason here"
                    required
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                  ></textarea>
                </div>
                <div className="flex justify-between">
                  <Button onClick={closeModal2} className="bg-bluedark">
                    Cancel
                  </Button>
                  <Button onClick={saveReportRequest} className="bg-bluedark">
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default MainReview;
