// src/pages/BusinessList.tsx
import React, { useEffect, useState } from 'react';
import Adminnavbar from '../components/Adminnavbar';
import Adminsidebar from '../components/Adminsidebar';
import Container from '../components/Container';
import { Modal, TextInput, Label } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

const dummyBusinesses = [
  { id: 1, name: "Tech Solutions", email: "contact@techsolutions.com", phone: "123-456-7890", score: 92 },
  { id: 2, name: "Creative Minds", email: "info@creativeminds.com", phone: "098-765-4321", score: 89 },
  { id: 3, name: "Business Corp", email: "support@businesscorp.com", phone: "555-555-5555", score: 88 },
];

const BusinessPage: React.FC = () => {
  useEffect(() => {
    document.title = "SpotBiz | Business List | Admin";
  }, []);

  const [businesses, setBusinesses] = useState(dummyBusinesses);
  const [showForm, setShowForm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentBusinessId, setCurrentBusinessId] = useState<number | null>(null);
  const [newBusiness, setNewBusiness] = useState({
    id: businesses.length + 1,
    name: "",
    email: "",
    phone: "",
    score: 0,
  });
  const [editBusiness, setEditBusiness] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddBusiness = () => {
    setBusinesses([...businesses, newBusiness]);
    setShowForm(false);
  };

  const handleDeleteBusiness = () => {
    setBusinesses(businesses.filter((business) => business.id !== currentBusinessId));
    setShowPopup(false);
    setCurrentBusinessId(null);
  };

  const handleEditBusiness = () => {
    setBusinesses(businesses.map((business) => business.id === editBusiness.id ? editBusiness : business));
    setShowEditForm(false);
    setEditBusiness(null);
  };

  const filteredBusinesses = businesses.filter(business =>
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
        <div className="flex items-center justify-between w-full mb-5">
          <div className="flex w-full max-w-xs relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input 
              type="text" 
              id="simple-search" 
              className="bg-gray-50 border p-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="Search for businesses..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              required 
            />
            <button 
              type="submit" 
              className="p-2 ml-2 text-sm font-medium text-white bg-bluedark rounded-lg border border-bluedark hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
        <div className="relative overflow-x-auto overflow-y-auto sm:rounded-lg border border-gray-200">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="table-header text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3" style={{ minWidth: '100px' }}>ID</th>
                <th scope="col" className="px-6 py-3" style={{ minWidth: '150px' }}>
                  <div className="flex items-center">Name</div>
                </th>
                <th scope="col" className="px-6 py-3" style={{ minWidth: '150px' }}>
                  <div className="flex items-center">Email</div>
                </th>
                <th scope="col" className="px-6 py-3" style={{ minWidth: '100px' }}>
                  <div className="flex items-center">Phone</div>
                </th>
                <th scope="col" className="px-6 py-3" style={{ minWidth: '100px' }}>
                  <div className="flex items-center">Score</div>
                </th>
                <th scope="col" className="px-6 py-3 " style={{ minWidth: '150px' }}>
                  <div className="flex items-center">Action</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBusinesses.map((business) => (
                <tr key={business.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">{business.id}</td>
                  <td className="px-6 py-4">{business.name}</td>
                  <td className="px-6 py-4">{business.email}</td>
                  <td className="px-6 py-4">{business.phone}</td>
                  <td className="px-6 py-4">{business.score}</td>
                  <td className="px-0 py-4 flex gap-0 justify-start">
                    <IconButton
                      color="default"
                      onClick={() => {
                        setEditBusiness(business);
                        setShowEditForm(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => {
                        setCurrentBusinessId(business.id);
                        setShowPopup(true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={showForm} onClose={() => setShowForm(false)} size="lg" className="flex items-center justify-center min-h-screen" theme={{
        content: {
          base: "bg-white w-3/4 rounded-lg", 
          inner: "p-6 rounded-lg shadow-lg",
        },
      }}>
        <Modal.Header className="text-center">Add New Business</Modal.Header>
        <Modal.Body>
          <div className="space-y-4 flex flex-col items-center">
            <div className="w-full">
              <Label htmlFor="name">Name</Label>
              <TextInput
                id="name"
                type="text"
                placeholder="Enter business name"
                value={newBusiness.name}
                onChange={(e) => setNewBusiness({ ...newBusiness, name: e.target.value })}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="email">Email</Label>
              <TextInput
                id="email"
                type="email"
                placeholder="Enter business email"
                value={newBusiness.email}
                onChange={(e) => setNewBusiness({ ...newBusiness, email: e.target.value })}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="phone">Phone</Label>
              <TextInput
                id="phone"
                type="text"
                placeholder="Enter business phone"
                value={newBusiness.phone}
                onChange={(e) => setNewBusiness({ ...newBusiness, phone: e.target.value })}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="score">Score</Label>
              <TextInput
                id="score"
                type="number"
                placeholder="Enter business score"
                value={newBusiness.score}
                onChange={(e) => setNewBusiness({ ...newBusiness, score: parseInt(e.target.value, 10) })}
                className="w-full"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="p-2 text-sm font-medium text-white bg-bluedark rounded-lg border border-bluedark hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300"
            onClick={handleAddBusiness}
          >
            Add Business
          </button>
          <button
            type="button"
            className="p-2 text-sm font-medium text-white bg-gray-500 rounded-lg border border-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditForm} onClose={() => setShowEditForm(false)} size="lg" className="flex items-center justify-center min-h-screen" theme={{
        content: {
          base: "bg-white w-3/4 rounded-lg", 
          inner: "p-6 rounded-lg shadow-lg",
        },
      }}>
        <Modal.Header className="text-center">Edit Business</Modal.Header>
        <Modal.Body>
          {editBusiness && (
            <div className="space-y-4 flex flex-col items-center">
              <div className="w-full">
                <Label htmlFor="name">Name</Label>
                <TextInput
                  id="name"
                  type="text"
                  value={editBusiness.name}
                  onChange={(e) => setEditBusiness({ ...editBusiness, name: e.target.value })}
                  className="w-full"
                />
              </div>
              <div className="w-full">
                <Label htmlFor="email">Email</Label>
                <TextInput
                  id="email"
                  type="email"
                  value={editBusiness.email}
                  onChange={(e) => setEditBusiness({ ...editBusiness, email: e.target.value })}
                  className="w-full"
                />
              </div>
              <div className="w-full">
                <Label htmlFor="phone">Phone</Label>
                <TextInput
                  id="phone"
                  type="text"
                  value={editBusiness.phone}
                  onChange={(e) => setEditBusiness({ ...editBusiness, phone: e.target.value })}
                  className="w-full"
                />
              </div>
              <div className="w-full">
                <Label htmlFor="score">Score</Label>
                <TextInput
                  id="score"
                  type="number"
                  value={editBusiness.score}
                  onChange={(e) => setEditBusiness({ ...editBusiness, score: parseInt(e.target.value, 10) })}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="p-2 text-sm font-medium text-white bg-bluedark rounded-lg border border-bluedark hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300"
            onClick={handleEditBusiness}
          >
            Save Changes
          </button>
          <button
            type="button"
            className="p-2 text-sm font-medium text-white bg-gray-500 rounded-lg border border-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300"
            onClick={() => setShowEditForm(false)}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>

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
              Are you sure you want to delete this business?
            </h3>
            <div className="flex justify-center gap-4 pb-6">
              <button className="p-2 text-sm font-medium text-white bg-red-600 rounded-lg border border-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300" onClick={handleDeleteBusiness}>
                Yes, I'm sure
              </button>
              <button className="p-2 text-sm font-medium text-white bg-gray-500 rounded-lg border border-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300" onClick={() => setShowPopup(false)}>
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
