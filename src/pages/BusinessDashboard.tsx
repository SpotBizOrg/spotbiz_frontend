import React, { useEffect, useState } from 'react';
import Businessnavbar from '../components/Businessnavbar';
import Businesssidebar from '../components/Businesssidebar';
import PerformanceChart from '../components/DashboardGraph';
import DashboardStats from '../components/DashboardStats';
import PkgCard from '../components/PkgCard';
import Container from '../components/Container';
import Popup from '../components/Popup';
import CouponPopup from '../components/CouponPopup';
import OnboardingForm from './OnboardingForm';
import { useAuth } from "../utils/AuthProvider";

const Dashboard: React.FC = () => {
  // const { user, checkAuthenticated, login } = useAuth();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isCPopupOpen, setIsCPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsCPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsCPopupOpen(false);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  useEffect(() => {
    document.title = 'SpotBiz | Dashboard | Business';
    // if (!checkAuthenticated() || user?.role != "BUSINESS_OWNER") {
    //   login();
    // }
  }, []);

  return (
    <>
    <Container>
      <Businessnavbar />
      {/* <div className="flex pt-3"> */}
        <Businesssidebar selectedTile="Dashboard" />
        <div className="flex items-center justify-center px-12 sm:ml-64">
          <div >
            <DashboardStats />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
              <PerformanceChart />
              <PkgCard onUpgradeClick={togglePopup} />

            </div>
          </div>
        </div>
      {/* </div> */}
      {/* <div className="fixed bottom-4 right-10">
                    <button 
                    onClick={handleOpenPopup}
                    className="bg-gray-800 text-bodysmall text-white py-2 px-2 rounded-lg shadow-lg">
                        Check Cupoun Code
                    </button>
                
            </div> */}
      {/* <CouponPopup isOpen={isCPopupOpen} onClose={handleClosePopup} /> */}
      <Popup isOpen={isPopupOpen} onClose={togglePopup} /> {/* Include the Popup component */}
    </Container>
    <OnboardingForm />
    </>
  );
};

export default Dashboard;
