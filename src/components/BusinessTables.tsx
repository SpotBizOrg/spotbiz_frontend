import React, { useEffect, useState } from 'react';
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { IconButton } from "@mui/material";
import { Delete as DeleteIcon, Block as BlockIcon, Edit as EditIcon, CheckCircle as CheckCircleIcon, Cancel as CancelIcon } from "@mui/icons-material";
import { BACKEND_URL } from '../../config';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';


const BusinessAndReviewTables: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('reported');
  const [showPopup, setShowPopup] = useState(false);
  const [showAppealDiscardPopup, setAppealDiscardPopup] = useState(false);
  const [showBanPopup, setShowBanPopup] = useState(false);
  const [showConsiderPopup, setShowConsiderPopup] = useState(false);
  const [showKeepPopup, setShowKeepPopup] = useState(false);
  const [showRemovePopup, setShowRemovePopup] = useState(false);
  const [currentItemId, setCurrentItemId] = useState<number>(0);
  const [reportedBusinesses, setReportedBusinesses] = useState<any[]>([]);
  const [appealedBusinesses, setAppealedBusinesses] = useState<any[]>([]);
  const [reportedReviews, setReportedReviews] = useState<any[]>([]);

  useEffect(() => {
    console.log(`Selected tab: ${selectedTab}`);

    if (selectedTab === 'reported') {
      getBusinessReports();
    } else if (selectedTab === 'appealed') {
      getBusinessAppeals();
    } else if (selectedTab === 'reviews') {
      getReviewReports();
    }
  }, [selectedTab]);

  const getBusinessReports = async () => {
    try{
      const url = `${BACKEND_URL}/reported-business/all`;

      const response = await axios.get(url);
      // console.log(response.data);

      const formattedData = response.data.map((item: any) => ({
        reportId: item.reportId,
        BusinessId: item.business.businessId,
        BusinessName: item.business.name,
        reason: item.reason,
      }));
      
      setReportedBusinesses(formattedData); 
      
      console.log(reportedBusinesses);
      
    } catch (error) {
      console.error('Error fetching reported businesses:', error);
    }
  }

  const getBusinessAppeals = async () => {
    try{
      const url = `${BACKEND_URL}/business-appeal/all`;

      const response = await axios.get(url);
      console.log(response.data);

      const formattedData = response.data.map((item: any) => ({
        appealId: item.appealId,
        id: item.reportedBusiness.reportId,
        name: item.business.name,
        reason: item.reason,
      }));

      setAppealedBusinesses(formattedData);
      console.log(appealedBusinesses);
      
      
    } catch (error) {
      console.error('Error fetching reported businesses:', error);
    }
  }

  const getReviewReports = async () => {
    try{
      const url = `${BACKEND_URL}/review-report/all`;

      const response = await axios.get(url);
      console.log(response.data);

      const formattedData = response.data.map((item: any) => ({
        id: item.reviewId,
        reviewerId: item.user.userId,
        name: item.business.name,
        reason: item.description,

      }));

      setReportedReviews(formattedData);

    } catch (error) {
      console.error('Error fetching reported businesses:', error);
    }
  }

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  const handleDelete = async () => {
    try {
      
      const url = `${BACKEND_URL}/reported-business/delete?reportId=${currentItemId}`;
      const response = await axios.put(url);  // Assuming the API returns success response
  
      setShowPopup(false);
  
      // Show success toast and reload page after it's dismissed
      toast.success('Report Request Deleted', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        onClose: () => window.location.reload(),
      });
  
    } catch (error) {
      setShowPopup(false);
      console.error('Failed to delete the report request:', error);
  
      // Handle and show error if the API call fails
      toast.error('Failed to delete the report request', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };
  

  const handleBan = () => {
    try {
      
      console.log(`Business ${currentItemId} banned.`);
      
      const url = `${BACKEND_URL}/reported-business/ban?reportId=${currentItemId}`;
      axios.put(url);  // Assuming the API returns success response
  
      setShowBanPopup(false);

  
      // Show success toast and reload page after it's dismissed
      toast.success('Account was banned!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        onClose: () => window.location.reload(),
      });
  
    } catch (error) {
      setShowBanPopup(false);

      console.error('Failed to delete the report request:', error);
  
      // Handle and show error if the API call fails
      toast.error('Failed to ban the account', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handleConsider = () => {
    try {
      
      // console.log(`Business ${currentItemId} banned.`);
      
      const url = `${BACKEND_URL}/business-appeal/update/${currentItemId}?status=APPROVED`;
      axios.put(url);  // Assuming the API returns success response
  
      setShowConsiderPopup(false);

  
      // Show success toast and reload page after it's dismissed
      toast.success('Success!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        onClose: () => window.location.reload(),
      });
  
    } catch (error) {
      setShowConsiderPopup(false);

      console.error('Failed to update status:', error);
  
      // Handle and show error if the API call fails
      toast.error('Error occured', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    
  };

  const handleAppealDiscard = () => {
    try {
      
      // console.log(`Business ${currentItemId} banned.`);
      
      const url = `${BACKEND_URL}/business-appeal/update/${currentItemId}?status=REJECTED`;
      axios.put(url);  // Assuming the API returns success response
  
      setAppealDiscardPopup(false);

  
      // Show success toast and reload page after it's dismissed
      toast.success('Appeal rejected!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        onClose: () => window.location.reload(),
      });
  
    } catch (error) {
      setAppealDiscardPopup(false);

      console.error('Failed to update status:', error);
  
      // Handle and show error if the API call fails
      toast.error('Error occured', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    
  };

  const handleKeep = () => {
    try {
 
      const url = `${BACKEND_URL}/review-report/action/${currentItemId}?action=KEEP`;
      axios.put(url);  // Assuming the API returns success response
  
      setShowKeepPopup(false);
  
      // Show success toast and reload page after it's dismissed
      toast.success('Review Kept!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        onClose: () => window.location.reload(),
      });
  
    } catch (error) {
      setShowKeepPopup(false);

      console.error('Failed to update status:', error);
  
      // Handle and show error if the API call fails
      toast.error('Error occured', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handleRemove = () => {
    try {
           
      const url = `${BACKEND_URL}/review-report/action/${currentItemId}?action=DELETE`;
      axios.put(url);  // Assuming the API returns success response
  
      setShowKeepPopup(false);
  
      // Show success toast and reload page after it's dismissed
      toast.success('Review Deleted!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        onClose: () => window.location.reload(),
      });
  
    } catch (error) {
      setShowKeepPopup(false);

      console.error('Failed to update status:', error);
  
      // Handle and show error if the API call fails
      toast.error('Error occured', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
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
    const headers = ['Report ID','Business ID', 'Business Name', 'Reason for Reporting'];
    const actions = reportedBusinesses.map((business) => (
      <>
        <IconButton
          color="default"
          onClick={() => {
            setCurrentItemId(business.reportId);
            setShowBanPopup(true);
          }}
        >
          <BlockIcon />
        </IconButton>
        <IconButton
          color="error"
          onClick={() => {
            setCurrentItemId(business.ReportId);
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
    const headers = ['Appeal ID','ReportId', 'Business Name', 'Reason for Appealing'];
    const actions = appealedBusinesses.map((appeal) => (
      <>
        <IconButton
          color="default"
          onClick={() => {
            setCurrentItemId(appeal.appealId);
            setShowConsiderPopup(true);
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="error"
          onClick={() => {
            setCurrentItemId(appeal.appealId);
            setAppealDiscardPopup(true);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </>
    ));

    return renderTable(appealedBusinesses, headers, actions);
  };

  const renderReportedReviews = () => {
    const headers = ['Review ID', 'Reviewer ID', 'Business Name', 'Review Description'];
    const actions = reportedReviews.map((review) => (
      <>
        <IconButton
          color="default"
          onClick={() => {
            setCurrentItemId(review.id);
            setShowKeepPopup(true);
          }}
        >
          <CheckCircleIcon />
        </IconButton>
        <IconButton
          color="error"
          onClick={() => {
            setCurrentItemId(review.id);
            setShowRemovePopup(true);
          }}
        >
          <CancelIcon />
        </IconButton>
      </>
    ));

    return renderTable(reportedReviews, headers, actions);
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
              Are you sure you want to delete?
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

      <Modal show={showAppealDiscardPopup} onClose={() => setAppealDiscardPopup(false)} popup className="flex items-center justify-center inset-2/4 inset-y-1/2" theme={{
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
              Are you sure you want to discard this?
            </h3>
            <div className="flex justify-center gap-4 pb-6">
              <Button className="bg-red-600 hover:bg-red-700" onClick={handleAppealDiscard}>
                Yes, I'm sure
              </Button>
              <Button className="bg-gray-500 hover:bg-gray-600" onClick={() => setAppealDiscardPopup(false)}>
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
