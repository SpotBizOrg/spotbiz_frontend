import React from "react";

const Tabs: React.FC<{
  activeTab: string;
  setActiveTab: (tab: string) => void;
}> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="mt-4 border-b border-gray-200">
      <nav className="flex justify-center space-x-4">
        <button
          className={`py-2 px-4 transition duration-200 ${
            activeTab === "About Me"
              ? "text-primary font-bold border-b-2 border-primary"
              : "text-gray-600 hover:text-primary hover:border-primary"
          }`}
          onClick={() => setActiveTab("About Me")}
        >
          About Me
        </button>
        <button
          className={`py-2 px-4 transition duration-200 ${
            activeTab === "Subscribed Businesses"
              ? "text-primary font-bold border-b-2 border-primary"
              : "text-gray-600 hover:text-primary hover:border-primary"
          }`}
          onClick={() => setActiveTab("Subscribed Businesses")}
        >
          Subscribed Businesses
        </button>
      </nav>
    </div>
  );
};

export default Tabs;
