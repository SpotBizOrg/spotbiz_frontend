import React from "react";
import Adminnavbar from "../components/Adminnavbar";
import Adminsidebar from "../components/Adminsidebar";
// import PerformanceChart from "../components/PerformanceChart";
// import LatestBusiness from "../components/LatetBusiness";
import BusinessTables from "../components/BusinessTables";
import Container from "../components/Container";
// import ReportedReviews from '../components/ReportedReviews';
// import Categories from '../components/CategoryTag';

const Reports: React.FC = () => {
  return (
    <Container>
      <Adminnavbar />
      {/* <div className="flex min-h-screen bg-gray-100 font-body"> */}
      <Adminsidebar selectedTile="Appeals & Reports" />
      <div className="px-12 sm:ml-64 mt-20">
          <div className="w-fit mb-5 border-b-gray-900">
            <h1 className="text-subsubheading text-bluedark">Appeals & Reports</h1>
          </div>
          <div className="">
            <BusinessTables />
          </div>
        </div>
    </Container>
  );
};

export default Reports;
