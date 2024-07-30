import React, { useState } from 'react';
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { IconButton } from "@mui/material";
import { Delete as DeleteIcon, Block as BlockIcon, Edit as EditIcon, CheckCircle as CheckCircleIcon, Cancel as CancelIcon } from "@mui/icons-material";

const reportedBusinesses = [
  { id: 'B001', name: 'Cozy Home Furnishings', reason: 'Violation of terms' },
  { id: 'B002', name: 'Stellar Styles', reason: 'Fraudulent activity' },
  { id: 'B003', name: 'Luxe Living Store', reason: 'Customer complaints' },
  { id: 'B004', name: 'Turcotte, Wyman and Veum', reason: 'Inappropriate content' },
  { id: 'B005', name: 'Reilly LLC', reason: 'Spam' },
  { id: 'B006', name: 'O\'Conner - Bayer', reason: 'Misleading information' },
];

const appealedBusinesses = [
  { id: 'A001', name: 'Home Comforts', reason: 'Incorrect information' },
  { id: 'A002', name: 'Urban Styles', reason: 'Unfair suspension' },
  { id: 'A003', name: 'Elite Furnishings', reason: 'Misunderstanding' },
  { id: 'A004', name: 'Anderson, Smith and Co.', reason: 'Resolved issues' },
  { id: 'A005', name: 'Modern LLC', reason: 'False claims' },
  { id: 'A006', name: 'Greenfield - Bauer', reason: 'Clarification needed' },
];

const reviews = [
  { reviewId: 'R001', businessId: 'B001', description: 'Inappropriate content' },
  { reviewId: 'R002', businessId: 'B002', description: 'Spam' },
  { reviewId: 'R003', businessId: 'B003', description: 'Offensive language' },
];

