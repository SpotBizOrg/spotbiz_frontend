// src/pages/BusinessList.tsx
import React from 'react';
import Adminnavbar from '../components/Adminnavbar';
import Adminsidebar from '../components/Adminsidebar';
import BusinessList from '../components/BusinessList';

const BusinessPage: React.FC = () => {
  return (
    <div>
      <Adminnavbar />
      <div className="flex pt-16">
        <Adminsidebar selectedTile="Businesses" />
        <div className="flex-1 ml-64 px-4 sm:px-6 lg:px-8 py-6 sm:py-6">
          <div className="max-w-7xl mx-auto">
            <header className="flex justify-between items-center py-4">
              <h1 className="text-2xl font-bold">Business List</h1>
            </header>
            <BusinessList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessPage;
