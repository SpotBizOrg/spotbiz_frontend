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
      {/* <div className="flex flex-col flex-grow ml-64">  */}
      <div className="px-12 sm:ml-64 mt-20">
        <div className="flex-grow p-8 mt-16">
          <h1 className="text-2xl font-bold mb-8">Reports and Appeals</h1>
          {/* <div className="mt-6 mb-4">
            <PerformanceChart />
            </div>
            <div className="mt-6 mb-4">
            <LatestBusiness />
            </div> */}
          <div className="mt-8">
            <BusinessTables />
          </div>
          {/* <div className="mt-8">
            <ReportedReviews />
          </div> */}
          {/* <div className="mt-8">
            <Categories />
          </div> */}
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
    </Container>
  );
};

export default Reports;
