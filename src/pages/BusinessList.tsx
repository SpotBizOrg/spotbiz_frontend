// src/pages/BusinessList.tsx
import React, { useEffect, useState } from 'react';
import Adminnavbar from '../components/Adminnavbar';
import Adminsidebar from '../components/Adminsidebar';
import Container from '../components/Container';
// import { Modal, TextInput, Label } from "flowbite-react";
// import { HiOutlineExclamationCircle } from "react-icons/hi";
// import { IconButton } from "@mui/material";
// import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

// Define the API endpoint (adjust this if needed)
const API_URL = "http://localhost:8080/api/v1/admin/business";

interface BusinessList {
  businessId: number;
  name: string;
  email: string;
  contactNo: string;
  status: string;
  address: string;
}

const BusinessListPage: React.FC = () => {
  const [business, setBusiness] = useState<BusinessList[]>([]);
  // const [showForm, setShowForm] = useState(false);
  // const [showPopup, setShowPopup] = useState(false);
  // const [showEditForm, setShowEditForm] = useState(false);
  const [currentBusinessId, setCurrentBusinessId] = useState<number | null>(null);
  const [newBusiness, setNewBusiness] = useState<BusinessList>({
    businessId: business.length + 1,
    name: "",
    email: "",
    contactNo: "",
    status: "",
    address: "",
  });
  const [editBusiness, setEditBusiness] = useState<BusinessList | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch businesses from the API
  const fetchBusinesses = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch businesses.");
      const data = await response.json();
      setBusiness(data);
    } catch (error) {
      console.error("Error fetching businesses:", error);
    }
  };

  useEffect(() => {
    document.title = "SpotBiz | Business List | Admin";
    fetchBusinesses();
  }, []);

  // Add a new business
  const handleAddBusiness = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBusiness),
      });
      if (!response.ok) throw new Error("Failed to add business.");
      const data = await response.json();
      setBusiness([...business, data]);
      // setShowForm(false);
    } catch (error) {
      console.error("Error adding business:", error);
    }
  };

  // Delete a business
  const handleDeleteBusiness = async () => {
    if (currentBusinessId == null) return;
    try {
      const response = await fetch(`${API_URL}/${currentBusinessId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error("Failed to delete business.");
      setBusiness(business.filter(b => b.businessId !== currentBusinessId));
      // setShowPopup(false);
      setCurrentBusinessId(null);
    } catch (error) {
      console.error("Error deleting business:", error);
    }
  };

  // Edit a business
  const handleEditBusiness = async () => {
    if (!editBusiness) return;
    try {
      const response = await fetch(`${API_URL}/${editBusiness.businessId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editBusiness),
      });
      if (!response.ok) throw new Error("Failed to edit business.");
      const updatedBusiness = await response.json();
      setBusiness(business.map(b => b.businessId === updatedBusiness.businessId ? updatedBusiness : b));
      // setShowEditForm(false);
      setEditBusiness(null);
    } catch (error) {
      console.error("Error editing business:", error);
    }
  };

  const filteredBusinesses = business.filter(business =>
    business.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <Adminnavbar />
      <Adminsidebar selectedTile="Business List" />
      <div className="px-12 sm:ml-64 mt-20">
      <div className="flex justify-between items-center w-full mb-5 border-b border-gray-300">
          <h1 className="text-subsubheading text-bluedark">Business List</h1>
        </div>
        <div className="flex justify-end mb-5">
          <div className="flex items-center">
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border p-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for Business..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              required
            />
            <button
              type="submit"
              className="ml-2 p-2 text-sm font-medium text-white bg-bluedark rounded-lg border border-bluedark hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
        <div className="relative overflow-x-auto overflow-y-auto sm:rounded-lg border border-gray-200">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Business Id</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Address</th>
                {/* <th className="px-6 py-3">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {filteredBusinesses.map((b) => (
                <tr key={b.businessId} className="bg-white border-b">
                  <td className="px-6 py-4">{b.businessId}</td>
                  <td className="px-6 py-4">{b.name}</td>
                  <td className="px-6 py-4">{b.email}</td>
                  <td className="px-6 py-4">{b.contactNo}</td>
                  <td className="px-6 py-4">{b.status}</td>
                  <td className="px-6 py-4">{b.address}</td>
                  {/* <td className="px-6 py-4 flex gap-2">
                    <IconButton color="default" onClick={() => { setEditBusiness(b); setShowEditForm(true); }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => { setCurrentBusinessId(b.businessId); setShowPopup(true); }}>
                      <DeleteIcon />
                    </IconButton>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Business Modal */}
      {/* <Modal show={showForm} onClose={() => setShowForm(false)} size="lg">
        <Modal.Header>Add New Business</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <Label htmlFor="name">Name</Label>
            <TextInput
              id="name"
              value={newBusiness.name}
              onChange={(e) => setNewBusiness({ ...newBusiness, name: e.target.value })}
            />
            <Label htmlFor="email">Email</Label>
            <TextInput
              id="email"
              type="email"
              value={newBusiness.email}
              onChange={(e) => setNewBusiness({ ...newBusiness, email: e.target.value })}
            />
            <Label htmlFor="phone">Phone</Label>
            <TextInput
              id="phone"
              value={newBusiness.contactNo}
              onChange={(e) => setNewBusiness({ ...newBusiness, contactNo: e.target.value })}
            />
            <Label htmlFor="status">Status</Label>
            <TextInput
              id="status"
              value={newBusiness.status}
              onChange={(e) => setNewBusiness({ ...newBusiness, status: e.target.value })}
            />
            <Label htmlFor="address">Address</Label>
            <TextInput
              id="address"
              value={newBusiness.address}
              onChange={(e) => setNewBusiness({ ...newBusiness, address: e.target.value })}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="text-white bg-blue-500 px-4 py-2 rounded" onClick={handleAddBusiness}>Add</button>
          <button className="text-gray-700 bg-gray-300 px-4 py-2 rounded" onClick={() => setShowForm(false)}>Cancel</button>
        </Modal.Footer>
      </Modal> */}

      {/* Confirmation Popup for Deletion */}
      {/* <Modal show={showPopup} onClose={() => setShowPopup(false)} size="sm">
        <Modal.Body>
          <HiOutlineExclamationCircle className="text-red-500 w-12 h-12 mx-auto mb-4" />
          <p className="text-center text-lg">Are you sure you want to delete this business?</p>
          <div className="flex justify-around mt-4">
            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDeleteBusiness}>Yes</button>
            <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded" onClick={() => setShowPopup(false)}>Cancel</button>
          </div>
        </Modal.Body>
      </Modal> */}
    </Container>
  );
};

export default BusinessListPage;
