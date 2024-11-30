import { useEffect, useState } from 'react';
import Adminnavbar from '../components/Adminnavbar';
import Adminsidebar from '../components/Adminsidebar';
import PackageCard from '../components/PackageCard';
import Container from '../components/Container';
import { FaPlus } from 'react-icons/fa';
import { Modal, TextInput, Label, Button } from "flowbite-react";
import { useAuth } from "../utils/AuthProvider";
import { toast } from "react-toastify";

// Package interface and empty package template
interface Package {
  packageId: number;
  feature: string;
  adsPerWeek: number;
  analytics?: boolean;
  fakeReviews?: boolean;
  recommendation?: boolean;
  messaging?: boolean;
  price: number;
  listing?: string;
  isActive?: boolean;
}

const emptyPackage: Package = {
  packageId:0,
  feature: '',
  adsPerWeek: 0,
  analytics: false,
  fakeReviews: false,
  recommendation: false,
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
  const [addPackage, setAddPackage] = useState<Package | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const { user, checkAuthenticated, login } = useAuth();
  const [adsPerWeekError, setAdsPerWeekError] = useState<string | null>(null);
  const [price, setPrice] = useState<number | string>(""); // Starting with an empty string or number
  const [priceError, setPriceError] = useState<string>("");



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
    setAddPackage(emptyPackage); // Reset the form with an empty package
    setShowAddForm(true); // Show the form
  };


  const handleDelete = async (packageId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/packages/delete/${packageId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPackagesData((prevData) => prevData.filter((pkg) => pkg.packageId !== packageId));
        toast.success("Package deleted successfully!"); // Use toast for success
      } else if (response.status === 404) {
        toast.error("Package not found!"); // Use toast for error
      } else {
        toast.error("Failed to delete package.");
      }
    } catch (error) {
      console.error("Error deleting package:", error);
      toast.error("An error occurred while deleting the package.");
    }
  };


  const handleModalClose = () => {
    setShowEditForm(false);
    setEditPackage(null); // Reset the package data when closing the form
    setAddPackage(null);
    setShowAddForm(false);
  };

  const handleSubmitPackage = async () => {
    if (!editPackage) return;

    if (editPackage.price < 0) {
      setPriceError("Price cannot be negative.");
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/v1/packages/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editPackage),
      });

      if (response.ok) {
        toast.success("Successfully updated the package!"); // Toast for success
        handleModalClose(); // Close the modal after success
        await fetchPackages(); // Refresh the list of packages
      } else {
        toast.error("Something went wrong while updating the package.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while updating the package.");
    }
  };

  const handleAddPackagesubmit = async () => {
    if (!addPackage) return;

    // Validate price
  if (addPackage.price < 0) {
    setPriceError("Price cannot be negative.");
    return;
  }

    try {
      setAddPackage({ ... addPackage, packageId:0})
      console.log(addPackage);
      console.log(addPackage.packageId)

      const response = await fetch('http://localhost:8080/api/v1/packages/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addPackage),
      });

      if (response.ok) {
        toast.success("Successfully added the new package!"); // Success toast
        handleModalClose(); // Close the modal after success
        await fetchPackages(); // Refresh the list of packages
      } else {
        toast.error("Something went wrong while adding the package.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while adding the package.");
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

        <div className="mt-9 grid gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
          {packagesData && packagesData.map((pkg) => (
            <PackageCard
              key={pkg.packageId}
              feature={pkg.feature}
              adsPerWeek={pkg.adsPerWeek}
              fakeReviews={pkg.fakeReviews}
              analytics={pkg.analytics}
              recommendation={pkg.recommendation}
              messaging={pkg.messaging}
              price={`Rs. ${pkg.price}`}
              listing={pkg.listing}
              //isActive={pkg.isActive}
              buttonText="Edit Package"
              onClick={() => handleEdit(pkg)}
              deleteButton={() => handleDelete(pkg.packageId)}
            />
          ))}
        </div>
      </div>

      {/* Modal for Edit Package */}
      <Modal show={showEditForm} onClose={handleModalClose} size="lg">
        <Modal.Header>Edit Package</Modal.Header>
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
                type="text"
                value={editPackage.adsPerWeek.toString()}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) { // Allow only digits
                    setEditPackage({ ...editPackage, adsPerWeek: parseInt(value) || 0 });
                    setAdsPerWeekError(null); // Clear error
                  } else {
                    setAdsPerWeekError('Only numbers are allowed.');
                  }
                }}
                className={adsPerWeekError ? "border-red-500" : ""}
              />
              {adsPerWeekError && (
                <p className="mt-1 text-sm text-red-500">{adsPerWeekError}</p>
              )}
            </div>


              {/* Price Input */}
              <div className="w-full">
                  <Label htmlFor="price">Price</Label>
                  <TextInput
  id="price"
  type="text"  // Change from "number" to "text" to allow typing and deletion
  value={editPackage.price.toString()}  // Ensure it remains a string for proper display
  onChange={(e) => {
    const value = e.target.value;
    // Allow only numbers and handle deletion properly
    if (/^\d*\.?\d*$/.test(value)) {
      setEditPackage({ ...editPackage, price: value ? parseFloat(value) : 0 });
      setPriceError(""); // Clear any existing error
    } else {
      setPriceError("Please enter a valid non-negative price.");
    }
  }}
  className={priceError ? "border-red-500" : ""}
