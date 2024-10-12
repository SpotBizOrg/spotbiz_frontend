import { useEffect, useState } from 'react';
import Adminnavbar from '../components/Adminnavbar';
import Adminsidebar from '../components/Adminsidebar';
import PackageCard from '../components/PackageCard';
import Modal from '../components/modal';
import Container from '../components/Container';
import { FaPlus } from 'react-icons/fa';

interface Package {
  id: number;
  title: string;
  description: string;
  monthlyPrice: number;
  features: { [key: string]: string | number };
  buttonText: string;
  isPopular?: boolean;
}

const packagesData: Package[] = [
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
    buttonText: 'Edit Package',
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
    buttonText: 'Edit Package',
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
    buttonText: 'Edit Package',
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
    buttonText: 'Edit Package',
  },
];

const emptyPackage: Package = {
  id: Date.now(),
  title: '',
  description: '',
  monthlyPrice: 0,
  features: {
    'Advertisements & promotions per week': 0,
    'Display business details to customer': '❌',
    'Profile analytics': '❌',
    'Interact with customers': '❌'
  },
  buttonText: 'Add Package',
};

export default function AdminPackages() {
  useEffect(()=>{
    document.title = "SpotBiz | Packages | Admin";
  },[]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const handleEdit = (pkg: Package) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const handleAddPackage = () => {
    setSelectedPackage(emptyPackage);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };

  const handleUpdate = (updatedPackage: Package) => {
    // Implement update logic here
    console.log('Package updated:', updatedPackage);
    setIsModalOpen(false);
    setSelectedPackage(null);
  };

  // return (
  //   <div className="bg-gray-100 min-h-screen flex flex-col">
  //     <Adminnavbar />
  //     <div className="flex flex-1 mt-6">
  //       <div className="flex-none w-64">
  //         <Adminsidebar selectedTile={'Subscription Packages'} />
  //       </div>
  //       <div className="flex-1 px-2 sm:px-4 lg:px-6 py-4 sm:py-6">
  //         <div className="max-w-7xl mx-auto">
  //           <div className="flex justify-between items-center mt-12">
  //             <div className="w-fit mb-5 border-b-gray-900">
  //           <h1 className="text-subsubheading text-bluedark">Business Verify Requests</h1>
  //         </div>
  //             <button
  //               onClick={handleAddPackage}
  //               className="px-6 py-2 mr-7 bg-blue1 text-white rounded-lg hover:bg-bluedark"
  //             >
  //               Add Package
  //             </button>
  //           </div>
            
  //         </div>
  //       </div>
  //     </div>
  //     <Modal isOpen={isModalOpen} onClose={handleModalClose} onUpdate={handleUpdate} packageData={selectedPackage} />
  //   </div>
  // );

  return (
    <Container>
      <Adminnavbar />
      {/* <div className="flex min-h-screen bg-gray-100 font-body"> */}
      <Adminsidebar selectedTile="Subscription Packages" />
      <div className="px-12 sm:ml-64 mt-20">
        <div className="flex justify-between items-center w-full mb-10">
          <h1 className="text-subsubheading text-bluedark">Subscription Packages</h1>
          <div
            className="relative flex items-center justify-center w-[40px] h-[40px] mt-0 border-2 border-dashed border-gray-400 rounded-lg bg-white/50 backdrop-blur-md hover:bg-white/80 hover:border-gray-600 transition-all duration-300 ease-in-out cursor-pointer"
            onClick={handleAddPackage}
          >
            <FaPlus className="text-xl text-gray-500" />
          </div>
        </div>
        <div className="mt-9 grid gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {packagesData.map((pkg) => (
            <PackageCard
              key={pkg.id}
              title={pkg.title}
              description={pkg.description}
              price={`Rs. ${pkg.monthlyPrice}`}
              features={pkg.features}
              buttonText="Edit Package"
              isPopular={pkg.isPopular}
              onClick={() => handleEdit(pkg)}
            />
          ))}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleModalClose} onUpdate={handleUpdate} packageData={selectedPackage} />
    </Container>
  );
}
