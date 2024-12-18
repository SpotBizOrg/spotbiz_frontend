import React, { useEffect, useState } from "react";
import Businessnavbar from "../components/Businessnavbar";
import Businesssidebar from "../components/Businesssidebar";
import { Button, Card, Modal } from "flowbite-react";
import DefaultImage from "../assets/profPicDefault.jpg";
import { FaCamera, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { Tab, Tabs } from "../components/CustomTabs";
import { useAuth } from "../utils/AuthProvider";
import BusinessDetailsTab from "../components/BusinessDetailsTab";
import OwnerDetailsTab from "../components/OwnerDetailsTab";
import OpeningHoursPage from "../components/OpeningHours";
import TagsAndSocialLinks from "../components/TagsAndSocialLinks";
import { toast } from "react-toastify";
import StarRating from "../components/StarRating";
import { BACKEND_URL } from "../../config";

const BusinessProfile: React.FC = () => {
  const { token, user, checkAuthenticated } = useAuth();
  const [data, setData] = useState<any>(null);
  const [SubscriberCount, setSubscriberCount] = useState<number>(0);
  const [reviewCount, setReviewCount] = useState<number>(0);
  const [avgReview, setAvgReview] = useState<number>(0);
  const [imageFile, setImageFile] = useState<File | null>(null);

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

  useEffect(() => {
    if (data?.businessId && token) {
      fetchSubscribeCount(data.businessId);
      fetchReviewStats(data.businessId);
    }
  }, [data, token]);

  const fetchSubscribeCount = async (businessId: number) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/sub_business/subscribe_count/${businessId}`
      );

      if (!response.ok) {
        console.error("Failed to fetch subscriber count:", response.status);
        return;
      }

      const responseData = await response.json();
      console.log("Subscriber count response:", responseData);
      setSubscriberCount(responseData);
    } catch (error) {
      console.error("Error fetching subscriber count:", error);
    }
  };
  const fetchReviewStats = async (businessId: number) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/review/statistics/${businessId}`
      );

      if (!response.ok) {
        console.error("Failed to fetch:", response.status);
        return;
      }

      const responseData = await response.json();
      setAvgReview(responseData.averageRating);
      setReviewCount(responseData.numberOfRatings);
    } catch (error) {
      console.error(
        `Error fetching review statistics for business ID ${businessId}:`,
        error
      );
    }
  };

  const fetchData = async (email: string, token: string) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/business_owner/business/${email}`,
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
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  const [uploadedAvatar, setUploadedAvatar] = useState<
    string | ArrayBuffer | null
  >(null);

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${BACKEND_URL}/upload_image`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${
          errorData.message || "Unknown error"
        }`
      );
    }

    return response.text();
  };
  const updateLogo = async () => {
    if (!uploadedAvatar || !user?.email || !token) {
      console.error("Missing data for updating logo");
      return;
    }

    const imageUrl = await uploadImage(imageFile!);

    try {
      const response = await fetch(
        `${BACKEND_URL}/business/update/${user.email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ logo: imageUrl }),
        }
      );

      if (response.ok) {
        const updatedData = { ...data, logo: uploadedAvatar };
        setData(updatedData);
        setIsAvatarModalOpen(false);
        toast.success("Logo updated successfully");
      } else {
        toast.error("Failed to update logo");
      }
    } catch (error) {
      toast.error(`Error updating logo: ${error || "Unknown error"}`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    setUploadedAvatar(null);
    setIsAvatarModalOpen(false);
  };

  const choosenTags = data?.tags || "[]";

  const businessDetails = {
    businessId: data?.businessId,
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
    logo: data?.logo || DefaultImage,
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
                    src={businessDetails.logo}
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
                  <p className="mt-2">Subscriber Count: {SubscriberCount}</p>
                  <p className="mt-2 flex items-center">
                    {avgReview} &nbsp;
                    <StarRating
                      avgReview={avgReview}
                      reviewCount={reviewCount}
                    />
                    &nbsp; ({reviewCount} ratings)
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
                  className="text-white bg-bluedark hover:bg-bluedark/90 focus:ring-4 focus:outline-none focus:ring-bluedark/50 font-medium rounded-lg inline-flex items-center transition duration-200"
                  onClick={updateLogo}
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
