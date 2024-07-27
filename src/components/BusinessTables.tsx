import React, { useState } from 'react';

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

const BusinessTables: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState('reported');

  const handleChange = (table: string) => {
    setSelectedTable(table);
  };

  const renderReportedTable = (businesses: any[]) => (
    <table className="min-w-full bg-white text-primary">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b border-gray-200">Business ID</th>
          <th className="py-2 px-4 border-b border-gray-200">Business Name</th>
          <th className="py-2 px-4 border-b border-gray-200">Reason for Reporting</th>
        </tr>
      </thead>
      <tbody>
        {businesses.map((business, index) => (
          <tr key={index} className="hover:bg-gray-100">
            <td className="py-2 px-4 border-b border-gray-200">{business.id}</td>
            <td className="py-2 px-4 border-b border-gray-200">{business.name}</td>
            <td className="py-2 px-4 border-b border-gray-200">{business.reason}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderAppealedTable = (businesses: any[]) => (
    <table className="min-w-full bg-white text-primary">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b border-gray-200">Business ID</th>
          <th className="py-2 px-4 border-b border-gray-200">Business Name</th>
          <th className="py-2 px-4 border-b border-gray-200">Reason for Appealing</th>
        </tr>
      </thead>
      <tbody>
        {businesses.map((business, index) => (
          <tr key={index} className="hover:bg-gray-100">
            <td className="py-2 px-4 border-b border-gray-200">{business.id}</td>
            <td className="py-2 px-4 border-b border-gray-200">{business.name}</td>
            <td className="py-2 px-4 border-b border-gray-200">{business.reason}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Reported Businesses and Appealed Businesse</h2>
        <div>
          <button
            onClick={() => handleChange('reported')}
            className={`px-4 py-2 rounded-full ${selectedTable === 'reported' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Reported
          </button>
          <button
            onClick={() => handleChange('appealed')}
            className={`px-4 py-2 ml-2 rounded-full ${selectedTable === 'appealed' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Appeals
          </button>
        </div>
      </div>
      <div>
        {selectedTable === 'reported' ? renderReportedTable(reportedBusinesses) : renderAppealedTable(appealedBusinesses)}
      </div>
    </div>
  );
};

export default BusinessTables;
