import { useEffect, useState } from 'react';
import Adminnavbar from '../components/Adminnavbar';
import Adminsidebar from '../components/Adminsidebar';
import PackageCard from '../components/PackageCard';
import Container from '../components/Container';
import { FaPlus } from 'react-icons/fa';
import { Modal, TextInput, Label } from "flowbite-react";
import { useAuth } from "../utils/AuthProvider";

// Package interface and empty package template
interface Package {
  packageId: number;
  feature: string;
  adsPerWeek: number;
  analytics?: boolean;
  fakereviews?: boolean;
  recommendations?: boolean;
  messaging?: boolean;
  price: number;
  listing?: string;
  isActive?: boolean;
}

const emptyPackage: Package = {
  packageId: Date.now(),
  feature: '',
  adsPerWeek: 0,
  fakereviews: false,
  recommendations: false,
  messaging: false,
  price: 0,
  listing: '',
  isActive: false,
};

// Updated AdminPackages component with corrected input handlers

export default function AdminPackages() {
  useEffect(() => {
    document.title = "SpotBiz | Packages | Admin";
    if (!checkAuthenticated() || user?.role != "ADMIN") {
      login();
    }
  }, []);

  const [packagesData, setPackagesData] = useState<Package[]>([]);
  const [editPackage, setEditPackage] = useState<Package | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const { user, checkAuthenticated, login } = useAuth();

  const fetchPackages = async () => {
    const response = await fetch('/api/packages'); // Adjust URL according to your backend
    const data = await response.json();
    setPackagesData(data);
  };

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

  const handleUpdate = async (updatedPackage: Package | null) => {
    if (!updatedPackage) return;
    try {
      const response = await fetch('/api/packages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPackage),
      });

      if (response.ok) {
        await fetchPackages(); // Refresh package list
        handleModalClose(); // Close the modal
        setNotification("Package updated successfully!");
        setTimeout(() => setNotification(null), 3000); // Clear notification after 3 seconds
      } else {
        console.error('Failed to save package:', await response.json());
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container>
      <Adminnavbar />
      <Adminsidebar selectedTile="Subscription Packages" />
      <div className="px-12 sm:ml-64 mt-20">
        {notification && (
          <div className="mb-4 p-4 text-sm text-white bg-green-500 rounded-lg">
            {notification}
          </div>
        )}
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
              key={pkg.packageId}
              feature={pkg.feature}
              adsPerWeek={pkg.adsPerWeek}
              fakereviews={pkg.fakereviews}
              recommendations={pkg.recommendations}
              messaging={pkg.messaging}
              price={`Rs. ${pkg.price}`}
              listing={pkg.listing}
              isActive={pkg.isActive}
              buttonText="Edit Package"
              onClick={() => handleEdit(pkg)}
            />
          ))}
        </div>
      </div>

      <Modal show={showEditForm} onClose={handleModalClose} size="lg" className="flex items-center justify-center min-h-screen">
        <Modal.Header className="text-center">Edit Package</Modal.Header>
        <Modal.Body>
          {editPackage && (
            <div className="space-y-4">
              <div className="w-full">
                <Label htmlFor="feature">Feature</Label>
                <TextInput
                  id="feature"
                  type="text"
                  value={editPackage.feature}
                  onChange={(e) => setEditPackage({ ...editPackage, feature: e.target.value })}
                  className="w-full"
                />
              </div>

              <div className="w-full">
                <Label htmlFor="adsPerWeek">Advertisements per Week</Label>
                <TextInput
                  id="adsPerWeek"
                  type="number"
                  value={editPackage.adsPerWeek.toString()}
                  onChange={(e) => setEditPackage({ ...editPackage, adsPerWeek: parseInt(e.target.value) || 0 })}
                  className="w-full"
                />
              </div>

              <div className="w-full">
                <Label htmlFor="price">Price</Label>
                <TextInput
                  id="price"
                  type="number"
                  value={editPackage.price.toString()}
                  onChange={(e) => setEditPackage({ ...editPackage, price: parseFloat(e.target.value) || 0 })}
                  className="w-full"
                />
              </div>

              {/* Additional Features with Updated Button Styles */}
              <div className="grid grid-cols-2 gap-4">
                {['analytics', 'fakereviews', 'recommendations', 'messaging'].map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <button
                      className={`w-6 h-6 rounded-md border-2 border-blue-500 ${
                        editPackage[feature as keyof Package] ? 'text-blue-500' : 'text-transparent'
                      }`}
                      onClick={() =>
                        setEditPackage({
                          ...editPackage,
                          [feature]: !editPackage[feature as keyof Package],
                        })
                      }
                    >
                      ✔️
                    </button>
                    <span>{feature.charAt(0).toUpperCase() + feature.slice(1)}</span>
                  </div>
                ))}
              </div>

              {/* Is Active Toggle */}
              <div className="flex items-center space-x-2 mt-4">
                <button
                  className={`w-6 h-6 rounded-md border-2 border-blue-500 ${
                    editPackage.isActive ? 'text-blue-500' : 'text-transparent'
                  }`}
                  onClick={() => setEditPackage({ ...editPackage, isActive: !editPackage.isActive })}
                >
                  ✔️
                </button>
                <span>Is Active</span>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => handleUpdate(editPackage)}
            className="p-2 text-white bg-bluedark rounded-lg"
          >
            Done
          </button>
          <button
            onClick={handleModalClose}
            className="p-2 text-white bg-gray-500 rounded-lg"
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
