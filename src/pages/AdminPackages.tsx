import { useState } from 'react';
import Adminnavbar from '../components/Adminnavbar';
import Adminsidebar from '../components/Adminsidebar';
import PackageCard from '../components/PackageCard';

interface Package {
  id: number;
  title: string;
  description: string;
  monthlyPrice: number;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
}

const initialPackagesData: Package[] = [
  {
    id: 1,
    title: 'Freelancer',
    description: 'The essentials to provide your best work for clients.',
    monthlyPrice: 15,
    features: ['5 products', 'Up to 1,000 subscribers', 'Basic analytics', '48-hour support response time'],
    buttonText: 'Edit plan',
  },
  {
    id: 2,
    title: 'Startup',
    description: 'A plan that scales with your rapidly growing business.',
    monthlyPrice: 30,
    features: ['25 products', 'Up to 10,000 subscribers', 'Advanced analytics', '24-hour support response time', 'Marketing automations'],
    buttonText: 'Edit plan',
    isPopular: true,
  },
  {
    id: 3,
    title: 'Enterprise',
    description: 'Dedicated support and infrastructure for your company.',
    monthlyPrice: 60,
    features: ['Unlimited products', 'Unlimited subscribers', 'Advanced analytics', '1-hour support response time', 'Marketing automations', 'Custom reporting tools'],
    buttonText: 'Edit plan',
  },
];

export default function AdminPackages() {
  const [isMonthly, setIsMonthly] = useState(true);
  const [packagesData] = useState(initialPackagesData);

  const handleEdit = (id: number) => {
    // Handle the edit logic here
    console.log(`Edit package with id: ${id}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Adminnavbar />
      <div className="flex flex-1 mt-12">
        <div className="flex-none w-64">
          <Adminsidebar selectedTile={''} />
        </div>
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Update Subscription Packages</h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Edit the details of the packages to provide the best features for engaging your audience, creating customer loyalty, and driving sales.
              </p>
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setIsMonthly(true)}
                  className={`px-4 py-2 font-semibold text-sm ${isMonthly ? 'text-white bg-purple-600' : 'text-gray-700 bg-gray-200'} rounded-l-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsMonthly(false)}
                  className={`px-4 py-2 font-semibold text-sm ${!isMonthly ? 'text-white bg-purple-600' : 'text-gray-700 bg-gray-200'} rounded-r-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
                >
                  Annually
                </button>
              </div>
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {packagesData.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  title={pkg.title}
                  description={pkg.description}
                  price={isMonthly ? `$${pkg.monthlyPrice}/month` : `$${pkg.monthlyPrice * 12}/year`}
                  features={pkg.features}
                  buttonText={pkg.buttonText}
                  isPopular={pkg.isPopular}
                  onClick={() => handleEdit(pkg.id)} // Add click handler
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
