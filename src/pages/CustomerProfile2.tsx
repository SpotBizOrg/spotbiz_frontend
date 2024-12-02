import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import Tabs from "../components/ProfileTabs";
import ProfileContent from "../components/ProfileContent";
import AvatarModal from "../components/AvatarModal";
import Customernavbar2 from "../components/Customernavbar2";

const CustomerProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("About Me");
  const [selectedAvatar, setSelectedAvatar] = useState(
    "https://flowbite.com/docs/images/people/profile-picture-3.jpg"
  );
  const [tempAvatar, setTempAvatar] = useState(selectedAvatar);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  // User data state
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNo: "",
  });

  useEffect(() => {
    document.title = "SpotBiz | My Profile";

    // Fetch the logged-in user's email from localStorage
    const email = localStorage.getItem("email"); // Correct key based on system
    if (email) {
      console.log("Email retrieved from localStorage:", email);
      fetchUserProfile(email);
    } else {
      console.error("Email not found in localStorage.");
      // Optional: Redirect to login page or display an error message
    }
  }, []);

  // Fetch user profile from the backend
  const fetchUserProfile = async (email: string) => {
    try {
      console.log("Fetching user profile for email:", email);
      const response = await fetch(`http://localhost:8080/api/v1/users/${email}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      console.log("Fetched user data:", data);

      // Update userData state with correct fields
      setUserData({
        name: data.name || "Unknown Name",
        email: data.email || "Unknown Email",
        phoneNo: data.phoneNo || "Unknown Phone Number", // Ensure field matches backend
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  // Handle avatar update
  const handleUpdateAvatar = () => {
    setSelectedAvatar(tempAvatar);
    setShowAvatarModal(false);
  };

  return (
    <div className="bg-gray-100 font-body min-h-screen flex flex-col">
      <Customernavbar2 />
      <div className="w-11/12 bg-white shadow-lg rounded-lg mx-auto mt-6">
        <div
          className="h-64 relative overflow-hidden rounded-t-lg bg-bluedark"
          style={{ zIndex: 0 }}
        >
          <div className="absolute top-0 left-64 flex items-end p-4">
            <div className="flex items-center p-4">
              <div className="relative mr-6">
                <img
                  className="h-[160px] w-[160px] bg-white p-1 rounded-full shadow-lg"
                  src={selectedAvatar}
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
                <h2 className="text-white text-3xl font-bold">
                  {userData.name || "Loading..."}
                </h2>
                <a
                  className="text-gray-400 mt-2 hover:text-primary"
                  href={`mailto:${userData.email}`}
                >
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

      {/* Avatar Modal */}
      <AvatarModal
        isOpen={showAvatarModal}
        onClose={() => setShowAvatarModal(false)}
        avatars={[
          "https://flowbite.com/docs/images/people/profile-picture-2.jpg",
          "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
          "https://flowbite.com/docs/images/people/profile-picture-4.jpg",
          "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
        ]}
        selectedAvatar={tempAvatar}
        onSelectAvatar={(avatar) => setTempAvatar(avatar)}
        onUpdate={handleUpdateAvatar}
      />
    </div>
  );
};

export default CustomerProfile;