const BusinessAndReviewTables: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('reported');
  const [showPopup, setShowPopup] = useState(false);
  const [showBanPopup, setShowBanPopup] = useState(false);
  const [showConsiderPopup, setShowConsiderPopup] = useState(false);
  const [showKeepPopup, setShowKeepPopup] = useState(false);
  const [showRemovePopup, setShowRemovePopup] = useState(false);
  const [currentItemId, setCurrentItemId] = useState<string | null>(null);

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  const handleDelete = () => {
    console.log(`Item ${currentItemId} deleted.`);
    setShowPopup(false);
  };

  const handleBan = () => {
    console.log(`Business ${currentItemId} banned.`);
    setShowBanPopup(false);
  };

  const handleConsider = () => {
    console.log(`Business ${currentItemId} considered for appeal.`);
    setShowConsiderPopup(false);
  };

  const handleKeep = () => {
    console.log(`Review ${currentItemId} kept.`);
    setShowKeepPopup(false);
  };

  const handleRemove = () => {
    console.log(`Review ${currentItemId} removed.`);
    setShowRemovePopup(false);
  };

  const renderTable = (items: any[], headers: string[], actions: JSX.Element[]) => (
    <div className="relative overflow-x-auto overflow-y-auto sm:rounded-lg border border-gray-200">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="sticky top-0 bg-gray-50 text-xs text-gray-700 uppercase z-10">
          <tr>
            {headers.map((header, index) => (
              <th key={index} scope="col" className="px-6 py-3">{header}</th>
            ))}
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800">
          {items.map((item, index) => (
            <tr key={index} className="border-b dark:border-gray-700">
              {Object.values(item).map((value, idx) => (
                <td key={idx} className="px-6 py-4">{value as React.ReactNode}</td>
              ))}
              <td className="px-6 py-4 flex gap-2">
                {actions[index]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  

  const renderReportedBusinesses = () => {
    const headers = ['Business ID', 'Business Name', 'Reason for Reporting'];
    const actions = reportedBusinesses.map((business) => (
      <>
        <IconButton
          color="default"
          onClick={() => {
            setCurrentItemId(business.id);
            setShowBanPopup(true);
          }}
        >
          <BlockIcon />
        </IconButton>
        <IconButton
          color="error"
          onClick={() => {
            setCurrentItemId(business.id);
            setShowPopup(true);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </>
    ));

    return renderTable(reportedBusinesses, headers, actions);
  };

  const renderAppealedBusinesses = () => {
    const headers = ['Business ID', 'Business Name', 'Reason for Appealing'];
    const actions = appealedBusinesses.map((business) => (
      <>
        <IconButton
          color="default"
          onClick={() => {
            setCurrentItemId(business.id);
            setShowConsiderPopup(true);
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="error"
          onClick={() => {
            setCurrentItemId(business.id);
            setShowPopup(true);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </>
    ));

    return renderTable(appealedBusinesses, headers, actions);
  };

  const renderReportedReviews = () => {
    const headers = ['Review ID', 'Business ID', 'Review Description'];
    const actions = reviews.map((review) => (
      <>
        <IconButton
          color="default"
          onClick={() => {
            setCurrentItemId(review.reviewId);
            setShowKeepPopup(true);
          }}
        >
          <CheckCircleIcon />
        </IconButton>
        <IconButton
          color="error"
          onClick={() => {
            setCurrentItemId(review.reviewId);
            setShowRemovePopup(true);
          }}
        >
          <CancelIcon />
        </IconButton>
      </>
    ));

    return renderTable(reviews, headers, actions);
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between w-full mb-5 border-b border-gray-300">
      <div className="space-x-6">
        <button
          onClick={() => handleTabChange('reported')}
          className={`px-0 py-2 pb-[calc(0.5rem - 4px)] rounded focus:outline-none ${selectedTab === 'reported' ? 'text-black border-b-4 border-black' : 'bg-transparent text-blue-500 border-b-4 border-transparent hover:border-b-4 hover:border-gray-300'}`}
        >
          Reported Businesses
        </button>
        <button
          onClick={() => handleTabChange('appealed')}
          className={`px-0 py-2 pb-[calc(0.5rem - 4px)] rounded focus:outline-none ${selectedTab === 'appealed' ? 'text-black border-b-4 border-black' : 'bg-transparent text-blue-500 border-b-4 border-transparent hover:border-b-4 hover:border-gray-300'}`}
        >
          Appealed Businesses
        </button>
        <button
          onClick={() => handleTabChange('reviews')}
          className={`px-0 py-2 pb-[calc(0.5rem - 4px)] rounded focus:outline-none ${selectedTab === 'reviews' ? 'text-black border-b-4 border-black' : 'bg-transparent text-blue-500 border-b-4 border-transparent hover:border-b-4 hover:border-gray-300'}`}
        >
          Reported Reviews
        </button>
      </div>
      <div className="flex items-center space-x-2 mb-1">
        <div className="relative w-full max-w-xs">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none p-0">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input type="text" id="simple-search" className="bg-gray-50 border p-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for games..." required />
        </div>
        <button type="submit" className="p-2 text-sm font-medium text-white bg-bluedark rounded-lg border border-bluedark hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </div>
      </div>
      {selectedTab === 'reported' && renderReportedBusinesses()}
      {selectedTab === 'appealed' && renderAppealedBusinesses()}
      {selectedTab === 'reviews' && renderReportedReviews()}

      <Modal show={showPopup} onClose={() => setShowPopup(false)} popup className="flex items-center justify-center inset-2/4 inset-y-1/2" theme={{
        content: {
          base: "bg-white w-3/4 rounded-lg",
          inner: "p-6 rounded-lg shadow-lg",
        },
      }}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to get this action?
            </h3>
            <div className="flex justify-center gap-4 pb-6">
              <Button className="bg-red-600 hover:bg-red-700" onClick={handleDelete}>
                Yes, I'm sure
              </Button>
              <Button className="bg-gray-500 hover:bg-gray-600" onClick={() => setShowPopup(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showBanPopup} onClose={() => setShowBanPopup(false)} popup className="flex items-center justify-center inset-2/4 inset-y-1/2" theme={{
        content: {
          base: "bg-white w-3/4 rounded-lg",
          inner: "p-6 rounded-lg shadow-lg",
        },
      }}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to ban this business?
            </h3>
            <div className="flex justify-center gap-4 pb-6">
              <Button className="bg-red-600 hover:bg-red-700" onClick={handleBan}>
                Yes, I'm sure
              </Button>
              <Button className="bg-gray-500 hover:bg-gray-600" onClick={() => setShowBanPopup(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showConsiderPopup} onClose={() => setShowConsiderPopup(false)} popup className="flex items-center justify-center inset-2/4 inset-y-1/2" theme={{
        content: {
          base: "bg-white w-3/4 rounded-lg",
          inner: "p-6 rounded-lg shadow-lg",
        },
      }}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Do you want to consider this business for appeal?
            </h3>
            <div className="flex justify-center gap-4 pb-6">
              <Button className="bg-bluedark hover:bg-blue2" onClick={handleConsider}>
                Yes, I'm sure
              </Button>
              <Button className="bg-gray-500 hover:bg-gray-600" onClick={() => setShowConsiderPopup(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showKeepPopup} onClose={() => setShowKeepPopup(false)} popup className="flex items-center justify-center inset-2/4 inset-y-1/2" theme={{
        content: {
          base: "bg-white w-3/4 rounded-lg",
          inner: "p-6 rounded-lg shadow-lg",
        },
      }}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to keep this review?
            </h3>
            <div className="flex justify-center gap-4 pb-6">
              <Button className="bg-bluedark hover:bg-blue2" onClick={handleKeep}>
                Yes, I'm sure
              </Button>
              <Button className="bg-gray-500 hover:bg-gray-600" onClick={() => setShowKeepPopup(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showRemovePopup} onClose={() => setShowRemovePopup(false)} popup className="flex items-center justify-center inset-2/4 inset-y-1/2" theme={{
        content: {
          base: "bg-white w-3/4 rounded-lg",
          inner: "p-6 rounded-lg shadow-lg",
        },
      }}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to remove this review?
            </h3>
            <div className="flex justify-center gap-4 pb-6">
              <Button className="bg-red-600 hover:bg-red-700" onClick={handleRemove}>
                Yes, I'm sure
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

export default BusinessAndReviewTables;
