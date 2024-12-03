import React, { useState, useEffect } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { Modal, Button, TextInput, Textarea, Card } from "flowbite-react";
import { useAuth } from "../utils/AuthProvider";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../config";

interface BusinessDetails {
  name: string;
  businessRegNo: string;
  status: string;
  subscriptionPackage: string;
  description: string;
  locationUrl: string;
  contactNo: string;
  address: string;
}

interface BusinessDetailsTabProps {
  businessDetails: BusinessDetails;
}

const BusinessDetailsTab: React.FC<BusinessDetailsTabProps> = () => {
  const [openBusinessModal, setOpenBusinessModal] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    contactNo?: string;
  }>({});

  const [businessDetails, setBusinessDetails] = useState({
    name: "",
    locationUrl: "",
    contactNo: "",
    address: "",
    description: "",
    businessRegNo: "",
    status: "",
    subscriptionPackage: "",
  });

  const [formBusinessDetails, setFormBusinessDetails] = useState({
    name: "",
    locationUrl: "",
    contactNo: "",
    address: "",
    description: "",
  });

  const { token, user } = useAuth();

  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/business_owner/business/${user?.email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.status);

        if (!response.ok) {
          console.log("Network response was not ok");
        }

        const data = await response.json();
        setBusinessDetails({
          name: data.name,
          locationUrl: data.locationUrl,
          contactNo: data.contactNo,
          address: data.address,
          description: data.description,
          businessRegNo: data.businessRegNo,
          status: data.status,
          subscriptionPackage: data.subscriptionPackage,
        });

        setFormBusinessDetails({
          name: data.name,
          locationUrl: data.locationUrl,
          contactNo: data.contactNo,
          address: data.address,
          description: data.description,
        });
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message);
        } else {
          // toast.error("An unexpected error occurred");
        }
      }
    };

    fetchBusinessDetails();
  }, [user?.email, token]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormBusinessDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const validateForm = () => {
    const newErrors: {
      name?: string;
      contactNo?: string;
      address?: string;
      description?: string;
    } = {};

    // Business name validation
    if (!formBusinessDetails.name.trim()) {
      newErrors.name = "Business name cannot be empty";
    }

    // Phone number validation
    const phoneNumberRegex = /^\+[1-9]\d{1,3}\d{7,12}$/;
    if (!phoneNumberRegex.test(formBusinessDetails.contactNo)) {
      newErrors.contactNo =
        "Phone number must be in a valid international format like +94XXXXXXXXX";
    }

    // Address validation
    if (!formBusinessDetails.address.trim()) {
      newErrors.address = "Address cannot be empty";
    }

    // Description validation
    if (!formBusinessDetails.description.trim()) {
      newErrors.description = "Description cannot be empty";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // If no errors, return true
  };
  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      const response = await fetch(
        `${BACKEND_URL}/business/update/${user?.email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formBusinessDetails),
        }
      );

      if (!response.ok) {
        console.log("Network response was not ok");
      }

      const updatedBusinessDetails = await response.json();
      setBusinessDetails(updatedBusinessDetails);
      setOpenBusinessModal(false);
      toast.success("Business details updated successfully!");
    } catch (error) {
      toast.error("Error updating business details:" + error);
    }
  };

  return (
    <>
      <div className="flex flex-wrap -mx-2">
        <div className="fixed bottom-9 right-12 m-8">
          <div className="w-16 h-16">
            <div
              className="bg-bluedark w-full h-full rounded-full text-white flex items-center justify-center shadow-lg cursor-pointer"
              onClick={() => setOpenBusinessModal(true)}
            >
              <MdOutlineModeEdit className="text-xl" />
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 px-2 mb-4 flex">
          <Card className="flex-1 p-6 shadow-md border border-gray-200 flex flex-col">
            <div className="mb-2 flex-grow">
              <p className="text-black text-sm font-medium">Business Name</p>
              <p className="text-gray-800">{businessDetails.name}</p>
            </div>
            <div className="mb-2 flex-grow">
              <p className="text-black text-sm font-medium">
                Business Registration Number
              </p>
              <p className="text-gray-800">{businessDetails.businessRegNo}</p>
            </div>
            <div className="mb-2 flex-grow">
              <p className="text-black text-sm font-medium">Status</p>
              <p className="text-gray-800">{businessDetails.status}</p>
            </div>
          </Card>
        </div>

        <div className="w-full md:w-1/3 px-2 mb-4 flex">
          <Card className="flex-1 bg-white p-6 shadow-md border border-gray-200 flex flex-col">
            <div className="mb-2 flex-grow">
              <p className="text-black text-sm font-medium">Description</p>
              <p className="text-gray-800">{businessDetails.description}</p>
            </div>
          </Card>
        </div>

        <div className="w-full md:w-1/3 px-2 mb-4 flex">
          <Card className="flex-1 bg-white p-6 shadow-md border border-gray-200 flex flex-col">
            <div className="mb-2 flex-grow">
              <p className="text-black text-sm font-medium">Contact Number</p>
              <p className="text-gray-800">
                {businessDetails.contactNo || "No contact available"}
              </p>
            </div>
            <div className="mb-2 flex-grow">
              <p className="text-black text-sm font-medium">Address</p>
              <p className="text-gray-800">
                {businessDetails.address || "No address available"}
              </p>
            </div>
            <div className="mb-2 flex-grow">
              <p className="text-black text-sm font-medium">
                Subscription Package
              </p>
              <p className="text-gray-800">{"PREMIUM"}</p>
            </div>
          </Card>
        </div>
      </div>

      <Modal
        show={openBusinessModal}
        onClose={() => setOpenBusinessModal(false)}
      >
        <Modal.Header>Update Business Details</Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Business Name
                </label>
                <TextInput
                  id="name"
                  name="name"
                  value={formBusinessDetails.name}
                  placeholder="No business name available"
                  required
                  className="block w-full"
                  onChange={handleInputChange}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-1 md:gap-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="contactNo"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Contact Number
                  </label>
                  <TextInput
                    id="contactNo"
                    name="contactNo"
                    value={formBusinessDetails.contactNo}
                    placeholder="No contact available"
                    required
                    className="block w-full"
                    onChange={handleInputChange}
                  />
                  {errors.contactNo && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.contactNo}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Address
              </label>
              <TextInput
                id="address"
                name="address"
                value={formBusinessDetails.address}
                placeholder="No address available"
                required
                className="block w-full"
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={formBusinessDetails.description}
                placeholder="No description available"
                rows={4}
                required
                className="block w-full"
                onChange={handleInputChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-bluedark text-white rounded-md flex items-center"
          >
            Update
          </Button>
          <Button color="gray" onClick={() => setOpenBusinessModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BusinessDetailsTab;
