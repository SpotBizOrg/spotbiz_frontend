// src/pages/BusinessList.tsx
import React, { useEffect, useState } from "react";
import Adminnavbar from "../components/Adminnavbar";
import Adminsidebar from "../components/Adminsidebar";
import Container from "../components/Container";
import { Modal, TextInput, Label, Tooltip } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { IconButton } from "@mui/material";
import {
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";

const dummyBusinesses = [
  {
    businessId: 1,
    businessRegNo: "PV 12345",
    businessName: "Tech Innovators Pvt Ltd",
    representerName: "Nimal Perera",
    representerEmail: "nimal@example.com",
  },
  {
    businessId: 2,
    businessRegNo: "PB 67890",
    businessName: "Global Holdings PLC",
    representerName: "Samanthi Silva",
    representerEmail: "samanthi@example.com",
  },
  {
    businessId: 3,
    businessRegNo: "S 23456",
    businessName: "Golden Enterprises",
    representerName: "Sunil Rathnayake",
    representerEmail: "sunil@example.com",
  },
  {
    businessId: 4,
    businessRegNo: "GA 78901",
    businessName: "Helping Hands Foundation",
    representerName: "Anura Bandara",
    representerEmail: "anura@example.com",
  },
  {
    businessId: 5,
    businessRegNo: "FC 34567",
    businessName: "Tech Solutions International",
    representerName: "Kumar Wijesinghe",
    representerEmail: "kumar@example.com",
  },
  {
    businessId: 6,
    businessRegNo: "BR 89012",
    businessName: "Finance Experts Branch",
    representerName: "Nayana Jayawardena",
    representerEmail: "nayana@example.com",
  },
  {
    businessId: 7,
    businessRegNo: "PV 45678",
    businessName: "Innovative Minds Pvt Ltd",
    representerName: "Mahesh Kumara",
    representerEmail: "mahesh@example.com",
  },
  {
    businessId: 8,
    businessRegNo: "PB 90123",
    businessName: "Global Ventures PLC",
    representerName: "Chandana Perera",
    representerEmail: "chandana@example.com",
  },
  {
    businessId: 9,
    businessRegNo: "S 56789",
    businessName: "Creative Solutions",
    representerName: "Rajitha Fernando",
    representerEmail: "rajitha@example.com",
  },
  {
    businessId: 10,
    businessRegNo: "GA 12345",
    businessName: "Green Earth Initiative",
    representerName: "Kusum Senanayake",
    representerEmail: "kusum@example.com",
  },
];

const BusinessPage: React.FC = () => {
  useEffect(() => {
    document.title = "SpotBiz | Business List | Admin";
  }, []);

  const [businesses, setBusinesses] = useState(dummyBusinesses);
  const [showForm, setShowForm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentBusinessId, setCurrentBusinessId] = useState<number | null>(
    null
  );
  const [newBusiness, setNewBusiness] = useState({
    id: businesses.length + 1,
    businessRegNo: "",
    businessName: "",
    representerName: "",
    representerEmail: "",
  });

  const [editBusiness, setEditBusiness] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDeleteBusiness = () => {
    setBusinesses(
      businesses.filter((business) => business.businessId !== currentBusinessId)
    );
    setShowPopup(false);
    setCurrentBusinessId(null);
  };

  const handleEditBusiness = () => {
    setBusinesses(
      businesses.map((business) =>
        business.businessId === editBusiness.id ? editBusiness : business
      )
    );
    setShowEditForm(false);
    setEditBusiness(null);
  };

  const filteredBusinesses = businesses.filter((business) =>
    business.businessName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <Adminnavbar />
      <Adminsidebar selectedTile="Business List" />
      <div className="px-12 sm:ml-64 mt-20">
        <div className="flex justify-between items-center w-full mb-5 ">
          <h1 className="text-subsubheading text-bluedark">Business List</h1>
        </div>
        <div className="flex items-center justify-between w-full mb-5">
          <div className="flex justify-end w-full">
            <div className="flex w-full max-w-xs relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border p-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                required
              />
              <button
                type="submit"
                className="p-2 ml-2 text-sm font-medium text-white bg-bluedark rounded-lg border border-bluedark hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </div>
        <div className="relative overflow-x-auto overflow-y-auto sm:rounded-lg border border-gray-200">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="table-header text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3"
                  style={{ minWidth: "100px" }}
                >
                  Business ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3"
                  style={{ minWidth: "150px" }}
                >
                  <div className="flex items-center">Business Reg No</div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3"
                  style={{ minWidth: "150px" }}
                >
                  <div className="flex items-center">Business Name</div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3"
                  style={{ minWidth: "100px" }}
                >
                  <div className="flex items-center">Representer Name</div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3"
                  style={{ minWidth: "100px" }}
                >
                  <div className="flex items-center">Representer Email</div>
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 "
                  style={{ minWidth: "150px" }}
                >
                  <div className="flex items-center">Action</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBusinesses.map((business) => (
                <tr
                  key={business.businessId}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{business.businessId}</td>
                  <td className="px-6 py-4">{business.businessRegNo}</td>
                  <td className="px-6 py-4">{business.businessName}</td>
                  <td className="px-6 py-4">{business.representerName}</td>
                  <td className="px-6 py-4">{business.representerEmail}</td>
                  <td className="px-6 py-4 flex items-center">
                    <Tooltip content="Ban Business" style="light">
                      <IconButton
                        color="default"
                        onClick={() => {
                          setShowPopup(true);
                        }}
                      >
                        <BlockIcon />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        show={showPopup}
        onClose={() => setShowPopup(false)}
        popup
        className="flex items-center justify-center inset-2/4 inset-y-1/2"
        theme={{
          content: {
            base: "bg-white w-3/4 rounded-lg",
            inner: "p-6 rounded-lg shadow-lg",
          },
        }}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to ban this business?
            </h3>
            <div className="flex justify-center gap-4 pb-6">
              <button
                className="p-2 text-sm font-medium text-white bg-red-600 rounded-lg border border-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
                onClick={handleDeleteBusiness}
              >
                Yes, I'm sure
              </button>
              <button
                className="p-2 text-sm font-medium text-white bg-gray-500 rounded-lg border border-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300"
                onClick={() => setShowPopup(false)}
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
