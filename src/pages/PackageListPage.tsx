// src/pages/PackageListPage.tsx
import React from 'react';
import Container from '../components/Container1';
import PackageCard from '../components/Pkg';
import { useNavigate } from 'react-router-dom';
import NoUserNav from '../components/NoUserNav';
import Footer from '../components/Footer';

const packagesData = [
  {
    id: 1,
    title: 'Free',
    description: 'Get started with basic features for small businesses.',
    monthlyPrice: 0,
    features: {
      'Advertisements & promotions per week': 1,
      'Display business details to customer': '❌',
      'Profile analytics': '❌',
      'Interact with customers': '❌'
    },
    buttonText: 'Upgrade Plan',
  },
  {
    id: 2,
    title: 'Standard',
    description: 'A suitable plan for growing businesses with essential features.',
    monthlyPrice: 300,
    features: {
      'Advertisements & promotions per week': 3,
      'Display business details to customer': 'Only basic details',
      'Profile analytics': '❌',
      'Interact with customers': '✅'
    },
    buttonText: 'Purchased',
    isPopular: true,
  },
  {
    id: 3,
    title: 'Moderate',
    description: 'Comprehensive plan including advanced features and extended support.',
    monthlyPrice: 500,
    features: {
      'Advertisements & promotions per week': 5,
      'Display business details to customer': 'All excluding business hours',
      'Profile analytics': 'Only reviews',
      'Interact with customers': '✅'
    },
    buttonText: 'Upgrade Plan',
  },
  {
    id: 4,
    title: 'Premium',
    description: 'The ultimate plan for businesses needing full access and premium support.',
    monthlyPrice: 1000,
    features: {
      'Advertisements & promotions per week': 7,
      'Display business details to customer': 'All',
      'Profile analytics': 'Visit count and reviews',
      'Interact with customers': '✅'
    },
    buttonText: 'Upgrade Plan',
  },
];

const PackageListPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <NoUserNav />
      <Container>
        <div className="flex flex-col items-center justify-center min-h-screens pt-8">
          <h1 className="text-3xl font-bold text-center mb-4 mt-8">Subscription Plans</h1>
          <div className="mt-3 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ml-8 mr-8">
            {packagesData.map((pkg) => (
              <PackageCard
                key={pkg.id}
                title={pkg.title}
                description={pkg.description}
                price={"Rs. " + pkg.monthlyPrice.toString()}
                features={pkg.features}
                isPopular={pkg.isPopular}
              />
            ))}
          </div>
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">*Register to the System to buy the plans</p>
            <button
              onClick={() => navigate('/register')}
              className="mt-3 mb-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              List Your Business
            </button>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default PackageListPage;
