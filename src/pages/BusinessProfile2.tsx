import React, { useState } from "react";
import Businessnavbar from "../components/Businessnavbar";
import Businesssidebar from "../components/Businesssidebar";
import { Button, Card, Modal } from "flowbite-react";
import {
  FaCamera,
  FaMapMarkerAlt,
  FaStar,
  FaYoutube,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";
import { Tab, Tabs } from "../components/CustomTabs";
import { FaSquareXTwitter } from "react-icons/fa6";

const BusinessProfile: React.FC = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  );
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [uploadedAvatar, setUploadedAvatar] = useState<
    string | ArrayBuffer | null
  >(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateAvatar = () => {
    if (uploadedAvatar) {
      setSelectedAvatar(uploadedAvatar as string);
    }
    setIsAvatarModalOpen(false);
  };

  const handleCancel = () => {
    setUploadedAvatar(null);
    setIsAvatarModalOpen(false);
  };

  const businessDetails = {
    name: "Abans",
    registrationNumber: "345 346 46",
    description:
      "Abans Sri Lanka is a leading electronics and home appliances provider, offering innovative solutions and top-notch service. Committed to quality, Abans delivers a wide range of products for modern living.",
    locationUrl: "https://goo.gl/maps/xyz123",
    contactNo: "+09 345 346 46",
    address: "38/A, Aberdeen Road, Colombo 10",
    status: "Active",
    category: "Electronics",
    subscriptionPackage: "Premium",
    businessSocialLinks: {
      facebook: "https://facebook.com/abans",
      twitter: "https://twitter.com/abans",
      linkedin: "https://linkedin.com/company/abans",
      instagram: "https://instagram.com/abans",
      youtube: "https://youtube.com/abans",
    },
    choosenTags: ["Electronics", "Retail", "Online"],
    businessHours: [
      {
        businessHourId: 1,
        item: "Mon-Fri: 9 AM - 6 PM",
        specialNote: "Closed for lunch 1 PM - 2 PM",
      },
      {
        businessHourId: 2,
        item: "Sat: 10 AM - 4 PM",
        specialNote: "Extended hours during holiday season",
      },
      {
        businessHourId: 3,
        item: "Sun: Closed",
        specialNote: "Available for emergency services",
      },
    ],
    owner: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+09 123 456 789",
    },
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Businessnavbar />
      <div className="flex flex-1 mt-16">
        <div className="flex-none w-64">
          <Businesssidebar selectedTile="profile" />
        </div>
        <div className="flex flex-1">
          <div className="w-11/12 rounded-lg transform duration-200 ease-in-out mx-auto mt-6">
            <Card className="bg-bluedark text-white">
              <div className="flex items-center p-4">
                <div className="relative mr-6">
                  <img
                    className="h-[160px] w-[160px] bg-white p-1 rounded-full shadow-lg"
                    src={selectedAvatar}
                    alt="Profile"
                  />
                  <div
                    className="absolute bg-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-100 transition"
                    style={{
                      bottom: "20px",
                      right: "20px",
                      transform: "translate(50%, 50%)",
                    }}
                    onClick={() => setIsAvatarModalOpen(true)}
                  >
                    <FaCamera className="text-primary" />
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold">{businessDetails.name}</h2>
                  <p className="mt-2 flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-red-500" />
                    {businessDetails.address}
                  </p>
                  <p className="mt-2">Subscriber Count: 242</p>
                  <p className="mt-2 flex items-center">
                    4.0 &nbsp;
                    <FaStar className="text-yellow-500 ml-1" />
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-gray-400" />
                    &nbsp; (50)
                  </p>
                </div>
              </div>
            </Card>
            {/* Flowbite Modal for Avatar Upload */}
            <Modal
              show={isAvatarModalOpen}
              onClose={() => setIsAvatarModalOpen(false)}
            >
              <Modal.Header>Select a New Profile Photo</Modal.Header>
              <Modal.Body>
                <div className="flex flex-col items-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mb-4"
                  />
                  {uploadedAvatar && (
                    <img
                      src={uploadedAvatar as string}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-full"
                    />
                  )}
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={handleCancel} color="gray">
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdateAvatar}
                  className="text-white bg-bluedark hover:bg-bluedark/90 focus:ring-4 focus:outline-none focus:ring-bluedark/50 font-medium rounded-lg inline-flex items-center transition duration-200"
                >
                  Update
                </Button>
              </Modal.Footer>
            </Modal>
            {/* Rest of your component */}
            <Tabs>
              <Tab title="Business Details">
                <div className="flex flex-wrap -mx-2">
                  {/* Left Card */}
                  <div className="w-full md:w-1/3 px-2 mb-4 flex">
                    <Card className="flex-1 p-6 shadow-md border border-gray-200 flex flex-col">
                      <div className="mb-2 flex-grow">
                        <p className="text-gray-600">Business Name</p>
                        <p className="text-gray-800">{businessDetails.name}</p>
                      </div>
                      <div className="mb-2 flex-grow">
                        <p className="text-gray-600">
                          Business Registration Number
                        </p>
                        <p className="text-gray-800">
                          {businessDetails.registrationNumber}
                        </p>
                      </div>
                      <div className="mb-2 flex-grow">
                        <p className="text-gray-600">Status</p>
                        <p className="text-gray-800">
                          {businessDetails.status}
                        </p>
                      </div>
                      <div className="mb-2 flex-grow">
                        <p className="text-gray-600">Subscription Package</p>
                        <p className="text-gray-800">
                          {businessDetails.subscriptionPackage}
                        </p>
                      </div>
                    </Card>
                  </div>

                  {/* Middle Card */}
                  <div className="w-full md:w-1/3 px-2 mb-4 flex">
                    <Card className="flex-1 bg-white p-6 shadow-md border border-gray-200 flex flex-col">
                      <div className="mb-2 flex-grow">
                        <p className="text-gray-600">Description</p>
                        <p className="text-gray-800">
                          {businessDetails.description}
                        </p>
                      </div>
                      <div className="mb-2 flex-grow">
                        <p className="text-gray-600">Category</p>
                        <p className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full inline-block">
                          {businessDetails.category}
                        </p>
                      </div>
                    </Card>
                  </div>

                  {/* Right Card */}
                  <div className="w-full md:w-1/3 px-2 mb-4 flex">
                    <Card className="flex-1 bg-white p-6 shadow-md border border-gray-200 flex flex-col">
                      <div className="mb-2 flex-grow">
                        <p className="text-gray-600">Location URL</p>
                        <a
                          href={businessDetails.locationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {businessDetails.locationUrl}
                        </a>
                      </div>
                      <div className="mb-2 flex-grow">
                        <p className="text-gray-600">Contact Number</p>
                        <p className="text-gray-800">
                          {businessDetails.contactNo}
                        </p>
                      </div>
                      <div className="mb-2 flex-grow">
                        <p className="text-gray-600">Address</p>
                        <p className="text-gray-800">
                          {businessDetails.address}
                        </p>
                      </div>
                    </Card>
                  </div>
                </div>
              </Tab>

              <Tab title="Owner Details">
                <Card className="bg-white p-6 shadow-md border border-gray-200">
                  <div className="mb-2">
                    <p className="text-gray-600">Owner Name</p>
                    <p className="text-gray-800">
                      {businessDetails.owner.name}
                    </p>
                  </div>
                  <div className="mb-2">
                    <p className="text-gray-600">Email</p>
                    <p className="text-gray-800">
                      {businessDetails.owner.email}
                    </p>
                  </div>
                  <div className="mb-2">
                    <p className="text-gray-600">Phone Number</p>
                    <p className="text-gray-800">
                      {businessDetails.owner.phone}
                    </p>
                  </div>
                </Card>
              </Tab>

              <Tab title="Opening Hours">
                <Card className="bg-white p-6 shadow-md border border-gray-200">
                  {businessDetails.businessHours.map((hour) => (
                    <div key={hour.businessHourId} className="mb-2">
                      <p className="text-gray-800">{hour.item}</p>
                      <p className="text-gray-600">{hour.specialNote}</p>
                    </div>
                  ))}
                </Card>
              </Tab>

              <Tab title="Tags and Social Links">
                <div className="flex justify-between gap-4">
                  {/* Tags Card */}
                  <Card className="bg-white p-6 shadow-md border border-gray-200 flex-1">
                    <div className="mb-4">
                      <p className="text-gray-600">Tags</p>
                      <div className="flex flex-wrap">
                        {businessDetails.choosenTags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full mr-2 mb-2"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>

                  {/* Social Links Card */}
                  <Card className="bg-white p-6 shadow-md border border-gray-200 flex-1">
                    <div className="mb-4">
                      <p className="text-gray-600">Social Links</p>
                      <div className="flex space-x-4">
                        {businessDetails.businessSocialLinks.facebook && (
                          <a
                            href={businessDetails.businessSocialLinks.facebook}
                            className="text-blue-600"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaFacebookF className="text-[#1877F2] text-2xl" />
                          </a>
                        )}
                        {businessDetails.businessSocialLinks.twitter && (
                          <a
                            href={businessDetails.businessSocialLinks.twitter}
                            className="text-blue-400"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaSquareXTwitter className="text-[#000] text-2xl" />
                          </a>
                        )}
                        {businessDetails.businessSocialLinks.linkedin && (
                          <a
                            href={businessDetails.businessSocialLinks.linkedin}
                            className="text-blue-700"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaLinkedinIn className="text-[#0077b5] text-2xl" />
                          </a>
                        )}
                        {businessDetails.businessSocialLinks.instagram && (
                          <a
                            href={businessDetails.businessSocialLinks.instagram}
                            className="text-pink-500"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaInstagram className="text-pink-500 text-2xl" />
                          </a>
                        )}
                        {businessDetails.businessSocialLinks.youtube && (
                          <a
                            href={businessDetails.businessSocialLinks.youtube}
                            className="text-red-600"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaYoutube className="text-red-600 text-2xl" />
                          </a>
                        )}
                      </div>
                    </div>
                  </Card>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;
