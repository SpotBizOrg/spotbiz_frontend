import React, { useEffect, useState } from "react";
import Businessnavbar from "../components/Businessnavbar";
import Businesssidebar from "../components/Businesssidebar";
import { Button, Card, Modal, Textarea, TextInput } from "flowbite-react";
import {
  FaCamera,
  FaMapMarkerAlt,
  FaStar,
  FaYoutube,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { Tab, Tabs } from "../components/CustomTabs";
import { FaSquareXTwitter } from "react-icons/fa6";
import CustomToggleSwitch from "../components/CustomToggleSwitch";
import { useAuth } from '../utils/AuthProvider';
const email = 'yuhanga2001@gmail.com';
const token = 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ5dWhhbmdhMjAwMUBnbWFpbC5jb20iLCJpYXQiOjE3MjIxODIwNjAsImV4cCI6MTcyMjI2ODQ2MH0.RfRInCXSQ4nuyVdBqAdcAGc-VXS_dK4y7XnRK1w0HRkc-PBPu2HnF_MfjAWrXpn8'

const BusinessProfile: React.FC = () => {
  const { user, checkAuthenticated, logout } = useAuth();
  const [data, setData] = useState<any>(null);
  useEffect(()=>{
    document.title = "SpotBiz | Profile | Business";
  },[]);

  useEffect(() => {
    if (!checkAuthenticated()) {
      fetchData();
    } else {
      fetchData();
    }
  }, []);
  
  const fetchData = async () => {
    if (1) {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/business_owner/business/${email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        setData(responseData);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  const [selectedAvatar, setSelectedAvatar] = useState(
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  );
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [openTagModal, setOpenTagModal] = useState(false);
  const [openSocialModal, setOpenSocialModal] = useState(false);
  const [openBusinessModal, setOpenBusinessModal] = useState(false);
  const [openOwnerModal, setOpenOwnerModal] = useState(false);
  const [openHoursModal, setOpenHoursModal] = useState(false);
  const [uploadedAvatar, setUploadedAvatar] = useState<
    string | ArrayBuffer | null
  >(null);
  type Day =
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";

  interface OpenDays {
    [key: string]: {
      isOpen: boolean;
      startTime: string;
      endTime: string;
      specialNote: string;
    };
  }

  const sampleOpenDays: OpenDays = {
    Monday: {
      isOpen: true,
      startTime: "09:00",
      endTime: "18:00",
      specialNote: "Closed for lunch 1 PM - 2 PM",
    },
    Tuesday: {
      isOpen: true,
      startTime: "09:00",
      endTime: "18:00",
      specialNote: "Closed for lunch 1 PM - 2 PM",
    },
    Wednesday: {
      isOpen: true,
      startTime: "09:00",
      endTime: "18:00",
      specialNote: "Closed for lunch 1 PM - 2 PM",
    },
    Thursday: {
      isOpen: true,
      startTime: "09:00",
      endTime: "18:00",
      specialNote: "Closed for lunch 1 PM - 2 PM",
    },
    Friday: {
      isOpen: true,
      startTime: "09:00",
      endTime: "18:00",
      specialNote: "Closed for lunch 1 PM - 2 PM",
    },
    Saturday: {
      isOpen: true,
      startTime: "10:00",
      endTime: "16:00",
      specialNote: "Extended hours during holiday season",
    },
    Sunday: {
      isOpen: false,
      startTime: "00:00",
      endTime: "00:00",
      specialNote: "Available for emergency services",
    },
  };

  const [openDays, setOpenDays] = useState<OpenDays>(sampleOpenDays);

  const handleToggle = (day: Day) => {
    setOpenDays((prev) => ({
      ...prev,
      [day]: { ...prev[day], isOpen: !prev[day].isOpen },
    }));
  };

  const handleTimeChange = (
    day: Day,
    field: "startTime" | "endTime",
    value: string
  ) => {
    setOpenDays((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  const handleSpecialNoteChange = (day: Day, value: string) => {
    setOpenDays((prev) => ({
      ...prev,
      [day]: { ...prev[day], specialNote: value },
    }));
  };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  type Category =
    | "Stationary"
    | "Hotels"
    | "Food"
    | "ComputerShops"
    | "ElectronicShops";

  const predefinedTags: Record<Category, string[]> = {
    Stationary: ["Books", "Pens", "Notebooks", "Markers", "Pencils"],
    Hotels: ["Luxury", "Budget", "Family", "Business", "Boutique"],
    Food: ["Fruits", "Vegetables", "Meats", "Snacks", "Desserts"],
    ComputerShops: [
      "Laptops",
      "Desktops",
      "Monitors",
      "Printers",
      "Accessories",
    ],
    ElectronicShops: ["TVs", "Smartphones", "Tablets", "Cameras", "Speakers"],
  };

  const businessDetails = {
    name: data?.name || "No business name available",
    registrationNumber: data?.businessRegNo || "No registration number available",
    description: data?.description || "No description available.",
    locationUrl: data?.locationUrl || "No location available",
    contactNo: data?.contactNo || "No contact available",
    address: data?.address || "No address available",
    status: data?.status || "Active",
    category: data?.category || "Electronics",
    subscriptionPackage: data?.subscriptionPackage || "Free",
    businessSocialLinks: data?.businessSocialLinks || {
      facebook: "https://facebook.com/abans",
      twitter: "https://twitter.com/abans",
      linkedin: "https://linkedin.com/company/abans",
      instagram: "https://instagram.com/abans",
      youtube: "https://youtube.com/abans",
    },
    choosenTags: ["TVs", "Smartphones", "Tablets"],
    businessHours: [
      {
        businessHourId: 1,
        item: "Monday 09:00 18:00",
        specialNote: "Closed htmlFor lunch 1 PM - 2 PM",
      },
      {
        businessHourId: 2,
        item: "Tuesday 09:00 18:00",
        specialNote: "Extended hours during holiday season",
      },
      {
        businessHourId: 3,
        item: "Sun: Closed",
        specialNote: "Available htmlFor emergency services",
      },
    ],
    owner: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+09 123 456 789",
    },
  };
  const [selectedCategory, setSelectedCategory] =
    useState<Category>("Stationary");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const category = event.target.value as Category;
    setSelectedCategory(category);
    setSelectedTags([]); // Clear selected tags when category changes
  };

  const handleTagChange = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Businessnavbar />
      <div className="flex flex-1 mt-16">
        <div className="flex-none w-64">
          <Businesssidebar selectedTile="Profile" />
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
            {/* Flowbite Modal htmlFor Avatar Upload */}
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
                {/* Edit Button */}
                <div className="flex justify-end mt-1 mb-1">
                  <button
                    className="bg-bluedark text-white px-2 py-2 rounded-md flex items-center"
                    onClick={() => setOpenBusinessModal(true)}
                  >
                    <MdOutlineModeEdit />
                  </button>
                  <Modal
                    show={openBusinessModal}
                    onClose={() => setOpenBusinessModal(false)}
                  >
                    <Modal.Header>Update Business Details</Modal.Header>
                    <Modal.Body>
                      <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                          {/* Business Name */}
                          <div className="flex flex-col">
                            <label
                              htmlFor="businessName"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Business Name
                            </label>
                            <TextInput
                              id="businessName"
                              name="businessName"
                              value={businessDetails.name}
                              required
                              className="block w-full"
                            />
                          </div>

                          {/* Location URL */}
                          <div className="flex flex-col">
                            <label
                              htmlFor="locationUrl"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Location URL
                            </label>
                            <TextInput
                              id="locationUrl"
                              name="locationUrl"
                              value={businessDetails.locationUrl}
                              required
                              className="block w-full"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                          {/* Contact Number */}
                          <div className="flex flex-col">
                            <label
                              htmlFor="contactNumber"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Contact Number
                            </label>
                            <TextInput
                              id="contactNumber"
                              name="contactNumber"
                              value={businessDetails.contactNo}
                              required
                              className="block w-full"
                            />
                          </div>

                          {/* Address */}
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
                              value={businessDetails.address}
                              required
                              className="block w-full"
                            />
                          </div>
                        </div>

                        {/* Description */}
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
                            value={businessDetails.description}
                            rows={4}
                            required
                            className="block w-full"
                          />
                        </div>
                      </form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        type="submit"
                        onClick={() => setOpenBusinessModal(true)}
                        className="bg-bluedark text-white  rounded-md flex items-center"
                      >
                        Update
                      </Button>
                      <Button
                        color="gray"
                        onClick={() => setOpenBusinessModal(false)}
                      >
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
                <div className="flex flex-wrap -mx-2">
                  {/* Left Card */}
                  <div className="w-full md:w-1/3 px-2 mb-4 flex">
                    <Card className="flex-1 p-6 shadow-md border border-gray-200 flex flex-col">
                      <div className="mb-2 flex-grow">
                        <p className="text-black text-sm font-medium">
                          Business Name
                        </p>
                        <p className="text-gray-800">{businessDetails.name}</p>
                      </div>
                      <div className="mb-2 flex-grow">
                        <p className="text-black text-sm font-medium">
                          Business Registration Number
                        </p>
                        <p className="text-gray-800">
                          {businessDetails.registrationNumber}
                        </p>
                      </div>
                      <div className="mb-2 flex-grow">
                        <p className="text-black text-sm font-medium">Status</p>
                        <p className="text-gray-800">
                          {businessDetails.status}
                        </p>
                      </div>
                      <div className="mb-2 flex-grow">
                        <p className="text-black text-sm font-medium">
                          Subscription Package
                        </p>
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
                        <p className="text-black text-sm font-medium">
                          Description
                        </p>
                        <p className="text-gray-800">
                          {businessDetails.description}
                        </p>
                      </div>
                    </Card>
                  </div>

                  {/* Right Card */}
                  <div className="w-full md:w-1/3 px-2 mb-4 flex">
                    <Card className="flex-1 bg-white p-6 shadow-md border border-gray-200 flex flex-col">
                      <div className="mb-2 flex-grow">
                        <p className="text-black text-sm font-medium">
                          Location URL
                        </p>
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
                        <p className="text-black text-sm font-medium">
                          Contact Number
                        </p>
                        <p className="text-gray-800">
                          {businessDetails.contactNo}
                        </p>
                      </div>
                      <div className="mb-2 flex-grow">
                        <p className="text-black text-sm font-medium">
                          Address
                        </p>
                        <p className="text-gray-800">
                          {businessDetails.address}
                        </p>
                      </div>
                    </Card>
                  </div>
                </div>
              </Tab>

              <Tab title="Owner Details">
                <div className="flex justify-end mt-1 mb-1">
                  <button
                    className="bg-bluedark text-white px-2 py-2 rounded-md flex items-center"
                    onClick={() => setOpenOwnerModal(true)}
                  >
                    <MdOutlineModeEdit />
                  </button>
                  <Modal
                    show={openOwnerModal}
                    onClose={() => setOpenOwnerModal(false)}
                    size="md"
                    theme={{
                      content: {
                        base: "bg-white w-3/4 rounded-lg", // Added rounded-lg here
                        inner: "p-6 rounded-lg shadow-lg",
                      },
                    }}
                  >
                    <Modal.Header>Update Business Owner Details</Modal.Header>
                    <Modal.Body>
                      <form className="space-y-4">
                        {/* Owner Name */}
                        <div className="flex flex-col">
                          <label
                            htmlFor="ownerName"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Name
                          </label>
                          <TextInput
                            id="ownerName"
                            name="ownerName"
                            value={businessDetails.owner.name}
                            required
                            className="block w-full"
                          />
                        </div>

                        {/* Owner Email */}
                        <div className="flex flex-col">
                          <label
                            htmlFor="ownerEmail"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Email
                          </label>
                          <TextInput
                            id="ownerEmail"
                            name="ownerEmail"
                            value={businessDetails.owner.email}
                            required
                            className="block w-full"
                          />
                        </div>

                        {/* Owner Phone Number */}
                        <div className="flex flex-col">
                          <label
                            htmlFor="ownerPhone"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Phone Number
                          </label>
                          <TextInput
                            id="ownerPhone"
                            name="ownerPhone"
                            value={businessDetails.owner.phone}
                            required
                            className="block w-full"
                          />
                        </div>
                      </form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        type="submit"
                        onClick={() => setOpenOwnerModal(true)}
                        className="bg-bluedark text-white  rounded-md flex items-center"
                      >
                        Update
                      </Button>
                      <Button
                        color="gray"
                        onClick={() => setOpenOwnerModal(false)}
                      >
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
                <Card className="bg-white p-6 shadow-md border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="mb-2">
                      <p className="text-black text-sm font-medium p-2">
                        Owner Name
                      </p>
                      <p className="text-gray-800 p-2">
                        {businessDetails.owner.name}
                      </p>
                    </div>
                    <div className="mb-2">
                      <p className="text-black text-sm font-medium p-2">
                        Email
                      </p>
                      <p className="text-gray-800 p-2">
                        {businessDetails.owner.email}
                      </p>
                    </div>
                    <div className="mb-2">
                      <p className="text-black text-sm font-medium p-2">
                        Phone Number
                      </p>
                      <p className="text-gray-800 p-2">
                        {businessDetails.owner.phone}
                      </p>
                    </div>
                  </div>
                </Card>
              </Tab>

              <Tab title="Opening Hours">
                <div className="flex justify-end mt-1 mb-1">
                  <button
                    className="bg-bluedark text-white px-2 py-2 rounded-md flex items-center"
                    onClick={() => setOpenHoursModal(true)}
                  >
                    <MdOutlineModeEdit className="text-lg" />
                  </button>
                  <Modal
                    show={openHoursModal}
                    size="3xl"
                    onClose={() => setOpenHoursModal(false)}
                    theme={{
                      content: {
                        base: "bg-white w-3/4 rounded-lg",
                        inner: "p-6 rounded-lg shadow-lg",
                      },
                    }}
                  >
                    <Modal.Header>Update Opening Hours</Modal.Header>
                    <Modal.Body>
                      <form onSubmit={handleSubmit} className="space-y-2">
                        {Object.keys(openDays).map((day) => (
                          <div
                            key={day}
                            className="flex items-center space-x-2 mb-2"
                          >
                            <label className="text-sm font-medium text-gray-900 w-20">
                              {day}
                            </label>
                            <CustomToggleSwitch
                              checked={openDays[day as Day].isOpen}
                              onChange={() => handleToggle(day as Day)}
                            />
                            {openDays[day as Day].isOpen && (
                              <div className="flex items-center space-x-1 ml-4">
                                <input
                                  type="time"
                                  value={openDays[day as Day].startTime}
                                  onChange={(e) =>
                                    handleTimeChange(
                                      day as Day,
                                      "startTime",
                                      e.target.value
                                    )
                                  }
                                  className="w-28 text-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                                <span className="text-xs">TO</span>
                                <input
                                  type="time"
                                  value={openDays[day as Day].endTime}
                                  onChange={(e) =>
                                    handleTimeChange(
                                      day as Day,
                                      "endTime",
                                      e.target.value
                                    )
                                  }
                                  className="w-28 text-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                              </div>
                            )}
                            <input
                              type="text"
                              placeholder="Note"
                              value={openDays[day as Day].specialNote}
                              onChange={(e) =>
                                handleSpecialNoteChange(
                                  day as Day,
                                  e.target.value
                                )
                              }
                              className="ml-2 text-xs flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                          </div>
                        ))}
                      </form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        onClick={() => setOpenHoursModal(false)}
                        className="bg-bluedark text-white rounded-md flex items-center"
                      >
                        Update
                      </Button>
                      <Button
                        color="gray"
                        onClick={() => setOpenHoursModal(false)}
                      >
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
                <Card className="bg-white p-6 shadow-md border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {businessDetails.businessHours.map((hour) => (
                      <div key={hour.businessHourId} className="mb-2">
                        <p className="text-black text-sm font-medium p-2">
                          {hour.item}
                        </p>
                        <p className="text-gray-600 p-2">{hour.specialNote}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </Tab>

              <Tab title="Tags and Social Links">
                <div className="flex justify-between gap-4">
                  {/* Tags Card */}
                  <Card className="bg-white shadow-md border border-gray-200 flex-1">
                    <div className="flex justify-between  px-4 py-2">
                      {/* Container for text and button */}
                      <div className="flex-1">
                        <div className="mb-2">
                          <div className="flex items-center justify-between">
                            <p className="text-black text-sm font-medium p-2">
                              Category
                            </p>
                            <button
                              className="bg-bluedark text-white px-2 py-2 rounded-md flex items-center ml-4"
                              onClick={() => setOpenTagModal(true)}
                            >
                              <MdOutlineModeEdit />

                              {/* Optional text for clarity */}
                            </button>
                          </div>
                          <p className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full inline-block">
                            {businessDetails.category}
                          </p>
                        </div>
                        <div>
                          <p className="text-black text-sm font-medium p-2">
                            Tags
                          </p>
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
                      </div>
                    </div>

                    <Modal
                      show={openTagModal}
                      onClose={() => setOpenTagModal(false)}
                      theme={{
                        content: {
                          base: "bg-white w-3/4 rounded-lg", // Adjust width and rounded corners
                          inner: "p-6 rounded-lg shadow-lg",
                        },
                      }}
                    >
                      <Modal.Header>Update Category and Tags</Modal.Header>
                      <Modal.Body>
                        <form>
                          <div className="mb-5">
                            <label
                              htmlFor="category"
                              className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                            >
                              Choose category:
                            </label>
                            <select
                              id="category"
                              value={selectedCategory}
                              onChange={handleCategoryChange}
                              className="w-full p-2 border-2 border-gray-200 rounded-lg dark:border-gray-700 dark:bg-gray-800"
                            >
                              {Object.keys(predefinedTags).map((category) => (
                                <option key={category} value={category}>
                                  {category}
                                </option>
                              ))}
                            </select>
                          </div>
                          <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
                            Choose Tags:
                          </h3>
                          <ul className="flex flex-wrap gap-2">
                            {predefinedTags[selectedCategory].map((tag) => (
                              <li key={tag}>
                                <input
                                  type="checkbox"
                                  id={`${tag}-option`}
                                  className="hidden peer"
                                  checked={selectedTags.includes(tag)}
                                  onChange={() => handleTagChange(tag)}
                                />
                                <label
                                  htmlFor={`${tag}-option`}
                                  className={`inline-block p-1 text-sm font-semibold text-gray-500 bg-white border-2 rounded-lg cursor-pointer dark:hover:text-gray-300 hover:text-gray-600 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 peer-checked:bg-blue-500  ${
                                    selectedTags.includes(tag)
                                      ? "border-bluedark dark:border-blue-600"
                                      : "border-gray-200 dark:border-gray-700"
                                  }`}
                                >
                                  <div className="block">
                                    <div className="text-sm font-semibold">
                                      {tag}
                                    </div>
                                  </div>
                                </label>
                              </li>
                            ))}
                          </ul>
                        </form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          onClick={() => setOpenTagModal(false)}
                          className="bg-bluedark text-white rounded-md flex items-center"
                        >
                          Update
                        </Button>
                        <Button
                          color="gray"
                          onClick={() => setOpenTagModal(false)}
                        >
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </Card>

                  {/* Social Links Card */}
                  <Card className="bg-white shadow-md border border-gray-200 flex-1 pb-28 ">
                    <div className="flex justify-between  mt-14 mb-2">
                      <p className="text-black text-sm font-medium p-2">
                        Social Links
                      </p>
                      <button
                        className="bg-bluedark text-white px-2 py-2 rounded-md flex items-center"
                        onClick={() => setOpenSocialModal(true)}
                      >
                        <MdOutlineModeEdit />
                      </button>
                    </div>
                    <div className="mb-4">
                      <div className="flex space-x-8">
                        {businessDetails.businessSocialLinks.facebook && (
                          <a
                            href={businessDetails.businessSocialLinks.facebook}
                            className="group relative text-blue-600"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaFacebookF className="text-[#1877F2] text-2xl" />
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 group-hover:bg-sky-600 text-white text-xs font-semibold p-1 rounded-lg transition-opacity duration-500">
                              Facebook
                            </div>
                          </a>
                        )}
                        {businessDetails.businessSocialLinks.twitter && (
                          <a
                            href={businessDetails.businessSocialLinks.twitter}
                            className="group relative text-blue-400"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaSquareXTwitter className="text-[#000] text-2xl" />
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 group-hover:bg-sky-600 text-white text-xs font-semibold p-1 rounded-lg transition-opacity duration-500">
                              Twitter
                            </div>
                          </a>
                        )}
                        {businessDetails.businessSocialLinks.linkedin && (
                          <a
                            href={businessDetails.businessSocialLinks.linkedin}
                            className="group relative text-blue-700"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaLinkedinIn className="text-[#0077b5] text-2xl" />
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 group-hover:bg-sky-600 text-white text-xs font-semibold p-1 rounded-lg transition-opacity duration-500">
                              LinkedIn
                            </div>
                          </a>
                        )}
                        {businessDetails.businessSocialLinks.instagram && (
                          <a
                            href={businessDetails.businessSocialLinks.instagram}
                            className="group relative text-pink-500"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaInstagram className="text-pink-500 text-2xl" />
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 group-hover:bg-sky-600 text-white text-xs font-semibold p-1 rounded-lg transition-opacity duration-500">
                              Instagram
                            </div>
                          </a>
                        )}
                        {businessDetails.businessSocialLinks.youtube && (
                          <a
                            href={businessDetails.businessSocialLinks.youtube}
                            className="group relative text-red-600"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaYoutube className="text-red-600 text-2xl" />
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 group-hover:bg-sky-600 text-white text-xs font-semibold p-1 rounded-lg transition-opacity duration-500">
                              YouTube
                            </div>
                          </a>
                        )}
                      </div>
                    </div>

                    <Modal
                      show={openSocialModal}
                      onClose={() => setOpenSocialModal(false)}
                      theme={{
                        content: {
                          base: "bg-white w-3/4 rounded-lg", // Added rounded-lg here
                          inner: "p-6 rounded-lg shadow-lg",
                        },
                      }}
                    >
                      <Modal.Header>Update - Social Links</Modal.Header>
                      <Modal.Body>
                        <form>
                          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                              <label
                                htmlFor="facebook"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Facebook
                              </label>
                              <div className="relative mb-6">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                  <FaFacebookF className="text-[#1877F2] text-xl m-1" />
                                </div>
                                <input
                                  type="text"
                                  id="facebook"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="https://facebook.com/yourprofile"
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="youtube"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Youtube
                              </label>
                              <div className="relative mb-6">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                  <FaYoutube className="text-red-600 text-xl m-1" />
                                </div>
                                <input
                                  type="text"
                                  id="youtube"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="https://youtube.com/yourprofile"
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="linkedin"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                LinkedIn
                              </label>
                              <div className="relative mb-6">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                  <FaLinkedinIn className="text-[#0077b5] text-xl m-1" />
                                </div>
                                <input
                                  type="text"
                                  id="linkedin"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="https://linkedin.com/yourprofile"
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="instagram"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Instagram
                              </label>
                              <div className="relative mb-6">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                  <FaInstagram className="text-pink-500 text-xl" />
                                </div>
                                <input
                                  type="text"
                                  id="instagram"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="https://instagram.com/yourprofile"
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="twitter"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Twitter
                              </label>
                              <div className="relative mb-6">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                  <FaSquareXTwitter className="text-[#000] text-xl" />
                                </div>
                                <input
                                  type="text"
                                  id="twitter"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="https://twitter.com/yourprofile"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end space-x-4">
                            <button
                              type="button"
                              onClick={() => setOpenSocialModal(false)}
                              className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="bg-bluedark text-white rounded-md flex items-center px-4 py-2"
                            >
                              Save
                            </button>
                          </div>
                        </form>
                      </Modal.Body>
                    </Modal>
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
