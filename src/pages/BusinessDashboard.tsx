// src/pages/BusinessDashboard.tsx
import React from 'react';
import Businessnavbar from '../components/Businessnavbar';
import Businesssidebar from '../components/Businesssidebar';
import PerformanceChart from '../components/DashboardGraph';
import DashboardStats from '../components/DashboardStats';
import PackageCard from '../components/PkgCard';
// import AdsListingTable from '../components/AdsListingTable';
import Container from '../components/Container';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Businessnavbar />
      <div className="flex pt-3">
        <Businesssidebar selectedTile="Dashboard" />
        <div className="flex-1 ml-64 px-4 sm:px-6 lg:px-8 py-3 sm:py-3"> {/* Added ml-64 to make space for the sidebar */}
          <div className="max-w-7xl mx-auto">
            {/* <header className="flex justify-between items-center py-4">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <button className="bg-gray-200 py-2 px-4 rounded">View Business</button>
            </header> */}
            <DashboardStats />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
              <PerformanceChart />
              <PackageCard />
            </div>
            {/* <div className="mt-8">
              <AdsListingTable />
            </div> */}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;

// // src/pages/BusinessDashboard.tsx
// import React from 'react';
// import Businessnavbar from '../components/Businessnavbar';
// import Businesssidebar from '../components/Businesssidebar';
// import PerformanceChart from '../components/DashboardGraph';
// import DashboardStats from '../components/DashboardStats';
// import PackageCard from '../components/PkgCard';
// // import AdsListingTable from '../components/AdsListingTable';
// import Container from '../components/Container';

// const Dashboard: React.FC = () => {
//   return (
//     <Container>
//       <Businessnavbar />
//       <div className="flex pt-3">
//         <Businesssidebar selectedTile="Dashboard" />
//         <div className="flex-1 ml-64 px-4 sm:px-6 lg:px-8 py-3 sm:py-3"> {/* Added ml-64 to make space for the sidebar */}
//           <div className="max-w-7xl mx-auto">
//             {/* <header className="flex justify-between items-center py-4">
//               <h1 className="text-2xl font-bold">Dashboard</h1>
//               <button className="bg-gray-200 py-2 px-4 rounded">View Business</button>
//             </header> */}
//             <DashboardStats />
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
//               <PerformanceChart />
//               <PackageCard />
//             </div>
//             {/* <div className="mt-8">
//               <AdsListingTable />
//             </div> */}
//           </div>
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default Dashboard;
