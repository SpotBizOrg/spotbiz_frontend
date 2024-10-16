// src/pages/BusinessPage.tsx
import React, { useEffect } from 'react';
import Customernavbar from '../components/Customernavbar';
import BusinessTitlenReview from '../components/BusinessTitlenReview';
import BusinessInfoCol from '../components/BusinessInfoCol';
import MainReview from '../components/MainReview';
import AboutBusiness from '../components/AboutBusiness';
import BusinessLocation from '../components/Location';
import Column2 from '../components/Column2';
import OpeningHrs from '../components/OpeningHrs';
import Footer from '../components/Footer';
import Container2 from '../components/Container2';
import FloatingBtnsbusiness from '../components/FlotingBtnsbusiness';
import { BACKEND_URL } from '../../config';
import image from '../assets/promo.lk-44253997837344f08aed5b131f0bd271.jpg';
import loadStoredData from '../utils/AuthProvider';

const businessId: number = 28

interface WeeklySchedule {
  startTime: string;
  endTime: string;
  specialNote: string;
  isOpen: boolean;
}


interface BusinessPageProps {
  businessId: number;
  name: string;
  address: string;
  logo: string;
  description: string;
  avgRating: number;
  reviewCount: number;
  email: string;
  phone: string;
  fblink: string;
  tags: string[];
  weeklySchedule: {
    Monday: WeeklySchedule;
    Tuesday: WeeklySchedule;
    Wednesday: WeeklySchedule;
    Thursday: WeeklySchedule;
    Friday: WeeklySchedule;
    Saturday: WeeklySchedule;
    Sunday: WeeklySchedule;
  };
  latestReview:{
    rating: number;
    description: string;
    date: string;
    userId: number;
    businessId: number;
    title: string;
  }
}



const BusinessPage: React.FC = () => {

  const StoredEmail = localStorage.getItem('email');
  console.log(StoredEmail);
  

  const [businessData, setBusinessData] = React.useState<BusinessPageProps | null>(null);

  const fetchBusinessData = async (businessId: number) => {
    const url = `${BACKEND_URL}/businessPage/businessData?businessId=${businessId}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setBusinessData(data);
      // console.log(businessData?.latestReview.description);
      
    } catch (error) {
      console.error(error);
    }
  };



  useEffect(() => {
    document.title = "SpotBiz | Business";
    fetchBusinessData(businessId);
  }, []);

  return (
    <>
        <Container2>
      <Customernavbar />
      <div className="px-12 sm mt-8 mb-20">
        <div className='w-fullflex flex-col'>
            <BusinessTitlenReview businessName={businessData?.name || 'business name'} 
            location={businessData?.address || 'business address'} 
            rating={businessData?.avgRating || 0} 
            totReviws={businessData?.reviewCount || 0} 
            weeklySchedule={businessData?.weeklySchedule || undefined}/>

          <div className='w-full flex flex-row justify-start'>
            <div className='flex flex-col w-1/6'>
              <BusinessInfoCol name={businessData?.name || 'business name'} 
              logo={businessData?.logo || image} 
              address={businessData?.address || 'business address'} 
              phone={businessData?.phone || 'phone number'} 
              email={businessData?.email || 'email'} 
              fbLink={businessData?.fblink || '#'}/>
              
              <MainReview title={businessData?.latestReview.title || "sample name"}
                rating={businessData?.latestReview.rating || 0}
                description={businessData?.latestReview.description || "this is description"}
                date={businessData?.latestReview.date || "2024-10-14T04:46:49.097"}
                userId={businessData?.latestReview.userId || 0}
                businessId={businessData?.latestReview.businessId || 0} 
                storedEmail={StoredEmail || 'nirashanelki@gmail.com'}/>
            </div>
            
            <div className='w-3/6 ml-20 mr-20 p-8 max-h-[130vh] overflow-y-auto scrollbar-hide'>
              {businessData && <Column2 businessEmail={businessData.email}/>}
            </div>
            <div className='flex flex-col w-2/6'>
              <AboutBusiness about={businessData?.description || 'We offer a diverse range of high-quality electronic items, including home appliances, personal gadgets, and entertainment systems, backed by exceptional customer service and after-sales support, ensuring a seamless and satisfying shopping experience for all our customers.'}/>
              {businessData && <BusinessLocation location={businessData.address}/>}
              <OpeningHrs 
                Monday={businessData?.weeklySchedule.Monday || { startTime: '', endTime: '', specialNote: '', isOpen: false }} 
                Tuesday={businessData?.weeklySchedule.Tuesday || { startTime: '', endTime: '', specialNote: '', isOpen: false }} 
                Wednesday={businessData?.weeklySchedule.Wednesday || { startTime: '', endTime: '', specialNote: '', isOpen: false }} 
                Thursday={businessData?.weeklySchedule.Thursday || { startTime: '', endTime: '', specialNote: '', isOpen: false }} 
                Friday={businessData?.weeklySchedule.Friday || { startTime: '', endTime: '', specialNote: '', isOpen: false }} 
                Saturday={businessData?.weeklySchedule.Saturday || { startTime: '', endTime: '', specialNote: '', isOpen: false }} 
                Sunday={businessData?.weeklySchedule.Sunday || { startTime: '', endTime: '', specialNote: '', isOpen: false }}
              />
            </div>
          </div>
        </div>
      </div>
      <FloatingBtnsbusiness/>
      {/* <Business /> */}
    </Container2>
      <Footer />
    </>

  );
};

export default BusinessPage;
