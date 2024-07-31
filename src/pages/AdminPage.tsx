// src/pages/AdminPage.tsx
import React, { useEffect, useState } from "react";
import Adminnavbar from "../components/Adminnavbar";
import Adminsidebar from "../components/Adminsidebar";
import Container from "../components/Container";
import { Modal, TextInput, Label } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const dummyCustomers = [
  {
    id: 1,
    name: "Nimal Perera",
    email: "nimal.perera@gmail.com",
    phone: "+94-71-234-5678",
    score: 90,
  },
  {
    id: 2,
    name: "Kumari Silva",
    email: "kumari.silva@gmail.com",
    phone: "+94-72-345-6789",
    score: 87,
  },
  {
    id: 3,
    name: "Ruwan Fernando",
    email: "ruwan.fernando@gmail.com",
    phone: "+94-77-456-7890",
    score: 86,
  },
  {
    id: 4,
    name: "Saman Wijesinghe",
    email: "saman.wijesinghe@gmail.com",
    phone: "+94-78-567-8901",
    score: 88,
  },
  {
    id: 5,
    name: "Mala Jayasinghe",
    email: "mala.jayasinghe@gmail.com",
    phone: "+94-70-678-9012",
    score: 85,
  },
  {
    id: 6,
    name: "Kavindu Rathnayake",
    email: "kavindu.rathnayake@gmail.com",
    phone: "+94-71-789-0123",
    score: 92,
  },
  {
    id: 7,
    name: "Tharushi de Silva",
    email: "tharushi.desilva@gmail.com",
    phone: "+94-72-890-1234",
    score: 89,
  },
  {
    id: 8,
    name: "Dinesh Abeykoon",
    email: "dinesh.abeykoon@gmail.com",
    phone: "+94-77-901-2345",
    score: 91,
  },
  {
    id: 9,
    name: "Roshani Senanayake",
    email: "roshani.senanayake@gmail.com",
    phone: "+94-78-012-3456",
    score: 84,
  },
  {
    id: 10,
    name: "Gayan Madushanka",
    email: "gayan.madushanka@gmail.com",
    phone: "+94-70-123-4567",
    score: 93,
  },
];

const AdminPage: React.FC = () => {
  useEffect(() => {
    document.title = "SpotBiz | Customer List | Admin";
  }, []);

  const [customers, setCustomers] = useState(dummyCustomers);
  const [showForm, setShowForm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentCustomerId, setCurrentCustomerId] = useState<number | null>(
    null
  );
  const [newCustomer, setNewCustomer] = useState({
    id: customers.length + 1,
    name: "",
    email: "",
    phone: "",
    score: 0,
  });
  const [editCustomer, setEditCustomer] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddCustomer = () => {
    setCustomers([...customers, newCustomer]);
    setShowForm(false);
  };

  const handleDeleteCustomer = () => {
    setCustomers(
      customers.filter((customer) => customer.id !== currentCustomerId)
    );
    setShowPopup(false);
    setCurrentCustomerId(null);
  };

  const handleEditCustomer = () => {
    setCustomers(
      customers.map((customer) =>
        customer.id === editCustomer.id ? editCustomer : customer
      )
    );
    setShowEditForm(false);
    setEditCustomer(null);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <Adminnavbar />
      <Adminsidebar selectedTile="Customer List" />
      <div className="px-12 sm:ml-64 mt-20">
        <div className="flex justify-between items-center w-full mb-5 ">
          <h1 className="text-subsubheading text-bluedark">Customer List</h1>
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
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{customer.id}</td>
                  <td className="px-6 py-4">{customer.name}</td>
                  <td className="px-6 py-4">{customer.email}</td>
                  <td className="px-6 py-4">{customer.phone}</td>
                  <td className="px-6 py-4">{customer.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        show={showForm}
        onClose={() => setShowForm(false)}
        size="lg"
        className="flex items-center justify-center min-h-screen"
        theme={{
          content: {
            base: "bg-white w-3/4 rounded-lg",
            inner: "p-6 rounded-lg shadow-lg",
          },
        }}
      >
        <Modal.Header className="text-center">Add New Customer</Modal.Header>
        <Modal.Body>
          <div className="space-y-4 flex flex-col items-center">
            <div className="w-full">
              <Label htmlFor="name">Name</Label>
              <TextInput
                id="name"
                type="text"
                value={newCustomer.name}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, name: e.target.value })
                }
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="email">Email</Label>
              <TextInput
                id="email"
                type="email"
                value={newCustomer.email}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, email: e.target.value })
                }
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="phone">Phone</Label>
              <TextInput
                id="phone"
                type="text"
                value={newCustomer.phone}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, phone: e.target.value })
                }
                className="w-full"
              />
            </div>
            <div className="w-full">
              <Label htmlFor="score">Score</Label>
              <TextInput
                id="score"
                type="number"
                value={newCustomer.score}
                onChange={(e) =>
                  setNewCustomer({
                    ...newCustomer,
                    score: parseInt(e.target.value, 10),
                  })
                }
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

      <Modal
        show={showEditForm}
        onClose={() => setShowEditForm(false)}
        size="lg"
        className="flex items-center justify-center min-h-screen"
        theme={{
          content: {
            base: "bg-white w-3/4 rounded-lg",
            inner: "p-6 rounded-lg shadow-lg",
          },
        }}
      >
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
                  onChange={(e) =>
                    setEditCustomer({ ...editCustomer, name: e.target.value })
                  }
                  className="w-full"
                />
              </div>
              <div className="w-full">
                <Label htmlFor="email">Email</Label>
                <TextInput
                  id="email"
                  type="email"
                  value={editCustomer.email}
                  onChange={(e) =>
                    setEditCustomer({ ...editCustomer, email: e.target.value })
                  }
                  className="w-full"
                />
              </div>
              <div className="w-full">
                <Label htmlFor="phone">Phone</Label>
                <TextInput
                  id="phone"
                  type="text"
                  value={editCustomer.phone}
                  onChange={(e) =>
                    setEditCustomer({ ...editCustomer, phone: e.target.value })
                  }
                  className="w-full"
                />
              </div>
              <div className="w-full">
                <Label htmlFor="score">Score</Label>
                <TextInput
                  id="score"
                  type="number"
                  value={editCustomer.score}
                  onChange={(e) =>
                    setEditCustomer({
                      ...editCustomer,
                      score: parseInt(e.target.value, 10),
                    })
                  }
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
              Are you sure you want to delete this customer?
            </h3>
            <div className="flex justify-center gap-4 pb-6">
              <button
                className="p-2 text-sm font-medium text-white bg-red-600 rounded-lg border border-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
                onClick={handleDeleteCustomer}
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

export default AdminPage;
