// src/pages/BusinessPage.tsx
import React from 'react';
import Customernavbar from '../components/Customernavbar';
import Business from '../components/Business'; // Ensure this import is here
import Container from "../components/Container";
import BusinessTitlenReview from '../components/BusinessTitlenReview';
import BusinessInfoCol from '../components/BusinessInfoCol';
import MainReview from '../components/MainReview';

const BusinessPage: React.FC = () => {
  return (
    <Container>
      <Customernavbar />
      <div className="px-12 sm mt-20">
        <div className='w-fullflex flex-col'>
          <BusinessTitlenReview/>
          <div className='w-full flex flex-row justify-start gap-2'>
            <div className='flex flex-col w-1/6'>
              <BusinessInfoCol/>
              <MainReview/>
            </div>
            <div className='w-4/6'>hello</div>
            <div className='w-1/6'>hello</div>
          </div>
        </div>
      </div>
      
      {/* <Business /> */}
    </Container>
  );
};

export default BusinessPage;
