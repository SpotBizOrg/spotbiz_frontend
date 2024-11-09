// src/pages/PackageListPage.tsx
import React from 'react';
import Container from '../components/Container1';
import PackageCard from '../components/PkgNew';
import { useNavigate } from 'react-router-dom';
import NoUserNav from '../components/NoUserNav';
import Footer from '../components/Footer';
import Container2 from '../components/Container2';

// const packagesData = [
//   {
//     id: 1,
//     title: 'Free',
//     description: 'Get started with basic features for small businesses.',
//     monthlyPrice: 0,
//     features: {
//       'Advertisements & promotions per week': 1,
//       'Display business details to customer': '❌',
//       'Profile analytics': '❌',
//       'Interact with customers': '❌'
//     },
//     buttonText: 'Upgrade Plan',
//   },
//   {
//     id: 2,
//     title: 'Standard',
//     description: 'A suitable plan for growing businesses with essential features.',
//     monthlyPrice: 300,
//     features: {
//       'Advertisements & promotions per week': 3,
//       'Display business details to customer': 'Only basic details',
//       'Profile analytics': '❌',
//       'Interact with customers': '✅'
//     },
//     buttonText: 'Purchased',
//     isPopular: true,
//   },
//   {
//     id: 3,
//     title: 'Moderate',
//     description: 'Comprehensive plan including advanced features and extended support.',
//     monthlyPrice: 500,
//     features: {
//       'Advertisements & promotions per week': 5,
//       'Display business details to customer': 'All excluding business hours',
//       'Profile analytics': 'Only reviews',
//       'Interact with customers': '✅'
//     },
//     buttonText: 'Upgrade Plan',
//   },
//   {
//     id: 4,
//     title: 'Premium',
//     description: 'The ultimate plan for businesses needing full access and premium support.',
//     monthlyPrice: 1000,
//     features: {
//       'Advertisements & promotions per week': 7,
//       'Display business details to customer': 'All',
//       'Profile analytics': 'Visit count and reviews',
//       'Interact with customers': '✅'
//     },
//     buttonText: 'Upgrade Plan',
//   },
// ];
const packagesData = [
  {
    packageId: 1,
    feature: "Free",
    adsPerWeek: 1,
    analytics: "none",
    fakeReviews: "none",
    recommondation: "none",
    messaging: "none",
    listing: "Standard",
    price: 0,
    isActive: true
    
  },
  {
    packageId: 2,
    feature: "Basic",
    adsPerWeek: 3,
    analytics: "Only reviews",
    fakeReviews: "none",
    recommondation: "eligible",
    messaging: "eligible",
    listing: "Standard",
    price: 500,
    isActive: false
    
  },
  {
    packageId: 3,
    feature: "Premium",
    adsPerWeek: 5,
    analytics: "all",
    fakeReviews: "eligible",
    recommondation: "eligible",
    messaging: "eligible",
    listing: "Top",
    price: 1000,
    isActive: false
    
  },
]
const PackageListPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      
          <h1 className="text-3xl font-bold text-center mb-4">Subscription Plans</h1>
          <div className="mt-3 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ml-8 mr-8">
            {packagesData.map((pkg) => (
              <PackageCard
                key={pkg.packageId}
                feature={pkg.feature}
                price={"Rs. " + pkg.price}
                adPerWeek={pkg.adsPerWeek}
                analytics={pkg.analytics}
                fakeReviews={pkg.fakeReviews}
                listing={pkg.listing}
                messaging={pkg.messaging}
                recommondation={pkg.recommondation}
                isActive={pkg.isActive}
              />
            ))}
          </div>
          
       
    
    </div>
  );
};

export default PackageListPage;
