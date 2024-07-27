// src/components/Column1.tsx
import React, { useState } from 'react';
import { FaPhone, FaUser, FaMapMarkerAlt, FaPlus, FaFlag, FaTimes, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import image from '../assets/promo.lk-44253997837344f08aed5b131f0bd271.jpg';

const Column1: React.FC = () => {
  const [reportPopupOpen, setReportPopupOpen] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [comment, setComment] = useState('');

  const toggleReportPopup = () => {
    setReportPopupOpen(!reportPopupOpen);
  };

  const handleReportReasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setReportReason(event.target.value);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleSubmitReport = () => {
    console.log('Submitting report:', {
      businessName: 'Abans',
      branch: 'Colombo 7',
      reason: reportReason,
      comment: comment,
    });
    setReportReason('');
    setComment('');
    setReportPopupOpen(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-4xl font-bold text-blue-900">Abans</h2>
        <p className="flex items-center">
          <FaMapMarkerAlt className="mr-2 text-red-500" />
          Colombo 7
        </p>
      </div>
      <div className="bg-white p-4 rounded-md shadow-md space-y-2">
        <div className="flex items-center space-x-2 mb-20">
          <img src={image} alt="Logo" className="h-22 w-22 justify-center" />
        </div>
        <div>
          <p className="flex item-center mb-5 text-lg">
            <FaUser className="mr-2 text-blue-500 text-xl" />R.D.A Chandana
          </p>
          <p className="flex item-center mb-5 text-lg">
            <FaMapMarkerAlt className="mr-2 text-blue-500 text-xl" />Colombo 7
          </p>
          <p className="flex item-center mb-5 text-lg">
            <FaPhone className="mr-2 text-blue-500 text-xl" />011-1234567
          </p>
          <p className="flex item-center mb-5 text-lg">
            <FaFacebookF className="mr-2 text-blue-500 text-xl" />Abans
          </p>
          <p className="flex item-center mb-5 text-lg">
            <FaWhatsapp className="mr-2 text-blue-500 text-xl " />Contact via WhatsApp
          </p>
        </div>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md">Open Now</button>
      </div>
      <div className="bg-white p-4 rounded-md shadow-md">
        <h2 className="mb-4 text-blue-900 font-bold">Customer Review</h2>
        <p className="mb-3 text-xs">S.D Dambagolla</p>
        <p>The selection of electronics and computers is top-notch and always up-to-date.</p>
        <p className="text-xs font-semibold justify-right">2 days ago</p>
      </div>
      <div className="flex flex-col items-start space-y-2">
        <button className="flex items-center text-blue-500 text-1xl font-semibold">
          <FaPlus className="mr-2" />
          Add Review
        </button>
        <button onClick={toggleReportPopup} className="flex items-center text-blue-500 text-1xl font-semibold">
          <FaFlag className="mr-2" />
          Report Business
        </button>
      </div>

      {reportPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
            <button onClick={toggleReportPopup} className="float-right text-red-500">
              <FaTimes />
            </button>
            <h2 className="text-2xl font-bold mb-4 flex item-center justify-center">Report Business</h2>
            <div className="mb-4">
              <label className="block text-xl font-medium text-gray-700 mb-1">Business Name:</label>
              <p>Abans</p>
            </div>
            <div className="mb-4">
              <label className="block text-xl font-medium text-gray-700 mb-1">Branch:</label>
              <p>Colombo 7</p>
            </div>
            <div className="mb-4">
              <label className="block text-xl font-medium text-gray-700 mb-1">Select a reason to report this business:</label>
              <select
                value={reportReason}
                onChange={handleReportReasonChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select...</option>
                <option value="Inappropriate content">Inappropriate content</option>
                <option value="False information">False information</option>
                <option value="Poor customer service">Poor customer service</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-xl font-medium text-gray-700 mb-1">Give us a comment:</label>
              <textarea
                value={comment}
                onChange={handleCommentChange}
                rows={5}
                className="block w-full border-gray-800 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Type your comment here..."
              />
            </div>
            <button
              onClick={handleSubmitReport}
              className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600"
            >
              Report this business
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Column1;
