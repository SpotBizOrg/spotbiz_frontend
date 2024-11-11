import { useEffect, useState } from 'react';
import Adminnavbar from '../components/Adminnavbar';
import Adminsidebar from '../components/Adminsidebar';
import PackageCard from '../components/PackageCard';
import Container from '../components/Container';
import { FaPlus } from 'react-icons/fa';
import { Modal, TextInput, Label, Button } from "flowbite-react";

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
  analytics: false,
  fakereviews: false,
  recommendations: false,
  messaging: false,
  price: 0,
  listing: '',
  isActive: false,
};

export default function AdminPackages() {
  useEffect(() => {
    document.title = "SpotBiz | Packages | Admin";
  }, []);

  const [packagesData, setPackagesData] = useState<Package[]>([]);
  const [editPackage, setEditPackage] = useState<Package | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const fetchPackages = async () => {
    const response = await fetch('http://localhost:8080/api/v1/packages/get_all');
    const data = await response.json();
    setPackagesData(data);
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleEdit = (pkg: Package) => {
    setEditPackage(pkg);
    setShowEditForm(true);
  };

  const handleAddPackage = () => {
    setEditPackage(emptyPackage); // Reset the form with an empty package
    setShowEditForm(true); // Show the form
  };

  const handleModalClose = () => {
    setShowEditForm(false);
    setEditPackage(null); // Reset the package data when closing the form
  };

  const handleSubmitPackage = async () => {
    if (!editPackage) return;
    console.log("Submitting package:", editPackage);  // Log the package data
    
    try {
      const response = await fetch('http://localhost:8080/api/v1/packages/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editPackage),
      });

      if (response.ok) {
        setNotification("Successfully added the new package!");
        setTimeout(() => setNotification(null), 3000);
        handleModalClose(); // Close the modal after success
        await fetchPackages(); // Refresh the list of packages
      } else {
        setNotification("Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      setNotification("Something went wrong.");
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

      {/* Modal for Edit/Add Package */}
      <Modal show={showEditForm} onClose={handleModalClose} size="lg">
        <Modal.Header>{editPackage?.packageId ? "Edit Package" : "Add New Package"}</Modal.Header>
        <Modal.Body>
          {editPackage && (
            <div className="space-y-4">
              {/* Feature Input */}
              <div className="w-full">
                <Label htmlFor="feature">Feature</Label>
                <TextInput
                  id="feature"
                  type="text"
                  value={editPackage.feature}
                  onChange={(e) => setEditPackage({ ...editPackage, feature: e.target.value })}
                />
              </div>

              {/* Ads Per Week */}
              <div className="w-full">
                <Label htmlFor="adsPerWeek">Advertisements per Week</Label>
                <TextInput
                  id="adsPerWeek"
                  type="number"
                  value={editPackage.adsPerWeek.toString()}
                  onChange={(e) => setEditPackage({ ...editPackage, adsPerWeek: parseInt(e.target.value) || 0 })}
                />
              </div>

              {/* Price Input */}
              <div className="w-full">
                <Label htmlFor="price">Price</Label>
                <TextInput
                  id="price"
                  type="number"
                  value={editPackage.price.toString()}
                  onChange={(e) => setEditPackage({ ...editPackage, price: parseFloat(e.target.value) || 0 })}
                />
              </div>

              {/* Toggle Buttons for Features */}
              {["analytics", "fakereviews", "recommendations", "messaging"].map((feature) => (
                <div key={feature} className="flex items-center space-x-2 mt-4">
                  <button
                    className={`w-6 h-6 rounded-md border-2 border-blue-500 ${editPackage[feature as keyof Package] ? 'bg-blue-500 text-white' : 'bg-white'}`}
                    onClick={() => setEditPackage({ ...editPackage, [feature]: !editPackage[feature as keyof Package] })}
                  >
                    ✔️
                  </button>
                  <span>{feature.charAt(0).toUpperCase() + feature.slice(1)}</span>
                </div>
              ))}

              {/* Listing Input */}
              <div className="w-full">
                <Label htmlFor="listing">Listing</Label>
                <TextInput
                  id="listing"
                  type="text"
                  value={editPackage.listing || ''}
                  onChange={(e) => setEditPackage({ ...editPackage, listing: e.target.value })}
                />
              </div>

              {/* Active Toggle Button */}
              <div className="flex items-center space-x-2 mt-4">
                <button
                  className={`w-6 h-6 rounded-md border-2 border-blue-500 ${editPackage.isActive ? 'bg-blue-500 text-white' : 'bg-white'}`}
                  onClick={() => setEditPackage({ ...editPackage, isActive: !editPackage.isActive })}
                >
                  ✔️
                </button>
                <span>Is Active</span>
              </div>
            </div>
          )}
        </Modal.Body>
        {/* Modal Footer with Submit and Cancel Buttons */}
        <Modal.Footer>
          <Button
            onClick={handleSubmitPackage}
            className="bg-blue-500 text-white"
          >
            Submit
          </Button>
          <Button
            onClick={handleModalClose}
            className="bg-gray-500 text-white"
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEditForm} onClose={handleModalClose} size="lg">
        <Modal.Header>{editPackage?.packageId ? "Edit Package" : "Add New Package"}</Modal.Header>
        <Modal.Body>
          {editPackage && (
            <div className="space-y-4">
              {/* Feature Input */}
              <div className="w-full">
                <Label htmlFor="feature">Feature</Label>
                <TextInput
                  id="feature"
                  type="text"
                  value={editPackage.feature}
                  onChange={(e) => setEditPackage({ ...editPackage, feature: e.target.value })}
                />
              </div>

              {/* Ads Per Week */}
              <div className="w-full">
                <Label htmlFor="adsPerWeek">Advertisements per Week</Label>
                <TextInput
                  id="adsPerWeek"
                  type="number"
                  value={editPackage.adsPerWeek.toString()}
                  onChange={(e) => setEditPackage({ ...editPackage, adsPerWeek: parseInt(e.target.value) || 0 })}
                />
              </div>

              {/* Price Input */}
              <div className="w-full">
                <Label htmlFor="price">Price</Label>
                <TextInput
                  id="price"
                  type="number"
                  value={editPackage.price.toString()}
                  onChange={(e) => setEditPackage({ ...editPackage, price: parseFloat(e.target.value) || 0 })}
                />
              </div>

              {/* Toggle Buttons for Features */}
              {["analytics", "fakereviews", "recommendations", "messaging"].map((feature) => (
                <div key={feature} className="flex items-center space-x-2 mt-4">
                  <button
                    className={`w-6 h-6 rounded-md border-2 border-blue-500 ${editPackage[feature as keyof Package] ? 'bg-blue-500 text-white' : 'bg-white'}`}
                    onClick={() => setEditPackage({ ...editPackage, [feature]: !editPackage[feature as keyof Package] })}
                  >
                    ✔️
                  </button>
                  <span>{feature.charAt(0).toUpperCase() + feature.slice(1)}</span>
                </div>
              ))}

              {/* Listing Input */}
              <div className="w-full">
                <Label htmlFor="listing">Listing</Label>
                <TextInput
                  id="listing"
                  type="text"
                  value={editPackage.listing || ''}
                  onChange={(e) => setEditPackage({ ...editPackage, listing: e.target.value })}
                />
              </div>

              {/* Active Toggle Button */}
              <div className="flex items-center space-x-2 mt-4">
                <button
                  className={`w-6 h-6 rounded-md border-2 border-blue-500 ${editPackage.isActive ? 'bg-blue-500 text-white' : 'bg-white'}`}
                  onClick={() => setEditPackage({ ...editPackage, isActive: !editPackage.isActive })}
                >
                  ✔️
                </button>
                <span>Is Active</span>
              </div>
            </div>
          )}
        </Modal.Body>
        {/* Modal Footer with Submit and Cancel Buttons */}
        <Modal.Footer>
          <Button
            onClick={handleSubmitPackage}
            className="bg-blue-500 text-white"
          >
            Submit
          </Button>
          <Button
            onClick={handleModalClose}
            className="bg-gray-500 text-white"
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
