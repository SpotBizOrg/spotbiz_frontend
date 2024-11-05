import { useEffect, useState } from 'react';
import Adminnavbar from '../components/Adminnavbar';
import Adminsidebar from '../components/Adminsidebar';
import PackageCard from '../components/PackageCard';
import Container from '../components/Container';
import { FaPlus } from 'react-icons/fa';
import {  Modal, TextInput, Label } from "flowbite-react";

interface Package {
  id: number;
  title: string;
  description: string;
  price: number;
  adsPerWeek: number;
  displayBusinessDetails?: boolean;
  profileAnalytics?: boolean;
  interactWithCustomers?: boolean;
}



/*const packagesData: Package[] = [
  {
    id: 1,
    title: 'Free',
    description: 'Get started with basic features for small businesses.',
    price: 0,
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
    price: 300,
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
    price: 500,
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
    price: 1000,
    features: {
      'Advertisements & promotions per week': 7,
      'Display business details to customer': 'All',
      'Profile analytics': 'Visit count and reviews',
      'Interact with customers': '✅'
    },
    buttonText: 'Edit Package',
  },
];*/

const emptyPackage: Package = {
  id: Date.now(),
  title: '',
  description: '',
  price: 0,
  adsPerWeek: 0,
  displayBusinessDetails: false,
  profileAnalytics: false,
  interactWithCustomers: false,
  

};


export default function AdminPackages() {
  useEffect(()=>{
    document.title = "SpotBiz | Packages | Admin";
  },[]);
  


  

  //const [isModalOpen, setIsModalOpen] = useState(false);
  //const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [packagesData,setPackagesData] = useState<Package[]>([])
  const [editPackage, setEditPackage] = useState<Package | null>(null)

  const [showEditForm,setShowEditForm] = useState(false)

  const handleEdit = (pkg: Package) => {
    setEditPackage(pkg);
    setShowEditForm(true);
  };

  const handleAddPackage = () => {
    setEditPackage(emptyPackage);
    setShowEditForm(true);
  };

  const handleModalClose = () => {
    setShowEditForm(false);
    setEditPackage(null);
  };

  const handleUpdate = (updatedPackage: Package) => {
    // Implement update logic here
    console.log('Package updated:', updatedPackage);
    setShowEditForm(false);
    setEditPackage(null);
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
              price={`Rs. ${pkg.price}`}
              adsPerWeek={pkg.adsPerWeek}
              displayBusinessDetails={pkg.displayBusinessDetails}
              profileAnalytics={pkg.profileAnalytics}
              interactWithCustomers={pkg.interactWithCustomers}
              buttonText="Edit Package"
              onClick={() => handleEdit(pkg)}
            />
          ))}
        </div>
      </div>
      

      <Modal show={showEditForm} onClose={() => setShowEditForm(false)} size="lg" className="flex items-center justify-center min-h-screen" theme={{
        content: {
          base: "bg-white w-3/4 rounded-lg", 
          inner: "p-6 rounded-lg shadow-lg",
        },
      }}>
        <Modal.Header className="text-center">Edit Package</Modal.Header>
        <Modal.Body>
          {editPackage && (
            <div className="space-y-4 flex flex-col items-center">
              <div className="w-full">
                <Label htmlFor="packageTitlle">Paclage Title</Label>
                <TextInput
                  id="packageTitle"
                  type="text"
                  value={editPackage.title}
                  onChange={(e) => setEditPackage({ ...editPackage, title: e.target.value })}
                  className="w-full"
                />
              </div>

              <div className="w-full">
                <Label htmlFor="price">Price</Label>
                <div className="flex items-center">
                  <TextInput
                    id="price"
                    type="number"
                    value={editPackage.price}
                    onChange={(e) => setEditPackage({ 
                      ...editPackage, 
                      price: Number(e.target.value) // Convert to number before assigning
                    })}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="w-full">
                <Label htmlFor="price">Package Description</Label>
                <div className="flex items-center">
                  <TextInput
                    id="description"
                    type="text"
                    value={editPackage.description}
                    onChange={(e) => setEditPackage({ ...editPackage, description: e.target.value})}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="w-full">
                <Label htmlFor="adsPerWeek">Advertisements and promotions per week</Label>
                <div className="flex items-center">
                  <TextInput
                    id="adsPerWeek"
                    type="number"
                    value={editPackage.adsPerWeek}
                    onChange={(e) => setEditPackage({ 
                      ...editPackage, 
                      price: Number(e.target.value) // Convert to number before assigning
                    })}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="w-full">
                    <Label>Display business details to customers</Label>
                    <div className="flex items-center">
                      <button
                        className={`p-2 rounded-full ${editPackage.displayBusinessDetails ? 'bg-green-500' : 'bg-red-500'}`}
                        onClick={() => setEditPackage({ ...editPackage, displayBusinessDetails: !editPackage.displayBusinessDetails })}
                      >
                        {editPackage.displayBusinessDetails ? '✔️' : '❌'}
                      </button>
                      <span className="ml-2">Display business details to customers</span>
                    </div>
                </div>

                <div className="w-full">
                      <Label>Profile Analytics</Label>
                      <div className="flex items-center">
                        <button
                          className={`p-2 rounded-full ${editPackage.profileAnalytics ? 'bg-green-500' : 'bg-red-500'}`}
                          onClick={() => setEditPackage({ ...editPackage, profileAnalytics: !editPackage.profileAnalytics })}
                        >
                          {editPackage.profileAnalytics ? '✔️' : '❌'}
                        </button>
                        <span className="ml-2">Profile Analytics</span>
                      </div>
                </div>

                <div className="w-full">
          <Label>Interact with Customers</Label>
          <div className="flex items-center">
            <button
              className={`p-2 rounded-full ${editPackage.interactWithCustomers ? 'bg-green-500' : 'bg-red-500'}`}
              onClick={() => setEditPackage({ ...editPackage, interactWithCustomers: !editPackage.interactWithCustomers })}
            >
              {editPackage.interactWithCustomers ? '✔️' : '❌'}
            </button>
            <span className="ml-2">Interact with Customers</span>
          </div>
        </div>
               </div>

            
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="p-2 text-sm font-medium text-white bg-bluedark rounded-lg border border-bluedark hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300"
            onClick={()=> handleUpdate(editPackage!)}
          >
            Done
          </button>
          <button
            type="button"
            className="p-2 text-sm font-medium text-white bg-gray-500 rounded-lg border border-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300"
            onClick={handleModalClose}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
