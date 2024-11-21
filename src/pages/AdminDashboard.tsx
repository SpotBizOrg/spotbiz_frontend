import React, { useEffect } from "react";
import Adminnavbar from "../components/Adminnavbar";
import Adminsidebar from "../components/Adminsidebar";
import PerformanceChart from "../components/PerformanceChart";
import LatestBusiness from "../components/LatetBusiness"; // Assuming there's a typo in the import name
import Container from "../components/Container";
import { useAuth } from "../utils/AuthProvider";
import AdminDashboardStats from "../components/AdminDashboardStats";

const AdminDashboard: React.FC = () => {

  const { user, checkAuthenticated, login } = useAuth();


  useEffect(() => {
    document.title = "SpotBiz | Dashboard | Admin";
    if (!checkAuthenticated() || user?.role != "ADMIN") {
      login();
    }
  }, []);

  return (
    <Container>
      <Adminnavbar />
      <Adminsidebar selectedTile="Dashboard" />
      <div className="px-12 sm:ml-64 mt-20">
        <AdminDashboardStats />
        <div className="flex flex-row max-w-full">
          
        </div>
        {/* <div className="flex-grow  mt-10">
          <h1 className="text-subsubheading text-bluedark mb-10">
            Admin Dashboard
          </h1>
          <div className="flex flex-wrap gap-6">
            <div className="flex-1">
              <PerformanceChart />
            </div>
            <div className="flex-1">
              <LatestBusiness />
            </div>
          </div>
        </div> */}
      </div>
    </Container>
  );
};

export default AdminDashboard;
