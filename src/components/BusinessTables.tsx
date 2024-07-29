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
    <div className="relative table-container overflow-x-auto overflow-y-auto sm:rounded-lg border border-gray-200 max-h-[400px]">
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
    <div className="container mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Business and Review Management</h2>
      <div className="flex mb-6">
        <button
          onClick={() => handleTabChange('reported')}
          className={`px-4 py-2 rounded-t-lg ${selectedTab === 'reported' ? 'bg-gray-100 border-b-2 border-primary' : 'bg-gray-200'}`}
        >
          Reported Businesses
        </button>
        <button
          onClick={() => handleTabChange('appealed')}
          className={`px-4 py-2 rounded-t-lg ${selectedTab === 'appealed' ? 'bg-gray-100 border-b-2 border-primary' : 'bg-gray-200'}`}
        >
          Appealed Businesses
        </button>
        <button
          onClick={() => handleTabChange('reviews')}
          className={`px-4 py-2 rounded-t-lg ${selectedTab === 'reviews' ? 'bg-gray-100 border-b-2 border-primary' : 'bg-gray-200'}`}
        >
          Reported Reviews
        </button>
      </div>
      {selectedTab === 'reported' && renderReportedBusinesses()}
      {selectedTab === 'appealed' && renderAppealedBusinesses()}
      {selectedTab === 'reviews' && renderReportedReviews()}

      <Modal show={showPopup} onClose={() => setShowPopup(false)} size="lg" className="flex items-center justify-center min-h-screen">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this item?
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

      <Modal show={showBanPopup} onClose={() => setShowBanPopup(false)} size="lg" className="flex items-center justify-center min-h-screen">
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

      <Modal show={showConsiderPopup} onClose={() => setShowConsiderPopup(false)} size="lg" className="flex items-center justify-center min-h-screen">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Do you want to consider this business for appeal?
            </h3>
            <div className="flex justify-center gap-4 pb-6">
              <Button className="bg-blue2 hover:bg-blue-700" onClick={handleConsider}>
                Yes, consider
              </Button>
              <Button className="bg-gray-500 hover:bg-gray-600" onClick={() => setShowConsiderPopup(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showKeepPopup} onClose={() => setShowKeepPopup(false)} size="lg" className="flex items-center justify-center min-h-screen">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to keep this review?
            </h3>
            <div className="flex justify-center gap-4 pb-6">
              <Button className="bg-green-600 hover:bg-green-700" onClick={handleKeep}>
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
              <Button className="bg-red-600 hover:bg-red-700" onClick={handleRemove}>
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

export default BusinessAndReviewTables;
