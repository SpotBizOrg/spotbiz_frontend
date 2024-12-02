import React from "react";
import SubscribedBusinesses from "./SubscribedBusiness"; // Import the component

interface ProfileContentProps {
  activeTab: string;
  userData: {
    name: string;
    email: string;
    phoneNo: string;
  };
}

const ProfileContent: React.FC<ProfileContentProps> = ({ activeTab, userData }) => {
  if (activeTab === "About Me") {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-bold">Personal Information</h2>
        <p>
          <strong>Name:</strong> {userData.name}
        </p>
        <p>
          <strong>Email:</strong> {userData.email}
        </p>
        <p>
          <strong>Phone Number:</strong> {userData.phoneNo}
        </p>
      </div>
    );
  }

  if (activeTab === "Subscribed Businesses") {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <SubscribedBusinesses />
      </div>
    );
  }

  return null;
};

export default ProfileContent;
