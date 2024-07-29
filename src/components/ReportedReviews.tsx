import React, { useState } from 'react';
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { CheckCircle as CheckCircleIcon, Cancel as CancelIcon } from "@mui/icons-material";

const reviews = [
  { reviewId: 'R001', businessId: 'B001', description: 'Inappropriate content' },
  { reviewId: 'R002', businessId: 'B002', description: 'Spam' },
  { reviewId: 'R003', businessId: 'B003', description: 'Offensive language' },
];

const ReportedReviews: React.FC = () => {
  const [showKeepPopup, setShowKeepPopup] = useState(false);
  const [showRemovePopup, setShowRemovePopup] = useState(false);
  const [currentReviewId, setCurrentReviewId] = useState<string | null>(null);

  const handleKeepReview = () => {
    // Logic for keeping the review
    console.log(`Review ${currentReviewId} kept.`);
    setShowKeepPopup(false);
  };

  const handleRemoveReview = () => {
    // Logic for removing the review
    console.log(`Review ${currentReviewId} removed.`);
    setShowRemovePopup(false);
  };

  return (
    <div className="container mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Reported Reviews</h2>
      </div>
      <div className="relative table-container overflow-x-auto overflow-y-auto sm:rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="table-header text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Review ID</th>
              <th scope="col" className="px-6 py-3">Business ID</th>
              <th scope="col" className="px-6 py-3">Review Description</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.reviewId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">{review.reviewId}</td>
                <td className="px-6 py-4">{review.businessId}</td>
                <td className="px-6 py-4">{review.description}</td>
                <td className="px-0 py-4 flex gap-2 justify-start">
                  <button 
                    className="bg-yellow-500 text-white px-4 py-2 rounded-full"
                    onClick={() => {
                      setCurrentReviewId(review.reviewId);
                      setShowKeepPopup(true);
                    }}
                  >
                    <CheckCircleIcon />
                  </button>
                  <button 
                    className="bg-red-500 text-white px-4 py-2 rounded-full"
                    onClick={() => {
                      setCurrentReviewId(review.reviewId);
                      setShowRemovePopup(true);
                    }}
                  >
                    <CancelIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={showKeepPopup} onClose={() => setShowKeepPopup(false)} size="lg" className="flex items-center justify-center min-h-screen">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to keep this review?
            </h3>
            <div className="flex justify-center gap-4 pb-6">
              <Button className="bg-green-600 hover:bg-green-700" onClick={handleKeepReview}>
                Yes, keep
              </Button>
              <Button className="bg-gray-500 hover:bg-gray-600" onClick={() => setShowKeepPopup(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showRemovePopup} onClose={() => setShowRemovePopup(false)} size="lg" className="flex items-center justify-center min-h-screen">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to remove this review?
            </h3>
            <div className="flex justify-center gap-4 pb-6">
              <Button className="bg-red-600 hover:bg-red-700" onClick={handleRemoveReview}>
                Yes, remove
              </Button>
              <Button className="bg-gray-500 hover:bg-gray-600" onClick={() => setShowRemovePopup(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ReportedReviews;
