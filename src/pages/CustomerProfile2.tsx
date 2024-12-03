import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import Tabs from "../components/ProfileTabs";
import ProfileContent from "../components/ProfileContent";
import AvatarModal from "../components/AvatarModal";
import Customernavbar2 from "../components/Customernavbar2";
import { BACKEND_URL } from "../../config";

const CustomerProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("About Me");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [tempAvatar, setTempAvatar] = useState("");
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  // User data state
  const [userData, setUserData] = useState({
    userId: 0, // Add userId to the state
    name: "",
    email: "",
    phoneNo: "",
  });

  const [availableAvatars, setAvailableAvatars] = useState<string[]>([]);

  useEffect(() => {
    document.title = "SpotBiz | My Profile";

    const email = localStorage.getItem("email");
    if (email) {
      fetchUserProfile(email);
    }
  }, []);

  useEffect(() => {
    if (userData.userId) {
      fetchUserAvatar();
      fetchAvailableAvatars();
    }
  }, [userData]);

  const fetchUserProfile = async (email: string) => {
    try {
      const response = await fetch(`${BACKEND_URL}/users/${email}`);
      if (!response.ok) throw new Error("Failed to fetch user data");

      const data = await response.json();
      setUserData({
        userId: data.userId, // Ensure userId is fetched
        name: data.name || "Unknown Name",
        email: data.email || "Unknown Email",
        phoneNo: data.phoneNo || "Unknown Phone Number",
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const fetchUserAvatar = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/customer/pics/${userData.userId}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedAvatar(data.imageUrl);
        setTempAvatar(data.imageUrl);
      } else {
        assignDefaultAvatar();
      }
    } catch (error) {
      console.error("Error fetching user avatar:", error);
      assignDefaultAvatar();
    }
  };

  const assignDefaultAvatar = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/customer_pic/all`);
      if (response.ok) {
        const avatars = await response.json();
        const defaultAvatar = avatars.find((avatar: any) => avatar.picId === 1)?.imageUrl;
        if (defaultAvatar) {
          setSelectedAvatar(defaultAvatar);
          setTempAvatar(defaultAvatar);
          saveUserAvatar(defaultAvatar);
        }
      }
    } catch (error) {
      console.error("Error assigning default avatar:", error);
    }
  };

  const fetchAvailableAvatars = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/customer_pic/all`);
      if (response.ok) {
        const avatars = await response.json();
        setAvailableAvatars(avatars.map((avatar: any) => avatar.imageUrl));
      }
    } catch (error) {
      console.error("Error fetching available avatars:", error);
    }
  };

  const saveUserAvatar = async (avatarUrl: string) => {
    try {
      console.log("Saving avatar for user:", userData.userId, "with URL:", avatarUrl);
  
      const response = await fetch(`${BACKEND_URL}/api/v1/customer/pics`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userData.userId,
          imageUrl: avatarUrl,
        }),
      });
  
      // Debug the response
      const responseBody = await response.json();
      console.log("Save avatar response:", responseBody);
  
      if (!response.ok) {
        throw new Error(`Failed to save avatar. Status: ${response.status}, Response: ${JSON.stringify(responseBody)}`);
      }
  
      console.log("Avatar saved successfully.");
    } catch (error) {
      console.error("Error saving avatar:", error);
    }
  };
  

  const handleUpdateAvatar = () => {
    setSelectedAvatar(tempAvatar);
    saveUserAvatar(tempAvatar);
    setShowAvatarModal(false);
  };

  return (
    <div className="bg-gray-100 font-body min-h-screen flex flex-col">
      <Customernavbar2 />
      <div className="w-11/12 bg-white shadow-lg rounded-lg mx-auto mt-6">
        <div className="h-64 relative overflow-hidden rounded-t-lg bg-bluedark" style={{ zIndex: 0 }}>
          <div className="absolute top-0 left-64 flex items-end p-4">
            <div className="flex items-center p-4">
              <div className="relative mr-6">
                <img
                  className="h-[160px] w-[160px] bg-white p-1 rounded-full shadow-lg"
                  src={selectedAvatar || "https://via.placeholder.com/150"}
                  alt="Profile"
                  style={{ position: "relative", top: "20px" }}
                />
                <div
                  className="absolute bg-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-100 transition"
                  style={{
                    bottom: "10px",
                    right: "15px",
                    transform: "translate(50%, 50%)",
                  }}
                  onClick={() => setShowAvatarModal(true)}
                >
                  <FaCamera className="text-primary" />
                </div>
              </div>
              <div className="ml-6">
                <h2 className="text-white text-3xl font-bold">{userData.name || "Loading..."}</h2>
                <a className="text-gray-400 mt-2 hover:text-primary" href={`mailto:${userData.email}`}>
                  {userData.email || "Loading..."}
                </a>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="w-full">
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>
      <div className="w-full md:w-2/3 p-6 mx-auto">
        <ProfileContent activeTab={activeTab} userData={userData} />
      </div>
      <AvatarModal
        isOpen={showAvatarModal}
        onClose={() => setShowAvatarModal(false)}
        avatars={availableAvatars}
        selectedAvatar={tempAvatar}
        onSelectAvatar={(avatar) => setTempAvatar(avatar)}
        onUpdate={handleUpdateAvatar}
      />
    </div>
  );
};

export default CustomerProfile;
