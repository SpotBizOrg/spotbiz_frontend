import React from "react";
import AboutMe from "./CustomerDetails";
import SubscribedBusinesses from "./SubscribedBusiness";

const ProfileContent: React.FC<{ activeTab: string }> = ({ activeTab }) => {
  switch (activeTab) {
    case "Subscribed Businesses":
      return <SubscribedBusinesses />;
    case "About Me":
    default:
      return <AboutMe />;
  }
};

export default ProfileContent;
