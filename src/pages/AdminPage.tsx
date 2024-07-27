// src/pages/AdminPage.tsx
import React from 'react';
import Adminnavbar from '../components/Adminnavbar';
import Adminsidebar from '../components/Adminsidebar';
import CustomersList from '../components/CustomersList';

const AdminPage: React.FC = () => {
  return (
    <div>
      <Adminnavbar />
      <div className="flex pt-12"> {/* Adjusted padding-top */}
        <Adminsidebar selectedTile="Customers" />
        <div className="flex-1 ml-64 px-4 sm:px-6 lg:px-8 py-6 sm:py-6"> {/* Adjusted padding */}
          <div className="max-w-7xl mx-auto">
            <header className="flex justify-between items-center py-4 mb-1">
              <h1 className="text-2xl font-bold">Customers List</h1>
            </header>
            <CustomersList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
