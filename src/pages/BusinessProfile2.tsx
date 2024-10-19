import React, { useEffect, useState } from "react";
import Businessnavbar from "../components/Businessnavbar";
import Businesssidebar from "../components/Businesssidebar";
import { Button, Card, Modal } from "flowbite-react";
import AbansImage from "../assets/profPicAbans.png";
import RedlineImage from "../assets/profPicRedline.jpg";
import iDealzImage from "../assets/profPiciDealz.png";
import SoftlogicImage from "../assets/profPicSoftlogic.png";
import DefaultImage from "../assets/profPicDefault.jpg";
import { FaCamera, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { Tab, Tabs } from "../components/CustomTabs";
import { useAuth } from "../utils/AuthProvider";
import BusinessDetailsTab from "../components/BusinessDetailsTab";
import OwnerDetailsTab from "../components/OwnerDetailsTab";
import OpeningHoursPage from "../components/OpeningHours";
import TagsAndSocialLinks from "../components/TagsAndSocialLinks";

const BusinessProfile: React.FC = () => {
  const { token, user, checkAuthenticated } = useAuth();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    document.title = "SpotBiz | Profile | Business";
  }, []);

  useEffect(() => {
    if (checkAuthenticated() && user?.email && token) {
      fetchData(user.email, token);
    } else {
      console.log("User is not authenticated or email/token is missing");
    }
  }, [user, token]);

  const fetchData = async (email: string, token: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/business_owner/business/${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response received:", response);
      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      if (!response.ok) {
        console.error("Response error:", response.status);
      }

      const responseData = await response.json();
      setData(responseData);
      setBusinessname(responseData.name);
      setAddress(responseData.address);
      setContactNo(responseData.contactNo);
      setLocationUrl(responseData.locationUrl);
      setDescription(responseData.description);
      console.log(responseData.name)
      if(responseData.name === "Abans "){
        setSelectedAvatar(AbansImage)
      }
      else if(responseData.name === "Redline Technologies"){
        setSelectedAvatar(RedlineImage)
      }
      else if(responseData.name === "iDealz Lanka Pvt Ltd"){
        setSelectedAvatar(iDealzImage)
      }
      else if(responseData.name === "Softlogic Holdings"){
        setSelectedAvatar(SoftlogicImage)
      }
      else{
        setSelectedAvatar(DefaultImage)
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const [BusinessDetailsSubmit, setBusinessDetails] = useState<BusinessDetailsSubmit>({
  //   businessName: 'hello',
  //   locationUrl: '',
  //   contactNumber: '',
  //   address: '',
  //   description: '',
  // });

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value } = e.target;
  //   setBusinessDetails({ ...BusinessDetailsSubmit, [name]: value });
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!user || !token) {
      console.error("User or token is missing");
      return;
    }
  
    const name = businessName;
  
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/business/register/${user.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            locationUrl,
            contactNo,
            address,
            description,
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  const [uploadedAvatar, setUploadedAvatar] = useState<
    string | ArrayBuffer | null
  >(null);

  const [selectedAvatar, setSelectedAvatar] = useState("");

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

  const choosenTags = data?.tags || "[]";

  const businessDetails = {
    name: data?.name,
    businessRegNo: data?.businessRegNo,
    description: data?.description,
    locationUrl: data?.locationUrl,
    contactNo: data?.contactNo,
    address: data?.address,
    status: data?.status,
    categoryId: data?.categoryId,
    subscriptionPackage: data?.subscriptionPackage,
    businessSocialLinks: data?.businessSocialLinks,
    choosenTags: choosenTags,
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

            <Tabs>
              <Tab title="Business Details">
                <BusinessDetailsTab businessDetails={businessDetails} />
              </Tab>

              <Tab title="Owner Details">
                <OwnerDetailsTab />
              </Tab>

              <Tab title="Opening Hours">
                <OpeningHoursPage />
              </Tab>

              <Tab title="Tags and Social Links">
                <TagsAndSocialLinks businessDetails={businessDetails} />
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;
