import React, { useState } from 'react';
import Businessnavbar from '../components/Businessnavbar';
import Businesssidebar from '../components/Businesssidebar';
import PerformanceChart from '../components/DashboardGraph';
import DashboardStats from '../components/DashboardStats';
import PkgCard from '../components/PkgCard';
import Container from '../components/Container';
import Popup from '../components/Popup';

const Dashboard: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <Container>
      <Businessnavbar />
      <div className="flex pt-3">
        <Businesssidebar selectedTile="Dashboard" />
        <div className="flex-1 ml-64 px-4 sm:px-6 lg:px-8 py-3 sm:py-3">
          <div className="max-w-7xl mx-auto">
            <DashboardStats />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
              <PerformanceChart />
              <PkgCard onUpgradeClick={togglePopup} /> {/* Pass the toggle function */}
            </div>
          </div>
        </div>
      </div>
      <Popup isOpen={isPopupOpen} onClose={togglePopup} /> {/* Include the Popup component */}
    </Container>
  );
};

export default Dashboard;
