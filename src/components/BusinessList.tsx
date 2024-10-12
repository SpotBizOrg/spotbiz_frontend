import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

interface Business {
  id: string;
  name: string;
  phoneNo: string;
  status?: string;
  address?: string;
  email?: string;
}

interface BusinessListProps {
  businesses: Business[];
  onDeleteClick: (id: string) => void;
}

const BusinessList: React.FC<BusinessListProps> = ({ businesses, onDeleteClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTerm, setFilterTerm] = useState('');

  useEffect(() => {
    // Log the businesses prop to ensure it contains the expected data
    console.log("Businesses data:", businesses);
  }, [businesses]);

  const filteredBusinesses = businesses.filter((business) => {
    const ownerName = business.name ? business.name.toLowerCase() : '';
    return (
      ownerName.includes(searchTerm.toLowerCase()) &&
      (filterTerm === '' || ownerName.includes(filterTerm.toLowerCase()))
    );
  });

  return (
    <div className="px-4 py-6">
      <div className="flex justify-between items-center mt-1 mb-8">
        <div className="flex items-center border rounded p-1">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search by owner name..."
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
          <option value="">All</option>
          {businesses.map((business) => (
            <option key={business.id} value={business.name}>
              {business.name}
            </option>
          ))}
        </select>
      </div>

      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="p-2">Owner Name</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Status</th>
            <th className="p-2">Address</th>
            <th className="p-2">Email</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBusinesses.map((business) => (
            <tr key={business.id} className="border-b">
              <td className="p-2">{business.name}</td>
              <td className="p-2">{business.phoneNo}</td>
              <td className="p-2">{business.status || 'N/A'}</td>
              <td className="p-2">{business.address || 'N/A'}</td>
              <td className="p-2">{business.email || 'N/A'}</td>
              <td className="p-2">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => onDeleteClick(business.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BusinessList;
