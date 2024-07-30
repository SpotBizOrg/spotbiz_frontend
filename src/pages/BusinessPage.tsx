// src/pages/BusinessPage.tsx
import React from 'react';
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

const BusinessPage: React.FC = () => {
  return (
    <>
        <Container2>
      <Customernavbar />
      <div className="px-12 sm mt-8 mb-20">
        <div className='w-fullflex flex-col'>
          <BusinessTitlenReview/>
          <div className='w-full flex flex-row justify-start'>
            <div className='flex flex-col w-1/6'>
              <BusinessInfoCol/>
              <MainReview/>
            </div>
            <div className='w-3/6 ml-20 mr-20 p-8 max-h-[95vh] overflow-y-auto scrollbar-hide'>
              <Column2/>
            </div>
            <div className='flex flex-col w-2/6'>
              <AboutBusiness/>
              <BusinessLocation/>
              <OpeningHrs/>
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
