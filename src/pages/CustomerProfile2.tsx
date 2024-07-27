import React, { useState } from "react";
import Customernavbar from "../components/Customernavbar";
import { FaCamera } from "react-icons/fa";
import Tabs from "../components/ProfileTabs";
import ProfileContent from "../components/ProfileContent";
import AvatarModal from "../components/AvatarModal"; // Ensure the correct import

const CustomerProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("About Me");
  const [selectedAvatar, setSelectedAvatar] = useState(
    "https://flowbite.com/docs/images/people/profile-picture-3.jpg"
  );
  const [tempAvatar, setTempAvatar] = useState(selectedAvatar); // State for temp avatar selection
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const avatars = [
    "https://flowbite.com/docs/images/people/profile-picture-1.jpg",
    "https://flowbite.com/docs/images/people/profile-picture-2.jpg",
    "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
    "https://flowbite.com/docs/images/people/profile-picture-4.jpg",
    "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
  ];

  const handleUpdateAvatar = () => {
    setSelectedAvatar(tempAvatar); // Update the selected avatar
    setShowAvatarModal(false); // Close the modal
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Customernavbar />
      <div className="w-11/12 bg-white shadow-lg rounded-lg transform duration-200 ease-in-out mx-auto mt-6">
        <div
          className="h-64 relative overflow-hidden rounded-t-lg bg-bluedark"
          style={{
            zIndex: 0,
          }}
        >
          <div className="absolute top-0 left-64 flex items-end p-4">
            <div className="flex items-center p-4">
              <div className="relative mr-6">
                <img
                  className="h-[160px] w-[160px] bg-white p-1 rounded-full shadow-lg"
                  src={selectedAvatar}
                  alt="Profile"
                  style={{
                    position: "relative",
                    top: "20px", // Adjust this value to move the image down
                  }}
                />
                <div
                  className="absolute bg-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-gray-100 transition"
                  style={{
                    bottom: "10px", // Moves the icon vertically
                    right: "15px", // Moves the icon horizontally to the right of the image
                    transform: "translate(50%, 50%)", // Centers the icon horizontally
                  }}
                  onClick={() => setShowAvatarModal(true)}
                >
                  <FaCamera className="text-primary" />
                </div>
              </div>
              <div className="ml-6">
                <h2 className="text-white text-3xl font-bold">Nirasha Nelki</h2>
                <a
                  className="text-gray-400 mt-2 hover:text-primary"
                  href="mailto:someone@gmail.com"
                >
                  someone@gmail.com
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
        <ProfileContent activeTab={activeTab} />
      </div>

      {/* Avatar Modal */}
      <AvatarModal
        isOpen={showAvatarModal}
        onClose={() => setShowAvatarModal(false)}
        avatars={avatars}
        selectedAvatar={tempAvatar} // Pass the tempAvatar for selection
        onSelectAvatar={(avatar) => setTempAvatar(avatar)} // Update tempAvatar on select
        onUpdate={handleUpdateAvatar} // Handle update action
      />
    </div>
  );
};

export default CustomerProfile;
