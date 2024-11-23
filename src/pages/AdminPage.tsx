import React, { useEffect, useState } from "react";
import Adminnavbar from "../components/Adminnavbar";
import Adminsidebar from "../components/Adminsidebar";
import Container from "../components/Container";
// import { Modal, TextInput, Label } from "flowbite-react";
// import { HiOutlineExclamationCircle } from "react-icons/hi";
// import { IconButton } from "@mui/material";
// import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

// Dummy API endpoint (replace this with your real API endpoint)
const API_URL = "http://localhost:8080/api/v1/admin/customers";

interface Customer {
  userId: number;
  name: string;
  email: string;
  phoneNo: string;
  score: number;
}

const AdminPage: React.FC = () => {
  useEffect(() => {
    document.title = "SpotBiz | Customer List | Admin";
    fetchCustomers();
  }, []);

  const [customers, setCustomers] = useState<Customer[]>([]);
  // const [showForm, setShowForm] = useState(false);
  // const [showPopup, setShowPopup] = useState(false);
  // const [showEditForm, setShowEditForm] = useState(false);
  const [currentCustomerId, setCurrentCustomerId] = useState<number | null>(
    null
  );
  const [newCustomer, setNewCustomer] = useState<Customer>({
    userId: customers.length + 1,
    name: "",
    email: "",
    phoneNo: "",
    score: 0,
  });
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch customers from the API
  const fetchCustomers = () => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.error("Error fetching customers:", error));
  };

  // Add a new customer to the API
  const handleAddCustomer = () => {
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCustomer),
    })
      .then((response) => response.json())
      .then((data) => {
        setCustomers([...customers, data]);
        // setShowForm(false);
      })
      .catch((error) => console.error("Error adding customer:", error));
  };

  // Delete a customer via the API
  const handleDeleteCustomer = () => {
    fetch(`${API_URL}/${currentCustomerId}`, {
      method: "DELETE",
    })
      .then(() => {
        setCustomers(
          customers.filter((customer) => customer.userId !== currentCustomerId)
        );
        // setShowPopup(false);
        setCurrentCustomerId(null);
      })
      .catch((error) => console.error("Error deleting customer:", error));
  };

  // Edit a customer via the API
  const handleEditCustomer = () => {
    fetch(`${API_URL}/${editCustomer?.userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editCustomer),
    })
      .then((response) => response.json())
      .then((updatedCustomer) => {
        setCustomers(
          customers.map((customer) =>
            customer.userId === updatedCustomer.userId
              ? updatedCustomer
              : customer
          )
        );
        // setShowEditForm(false);
        setEditCustomer(null);
      })
      .catch((error) => console.error("Error editing customer:", error));
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <Adminnavbar />
      <Adminsidebar selectedTile="Customer List" />
      <div className="px-12 sm:ml-64 mt-20">
        <div className="flex justify-between items-center w-full mb-5 border-b border-gray-300">
          <h1 className="text-subsubheading text-bluedark">Customer List</h1>
        </div>
        <div className="flex justify-end mb-5">
          <div className="flex items-center">
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border p-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for customers..."
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
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="table-header text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3"
                  style={{ minWidth: "100px" }}
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3"
                  style={{ minWidth: "150px" }}
                >
                  <div className="flex items-center">Name</div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3"
                  style={{ minWidth: "150px" }}
                >
                  <div className="flex items-center">Email</div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3"
                  style={{ minWidth: "100px" }}
                >
                  <div className="flex items-center">Phone</div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3"
                  style={{ minWidth: "100px" }}
                >
                  <div className="flex items-center">Score</div>
                </th>
                {/* <th scope="col" className="px-6 py-3 " style={{ minWidth: '150px' }}>
                  <div className="flex items-center">Action</div>
                </th> */}
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.userId}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{customer.userId}</td>
                  <td className="px-6 py-4">{customer.name}</td>
                  <td className="px-6 py-4">{customer.email}</td>
                  <td className="px-6 py-4">{customer.phoneNo}</td>
                  <td className="px-6 py-4">{customer.score}</td>
                  {/* <td className="px-0 py-4 flex gap-0 justify-start">
                    <IconButton
                      color="default"
                      onClick={() => {
                        setEditCustomer(customer);
                        setShowEditForm(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => {
                        setCurrentCustomerId(customer.userId);
                        setShowPopup(true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* <Modal show={showForm} onClose={() => setShowForm(false)} size="lg" className="flex items-center justify-center min-h-screen" theme={{
        content: {
          base: "bg-white w-3/4 rounded-lg", 
          inner: "p-6 rounded-lg shadow-lg",
        },
      }}>
        <Modal.Header className="text-center">Add New Customer</Modal.Header>
        <Modal.Body>
          <div className="space-y-4 flex flex-col items-center">
            <div className="w-full">
              <Label htmlFor="name">Name</Label>
              <TextInput
                id="name"
                type="text"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="email">Email</Label>
              <TextInput
                id="email"
                type="email"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="phone">Phone</Label>
              <TextInput
                id="phone"
                type="text"
                value={newCustomer.phoneNo}
                onChange={(e) => setNewCustomer({ ...newCustomer, phoneNo: e.target.value })}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="score">Score</Label>
              <TextInput
                id="score"
                type="number"
                value={newCustomer.score}
                onChange={(e) => setNewCustomer({ ...newCustomer, score: parseInt(e.target.value, 10) })}
                className="w-full"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="p-2 text-sm font-medium text-white bg-bluedark rounded-lg border border-bluedark hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300"
            onClick={handleAddCustomer}
          >
            Add Customer
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
        <Modal.Header className="text-center">Edit Customer</Modal.Header>
        <Modal.Body>
          {editCustomer && (
            <div className="space-y-4 flex flex-col items-center">
              <div className="w-full">
                <Label htmlFor="name">Name</Label>
                <TextInput
                  id="name"
                  type="text"
                  value={editCustomer.name}
                  onChange={(e) => setEditCustomer({ ...editCustomer, name: e.target.value })}
                  className="w-full"
                />
              </div>
              <div className="w-full">
                <Label htmlFor="email">Email</Label>
                <TextInput
                  id="email"
                  type="email"
                  value={editCustomer.email}
                  onChange={(e) => setEditCustomer({ ...editCustomer, email: e.target.value })}
                  className="w-full"
                />
              </div>
              <div className="w-full">
                <Label htmlFor="phone">Phone</Label>
                <TextInput
                  id="phone"
                  type="text"
                  value={editCustomer.phoneNo}
                  onChange={(e) => setEditCustomer({ ...editCustomer, phoneNo: e.target.value })}
                  className="w-full"
                />
              </div>
              <div className="w-full">
                <Label htmlFor="score">Score</Label>
                <TextInput
                  id="score"
                  type="number"
                  value={editCustomer.score}
                  onChange={(e) => setEditCustomer({ ...editCustomer, score: parseInt(e.target.value, 10) })}
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
            onClick={handleEditCustomer}
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
              Are you sure you want to delete this customer?
            </h3>
            <div className="flex justify-center gap-4 pb-6">
              <button className="p-2 text-sm font-medium text-white bg-red-600 rounded-lg border border-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300" onClick={handleDeleteCustomer}>
                Yes, I'm sure
              </button>
              <button className="p-2 text-sm font-medium text-white bg-gray-500 rounded-lg border border-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300" onClick={() => setShowPopup(false)}>
                No, cancel
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal> */}
    </Container>
  );
};

export default AdminPage;
