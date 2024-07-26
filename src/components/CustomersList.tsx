// src/components/CustomersList.tsx
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const CustomersList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTerm, setFilterTerm] = useState('');

  const customers = [
    { id: '001', businessName: 'ABC Inc.', ownerName: 'John Doe', status: 'Active', address: '123 Main St', phone: '555-1234', email: 'john@example.com' },
    { id: '002', businessName: 'XYZ Ltd.', ownerName: 'Jane Smith', status: 'Inactive', address: '456 Oak Ave', phone: '555-5678', email: 'jane@example.com' },
    { id: '003', businessName: 'PQR Corp.', ownerName: 'Adam Smith', status: 'Active', address: '789 Elm Rd', phone: '555-9876', email: 'adam@example.com' },
    { id: '004', businessName: 'LMN Enterprises', ownerName: 'Emily Brown', status: 'Inactive', address: '321 Pine Blvd', phone: '555-5432', email: 'emily@example.com' },
    { id: '005', businessName: 'UVW Solutions', ownerName: 'Michael Johnson', status: 'Active', address: '654 Cedar Dr', phone: '555-1111', email: 'michael@example.com' },
    { id: '006', businessName: 'RST Technologies', ownerName: 'Sarah Lee', status: 'Active', address: '987 Maple Ln', phone: '555-2222', email: 'sarah@example.com' },
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterTerm === '' || customer.ownerName.toLowerCase().includes(filterTerm.toLowerCase()))
  );

  return (
    <div className="px-4 py-6">
      <div className="flex justify-between items-center mt-1 mb-8">
        <div className="flex items-center border rounded p-1">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search by keyword..."
            className="outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="border rounded p-2"
          value={filterTerm}
          onChange={(e) => setFilterTerm(e.target.value)}
        >
          <option value="">Filter by Name</option>
          {customers.map(customer => (
            <option key={customer.id} value={customer.ownerName}>
              {customer.ownerName}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="py-3 px-4 border border-gray-400">BID</th>
              <th className="py-3 px-4 border border-gray-400">Business Name</th>
              <th className="py-3 px-4 border border-gray-400">Owner Name</th>
              <th className="py-3 px-4 border border-gray-400">Status</th>
              <th className="py-3 px-4 border border-gray-400">Address</th>
              <th className="py-3 px-4 border border-gray-400">Phone No</th>
              <th className="py-3 px-4 border border-gray-400">Email Address</th>
              <th className="py-3 px-4 border border-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="text-center border-b border-gray-300">
                <td className="py-2 px-4 border border-gray-300">{customer.id}</td>
                <td className="py-2 px-4 border border-gray-300">{customer.businessName}</td>
                <td className="py-2 px-4 border border-gray-300">{customer.ownerName}</td>
                <td className={`py-2 px-4 border border-gray-300 ${customer.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>{customer.status}</td>
                <td className="py-2 px-4 border border-gray-300">{customer.address}</td>
                <td className="py-2 px-4 border border-gray-300">{customer.phone}</td>
                <td className="py-2 px-4 border border-gray-300">{customer.email}</td>
                <td className="py-2 px-4 border border-gray-300">
                  <button className="bg-green-500 text-white px-3 py-1 rounded mr-2">Update</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersList;
