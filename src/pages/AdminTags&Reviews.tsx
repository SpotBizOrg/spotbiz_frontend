import React, { useEffect } from 'react';
import Adminnavbar from '../components/Adminnavbar';
import Adminsidebar from '../components/Adminsidebar';
// import PerformanceChart from '../components/PerformanceChart';
// import LatestBusiness from '../components/LatetBusiness';
// import BusinessTables from '../components/BusinessTables';
// import ReportedReviews from '../components/ReportedReviews';
import Categories from '../components/CategoryTag';
import Container from '../components/Container';

const AdminTagsReviews: React.FC = () => {
  useEffect(()=>{
    document.title = "SpotBiz | Categories & Tags | Admin";
  },[]);
  return (
   <Container>
    {/* <div className="flex min-h-screen bg-gray-100 font-body"> */}
      <Adminnavbar />
      {/* <div className="flex flex-col flex-grow ml-64">  */}
      <Adminsidebar selectedTile="Categories & Tags" />
      <div className="px-12 sm:ml-64 mt-20">
        <div className="flex-grow p-8 mt-16">
          <h1 className="text-2xl font-bold mb-8">Reported Reviews & Tags</h1>
          {/* <div className="mt-8">
            <BusinessTables />
          </div> */}
          {/* <div className="mt-8">
            <ReportedReviews />
          </div> */}
          <div className="mt-8">
            <Categories />
          </div>
        </div>
        </div>
      {/* </div> */}
    {/* </div> */}
    </Container> 
  );
};

export default AdminTagsReviews;
