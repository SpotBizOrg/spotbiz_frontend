import React from 'react';
import Adminnavbar from '../components/Adminnavbar';
import Adminsidebar from '../components/Adminsidebar';
import PerformanceChart from '../components/PerformanceChart';
import LatestBusiness from '../components/LatetBusiness';
import BusinessTables from '../components/BusinessTables';
// import ReportedReviews from '../components/ReportedReviews';
// import Categories from '../components/CategoryTag';

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 font-body">
      <Adminsidebar selectedTile="Dashboard" />
      <div className="flex flex-col flex-grow ml-64"> {/* Add margin-left to prevent overlap */}
        <Adminnavbar />
        <div className="flex-grow p-8 mt-16">
          <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            <PerformanceChart />
            <LatestBusiness />
          </div>
          <div className="mt-8">
            <BusinessTables />
          </div>
          {/* <div className="mt-8">
            <ReportedReviews />
          </div>
          <div className="mt-8">
            <Categories />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
