import React, { useEffect, useState } from 'react';
import Businessnavbar from '../components/Businessnavbar';
import Businesssidebar from '../components/Businesssidebar';
import DashboardStats from '../components/DashboardStats';
import PkgCard from '../components/PkgCard';
import Container from '../components/Container';
import Popup from '../components/Popup';
import CouponPopup from '../components/CouponPopup';
import OnboardingForm from './OnboardingForm';
import { useAuth } from "../utils/AuthProvider";
import { BACKEND_URL } from '../../config';
import axios from 'axios';
import { HashLoader } from 'react-spinners';
import SubscriptionChart from '../components/DashboardGraph';

interface Subscribe {
  subscribeId: number;
  dateTime: string; // ISO 8601 format for date and time
  businessId: number;
  userId: number;
}

interface BusinessDashboardProps{
  businessId: number;
  email: string;
  clickCount: number;
  subscriberCount: number;
  logo: string;
  subscribeList: Subscribe[];
  pkg: {
    packageId: number,
    feature: string,
    adsPerWeek: number,
    analytics: boolean,
    fakeReviews: boolean,
    recommendation: boolean,
    messaging: boolean,
    price: number,
    listing: string,
    isActive: boolean
  };
}

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const { user, checkAuthenticated, login } = useAuth();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isCPopupOpen, setIsCPopupOpen] = useState(false);
  const storedEmail = localStorage.getItem("email");
// const storedEmail = "sunrisestationery@yaho.com" // for testing
  const [dashboardData, setDashboardData] = useState<BusinessDashboardProps | null>(null);

  const handleOpenPopup = () => {
    setIsCPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsCPopupOpen(false);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const fetchData = async () => {
    const url = `${BACKEND_URL}/business-dashboard/${storedEmail}`;
  
    try {
      setLoading(true)
      const response = await axios.get(url);
      console.log("Fetched dashboard data:", response.data);
  
      setDashboardData(response.data);
      console.log(dashboardData?.subscribeList);
    } catch (e: any) {
      console.error("Error fetching dashboard data:", e.message || e);
    } finally{
      setLoading(false)
    }
  };
  

  useEffect(() => {
    document.title = 'SpotBiz | Dashboard | Business';

    fetchData();    
    
    if (!checkAuthenticated() || user?.role != "BUSINESS_OWNER") {
      login();
    }
  }, []);

  return (
    <>
    <Container>
      <Businessnavbar />
      {/* <div className="flex pt-3"> */}
        <Businesssidebar selectedTile="Dashboard" />
        <div className="flex items-center justify-center px-12 sm:ml-64">
          <div >
            <DashboardStats 
            subscriberCount={dashboardData?.subscriberCount || 0} 
            clicks={dashboardData?.clickCount || 0} />
            <div className="flex flex-row max-w-full">
              <SubscriptionChart data={dashboardData?.subscribeList || null} analytics={dashboardData?.pkg.analytics ||false} />
              {/* <div className='basis-1/4'></div> */}
              {dashboardData?.pkg ? (<PkgCard 
              onUpgradeClick={togglePopup} 
              packageId={dashboardData?.pkg.packageId || 0} 
              feature={dashboardData?.pkg.feature || 'Free'} 
              adsPerWeek={dashboardData?.pkg.adsPerWeek || 1} 
              analytics={dashboardData?.pkg.analytics ||false} 
              fakeReviews={dashboardData?.pkg.fakeReviews || false} 
              recommendation={dashboardData?.pkg.recommendation || false} 
              messaging={dashboardData?.pkg.messaging ||false} 
              price={dashboardData?.pkg.price || 0} 
              listing={dashboardData?.pkg.listing || 'Basic'} />): (

                <PkgCard 
              onUpgradeClick={togglePopup} 
              packageId={0} 
              feature={'Free'} 
              adsPerWeek={1} 
              analytics={false} 
              fakeReviews={false} 
              recommendation={false} 
              messaging={false} 
              price={0} 
              listing={'Basic'} />
              )}

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
      <div className="px-12 sm:ml-64 mt-20">
        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <HashLoader color="#36d7b7" size={50} />
          </div>
        )}
      </div>
    </Container>
    <OnboardingForm />
   
    </>
  );
};

export default Dashboard;
