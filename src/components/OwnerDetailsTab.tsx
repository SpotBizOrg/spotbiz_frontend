import React, { useState, useEffect } from "react";
import { Modal, Button, TextInput, Card } from "flowbite-react";
import { MdOutlineModeEdit } from "react-icons/md";
import { useAuth } from "../utils/AuthProvider";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../config";

const OwnerDetailsTab = () => {
  const { token, user } = useAuth();
  const [ownerDetails, setOwnerDetails] = useState({
    name: "",
    email: "",
    phoneNo: "",
  });
  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    phoneNo: "",
  });
  const [openOwnerModal, setOpenOwnerModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState({
    name: "",
    phoneNo: "",
  });

  useEffect(() => {
    const fetchOwnerDetails = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/business_owner/details/${user?.email}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch owner details");
        }
        const data = await response.json();
        setOwnerDetails({
          name: data.name,
          email: data.email,
          phoneNo: data.phoneNo,
        });
        setFormDetails({
          name: data.name,
          email: data.email,
          phoneNo: data.phoneNo,
        });
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }

        setLoading(false);
      }
    };

    fetchOwnerDetails();
  }, [user?.email, token]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDetails((prev) => ({
      ...prev,
      [name]: value,
    }));

    setValidationErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleUpdate = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      const response = await fetch(
        `${BACKEND_URL}/business_owner/update/${user?.email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formDetails),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update owner details");
      }
      const data = await response.json();
      setOwnerDetails(data);
      setOpenOwnerModal(false);
      toast.success("Owner details updated successfully!");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
      toast.error("Failed to update owner details");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const validateForm = () => {
    let errors = { name: "", phoneNo: "" };
    let isValid = true;

    if (formDetails.name.trim() === "") {
      errors.name = "Name cannot be empty";
      isValid = false;
    }

    if (formDetails.phoneNo.trim() === "") {
      errors.phoneNo = "Phone Number cannot be empty";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  return (
    <>
      <div className="flex justify-end mt-1 mb-1">
        <Modal
          show={openOwnerModal}
          onClose={() => setOpenOwnerModal(false)}
          size="md"
          theme={{
            content: {
              base: "bg-white w-3/4 rounded-lg",
              inner: "p-6 rounded-lg shadow-lg",
            },
          }}
        >
          <Modal.Header>Update Business Owner Details</Modal.Header>
          <Modal.Body>
            <form className="space-y-4">
              <div className="flex flex-col">
                <label
                  htmlFor="ownerEmail"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <TextInput
                  id="ownerEmail"
                  name="email"
                  value={formDetails.email}
                  onChange={handleInputChange}
                  required
                  className="block w-full"
                  disabled={true}
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="ownerName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <TextInput
                  id="ownerName"
                  name="name"
                  value={formDetails.name}
                  onChange={handleInputChange}
                  required
                  className="block w-full"
                />
                {validationErrors.name && (
                  <p className="text-red-500 text-sm">
                    {validationErrors.name}
                  </p>
                )}
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="ownerPhone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone Number
                </label>
                <TextInput
                  id="ownerPhone"
                  name="phoneNo"
                  value={formDetails.phoneNo}
                  onChange={handleInputChange}
                  required
                  className="block w-full"
                />
                {validationErrors.phoneNo && (
                  <p className="text-red-500 text-sm">
                    {validationErrors.phoneNo}
                  </p>
                )}
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="button"
              onClick={handleUpdate}
              className="bg-bluedark text-white rounded-md flex items-center"
            >
              Update
            </Button>
            <Button color="gray" onClick={() => setOpenOwnerModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <Card className="bg-white p-6 shadow-md border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="fixed bottom-0 right-0 mb-8 mr-8 w-24 h-24">
            <div className="relative w-full h-full">
              <button
                className="bg-bluedark absolute w-12 h-12 rounded-full text-white flex items-center justify-center shadow-lg cursor-pointer transition-transform duration-300"
                onClick={() => setOpenOwnerModal(true)}
                style={{
                  transform: " translateX(1.8rem) translateY(-5rem)",
                }}
              >
                <MdOutlineModeEdit className="text-lg" />
              </button>
            </div>
          </div>
          <div className="mb-2">
            <p className="text-black text-sm font-medium p-2">Email</p>
            <p className="text-gray-800 p-2">{ownerDetails.email}</p>
          </div>
          <div className="mb-2">
            <p className="text-black text-sm font-medium p-2">Owner Name</p>
            <p className="text-gray-800 p-2">{ownerDetails.name}</p>
          </div>

          <div className="mb-2">
            <p className="text-black text-sm font-medium p-2">Phone Number</p>
            <p className="text-gray-800 p-2">{ownerDetails.phoneNo}</p>
          </div>
        </div>
      </Card>
    </>
  );
};

export default OwnerDetailsTab;
