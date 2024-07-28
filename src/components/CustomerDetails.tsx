import React, { useState } from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { FaEdit, FaLock } from "react-icons/fa";
import ChangePasswordModal from "./ChangePasswordModal";

const AboutMe: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const [formData, setFormData] = useState({
    name: "Nirasha Nelki",
    email: "someone@gmail.com",
    phone: "+1 234 567 8900",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  return (
    <div className="mt-4 space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          <h2 className="text-lg font-bold">Personal Information</h2>
          <div className="flex space-x-2">
            <Button
              style={{
                height: "35px" /* Slightly smaller font size */,
              }}
              className="text-white bg-bluedark hover:bg-bluedark/90 focus:ring-4 focus:outline-none focus:ring-bluedark/50 font-medium rounded-lg inline-flex items-center transition duration-200"
              onClick={() => setIsModalOpen(true)}
            >
              <FaEdit
                style={{ width: "1.25rem", height: "1.25rem" }}
                className="mr-1"
              />
              Edit
            </Button>

            <Button
              style={{
                height: "35px" /* Slightly smaller font size */,
              }}
              className="text-white bg-bluedark hover:bg-bluedark/90 focus:ring-4 focus:outline-none focus:ring-bluedark/50 text-xs rounded-lg inline-flex items-center transition duration-200"
              onClick={() => setIsChangePasswordModalOpen(true)}
            >
              <FaLock
                style={{ width: "1rem", height: "1rem" }}
                className="mr-2"
              />
              Change Password
            </Button>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-gray-600">Email address</label>
            <p className="text-gray-800">{formData.email}</p>
          </div>
          <div>
            <label className="text-gray-600">Name</label>
            <p className="text-gray-800">{formData.name}</p>
          </div>
          <div>
            <label className="text-gray-600">Phone Number</label>
            <p className="text-gray-800">{formData.phone}</p>
          </div>
        </div>
      </div>

      {/* Modal for editing profile */}
      <Modal
        show={isModalOpen}
        size="md"
        onClose={() => setIsModalOpen(false)}
        className="flex items-center justify-center"
        theme={{
          content: {
            base: "bg-white w-3/4 rounded-lg", // Added rounded-lg here
            inner: "p-6 rounded-lg shadow-lg",
          },
        }}
      >
        <Modal.Header className="rounded-t-lg">Edit Profile</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <Label htmlFor="email" value="Email address" />
              <TextInput
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                disabled
              />
            </div>
            <div>
              <Label htmlFor="name" value="Name" />
              <TextInput
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <Label htmlFor="phone" value="Phone Number" />
              <TextInput
                id="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-end gap-4">
              <Button
                className="text-white bg-bluedark hover:bg-bluedark/90 focus:ring-4 focus:outline-none focus:ring-bluedark/50 font-medium rounded-lg inline-flex items-center transition duration-200"
                onClick={() => {
                  // Handle save logic here
                  setIsModalOpen(false);
                }}
              >
                Save
              </Button>
              <Button color="gray" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isChangePasswordModalOpen}
        onClose={() => setIsChangePasswordModalOpen(false)}
      />
    </div>
  );
};

export default AboutMe;
