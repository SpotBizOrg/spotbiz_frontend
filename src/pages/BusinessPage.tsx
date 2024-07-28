// src/pages/BusinessPage.tsx
import React from 'react';
import Customernavbar from '../components/Customernavbar';
import Business from '../components/Business'; // Ensure this import is here

const BusinessPage: React.FC = () => {
  return (
    <div>
      <Customernavbar />
      <Business /> {/* Use the Business component here */}
    </div>
  );
};

export default BusinessPage;
