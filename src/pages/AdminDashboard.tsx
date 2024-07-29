import React, { useEffect } from "react";
import Adminnavbar from "../components/Adminnavbar";
import Adminsidebar from "../components/Adminsidebar";
import PerformanceChart from "../components/PerformanceChart";
import LatestBusiness from "../components/LatetBusiness"; // Assuming there's a typo in the import name
import Container from "../components/Container";

const AdminDashboard: React.FC = () => {
  useEffect(() => {
    document.title = "SpotBiz | Dashboard | Admin";
  }, []);

  return (
    <Container>
      <Adminnavbar />
      <Adminsidebar selectedTile="Dashboard" />
      <div className="px-12 sm:ml-64 mt-20">
        <div className="flex-grow p-8 mt-16">
          <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
          <div className="flex flex-wrap gap-6">
            <div className="flex-1">
              <PerformanceChart />
            </div>
            <div className="flex-1">
              <LatestBusiness />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AdminDashboard;
