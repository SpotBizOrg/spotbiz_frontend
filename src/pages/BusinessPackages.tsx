import { useState } from 'react';
import Businessnavbar from '../components/Businessnavbar';
import Businesssidebar from '../components/Businesssidebar';
import PackageCard from '../components/PackageCard';
import { Button } from "flowbite-react"; // Removed unused Modal import
import Popup from '../components/Popup';

const packagesData = [
  {
    id: 1,
    title: 'Freelancer',
    description: 'The essentials to provide your best work for clients.',
    monthlyPrice: 15,
    features: {
      'Products': '5',
      'Subscribers': 'Up to 1,000',
      'Analytics': 'Basic',
      'Support response time': '48-hour',
      'Marketing automations': 'Not included', // Ensure a defined value
      'Custom reporting tools': 'Not included' // Ensure a defined value
    },
    buttonText: 'Buy plan',
  },
  {
    id: 2,
    title: 'Startup',
    description: 'A plan that scales with your rapidly growing business.',
    monthlyPrice: 30,
    features: {
      'Products': '25',
      'Subscribers': 'Up to 10,000',
      'Analytics': 'Advanced',
      'Support response time': '24-hour',
      'Marketing automations': 'Included',
      'Custom reporting tools': 'Not included' // Ensure a defined value
    },
    buttonText: 'Buy plan',
    isPopular: true,
  },
  {
    id: 3,
    title: 'Enterprise',
    description: 'Dedicated support and infrastructure for your company.',
    monthlyPrice: 60,
    features: {
      'Products': 'Unlimited',
      'Subscribers': 'Unlimited',
      'Analytics': 'Advanced',
      'Support response time': '1-hour',
      'Marketing automations': 'Included',
      'Custom reporting tools': 'Included'
    },
    buttonText: 'Buy plan',
  },
];

export default function BusinessPackages() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Businessnavbar />
      <div className="flex flex-1 mt-12">
        <div className="flex-none w-64">
          <Businesssidebar selectedTile={''} />
        </div>
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Pricing plans for teams of all sizes</h2>
              <Button
                onClick={togglePopup}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-6"
              >
                Open Popup
              </Button>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {/* {packagesData.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  title={pkg.title}
                  description={pkg.description}
                  price={`$${pkg.monthlyPrice}`}
                  features={pkg.features}
                  buttonText={pkg.buttonText}
                  isPopular={pkg.isPopular}
                  onClick={() => {}} // Add a dummy onClick handler
                />
              ))} */}
            </div>
          </div>
        </div>
      </div>
      <Popup isOpen={isPopupOpen} onClose={togglePopup} boughtPackage={0} businessId={0} />
    </div>
  );
}