/>
{priceError && <p className="mt-1 text-sm text-red-500">{priceError}</p>}

                </div>


              {/* Toggle Buttons for Features */}
              {["analytics", "fakeReviews", "recommendation", "messaging"].map((feature) => (
                <div key={feature} className="flex items-center space-x-2 mt-4">
                  <button
                    className={`w-6 h-6 rounded-md border-2 border-blue-500 ${editPackage[feature as keyof Package] ? 'bg-blue-500 text-white' : 'bg-white'}`}
                    onClick={() => setEditPackage({ ...editPackage, [feature]: !editPackage[feature as keyof Package] })}
                    aria-label={`Toggle ${feature}`}
                  >
                    {editPackage[feature as keyof Package] ? '✔️' : '✖️'}
                  </button>
                  <span>{feature.charAt(0).toUpperCase() + feature.slice(1)}</span>
                  <span className="text-sm text-gray-600">
                    {editPackage[feature as keyof Package] ? 'Enabled' : 'Disabled'}
                  </span>
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

              {/* Active Toggle Button
          <div className="flex items-center space-x-2 mt-4">
            <button
              className={`w-6 h-6 rounded-md border-2 border-blue-500 ${editPackage.isActive ? 'bg-blue-500 text-white' : 'bg-white'}`}
              onClick={() => setEditPackage({ ...editPackage, isActive: !editPackage.isActive })}
              aria-label="Toggle Active Status"
            >
              {editPackage.isActive ? '✔️' : '✖️'}
            </button>
            <span>Is Active</span>
            <span className="text-sm text-gray-600">
              {editPackage.isActive ? 'Enabled' : 'Disabled'}
            </span>
          </div>*/}

            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmitPackage} className="bg-blue1 text-white">
            Submit
          </Button>
          <Button onClick={handleModalClose} className="bg-red-500 text-white">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Add Package */}
<Modal show={showAddForm} onClose={handleModalClose} size="lg">
  <Modal.Header>Add New Package</Modal.Header>
  <Modal.Body>
    {addPackage && (
      <div className="space-y-4">
        {/* Feature Input */}
        <div className="w-full">
          <Label htmlFor="add-feature">Feature</Label>
          <TextInput
            id="add-feature"
            type="text"
            value={addPackage.feature}
            onChange={(e) =>
              setAddPackage({ ...addPackage, feature: e.target.value })
            }
          />
        </div>

        {/* Ads Per Week Input */}
        <div className="w-full">
  <Label htmlFor="add-adsPerWeek">Advertisements per Week</Label>
  <TextInput
    id="add-adsPerWeek"
    type="text"
    value={addPackage.adsPerWeek.toString()}
    onChange={(e) => {
      const value = e.target.value;
      if (/^\d*$/.test(value)) { // Allow only digits
        setAddPackage({ ...addPackage, adsPerWeek: parseInt(value) || 0 });
        setAdsPerWeekError(null); // Clear error
      } else {
        setAdsPerWeekError('Only numbers are allowed.');
      }
    }}
    className={adsPerWeekError ? "border-red-500" : ""}
  />
  {adsPerWeekError && (
    <p className="mt-1 text-sm text-red-500">{adsPerWeekError}</p>
  )}
</div>

        {/* Price Input */}
        <div className="w-full">
        <Label htmlFor="price">Price</Label>
        <TextInput
        id="add-price"
        type="text"
        value={addPackage.price.toString()}
        onChange={(e) => {
          const value = parseFloat(e.target.value);
          if (!isNaN(value) && value >= 0) {
            setAddPackage({
              ...addPackage,
              price: value,
            });
            setPriceError(""); // Clear any existing error
          } else {
            setPriceError("Please enter a valid non-negative price.");
          }
        }}
        className={priceError ? "border-red-500" : ""}
      />
      {priceError && <p className="mt-1 text-sm text-red-500">{priceError}</p>}
        </div>

        {/* Toggle Buttons for Features */}
        {["analytics", "fakeReviews", "recommendation", "messaging"].map(
          (feature) => (
            <div key={feature} className="flex items-center space-x-2 mt-4">
              <button
                className={`w-6 h-6 rounded-md border-2 border-blue-500 ${
                  addPackage[feature as keyof Package]
                    ? "bg-blue-500 text-white"
                    : "bg-white"
                }`}
                onClick={() =>
                  setAddPackage({
                    ...addPackage,
                    [feature]: !addPackage[feature as keyof Package],
                  })
                }
                aria-label={`Toggle ${feature}`}
              >
                {addPackage[feature as keyof Package] ? "✔️" : "✖️"}
              </button>
              <span>{feature.charAt(0).toUpperCase() + feature.slice(1)}</span>
              <span className="text-sm text-gray-600">
                {addPackage[feature as keyof Package] ? "Enabled" : "Disabled"}
              </span>
            </div>
          )
        )}

        {/* Listing Input */}
        <div className="w-full">
          <Label htmlFor="add-listing">Listing</Label>
          <TextInput
            id="add-listing"
            type="text"
            value={addPackage.listing || ""}
            onChange={(e) =>
              setAddPackage({ ...addPackage, listing: e.target.value })
            }
          />
        </div>

        {/* Active Toggle Button */}
       {/* <div className="flex items-center space-x-2 mt-4">
          <button
            className={`w-6 h-6 rounded-md border-2 border-blue-500 ${
              addPackage.isActive ? "bg-blue-500 text-white" : "bg-white"
            }`}
            onClick={() =>
              setAddPackage({
                ...addPackage,
                isActive: !addPackage.isActive,
              })
            }
            aria-label="Toggle Active Status"
          >
            {addPackage.isActive ? "✔️" : "✖️"}
          </button>
          <span>Is Active</span>
          <span className="text-sm text-gray-600">
            {addPackage.isActive ? "Enabled" : "Disabled"}
          </span>
        </div>*/}
      </div>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button onClick={handleAddPackagesubmit} className="bg-blue1 text-white">
      Add Package
    </Button>
    <Button onClick={handleModalClose} className="bg-red-500 text-white">
      Cancel
    </Button>
  </Modal.Footer>
</Modal>

    </Container>
  );
}
