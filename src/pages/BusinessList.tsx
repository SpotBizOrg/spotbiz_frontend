// src/pages/BusinessList.tsx
import React, { useEffect, useState } from 'react';
import Adminnavbar from '../components/Adminnavbar';
import Adminsidebar from '../components/Adminsidebar';
import Container from '../components/Container';
import { Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import BusinessList from '../components/BusinessList';

interface Business {
  id: string;
  businessName: string;
  name: string;
  status: string;
  address: string;
  phoneNo: string;
  email: string;
}

const BusinessPage: React.FC = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentBusinessId, setCurrentBusinessId] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'SpotBiz | Business List | Admin';

    // Fetch business owners from the backend API
    fetch('http://localhost:8080/api/v1/admin/users/business-owners')
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setBusinesses(data)})
      .catch((error) => console.error('Error fetching business owners:', error));
  }, []);

  const handleDeleteBusiness = () => {
    if (currentBusinessId) {
      // Call the API to delete the business
      fetch(`/api/admin/delete-business/${currentBusinessId}`, { method: 'DELETE' })
        .then((response) => {
          if (response.ok) {
            // Remove the business from the list
            setBusinesses((prevBusinesses) =>
              prevBusinesses.filter((business) => business.id !== currentBusinessId)
            );
          } else {
            console.error('Failed to delete business');
          }
        })
        .catch((error) => console.error('Error deleting business:', error));
    }

    setShowPopup(false);
    setCurrentBusinessId(null);
  };

  return (
    <Container>
      <Adminnavbar />
      <Adminsidebar selectedTile="Business List" />
      <div className="px-12 sm:ml-64 mt-20">
        <div className="flex justify-between items-center w-full mb-5">
          <h1 className="text-subsubheading text-bluedark">Business List</h1>
        </div>
        <div className="relative overflow-x-auto overflow-y-auto sm:rounded-lg border border-gray-200">
          <BusinessList businesses={businesses} onDeleteClick={(id) => { setCurrentBusinessId(id); setShowPopup(true); }} />
        </div>
      </div>

      <Modal
        show={showPopup}
        onClose={() => setShowPopup(false)}
        popup={true}
      >
        <Modal.Header className="bg-gray-200" />
        <Modal.Body className="bg-gray-200">
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this business?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteBusiness}
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center dark:focus:ring-red-800"
              >
                Yes, I'm sure
              </button>
              <button
                onClick={() => setShowPopup(false)}
                type="button"
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                No, cancel
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default BusinessPage;
