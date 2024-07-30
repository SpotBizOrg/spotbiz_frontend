import React, { useState, ReactNode, ReactElement } from "react";

// Tab Component
interface TabProps {
  title: string;
  children: ReactNode;
}

const Tab: React.FC<TabProps> = ({ children }) => {
  return <>{children}</>;
};

// Tabs Component
interface TabsProps {
  children: ReactElement<TabProps>[];
}

const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  // Ensure children are of type ReactElement with TabProps
  const tabs = React.Children.toArray(children) as ReactElement<TabProps>[];

  return (
    <div className=" rounded-lg">
      <div className="flex justify-center  mb-4">
        {tabs.map((tab, index) =>
          React.isValidElement(tab) ? (
            <button
              key={index}
              className={`p-4 text-sm font-medium border-b-2 ${
                activeTab === index
                  ? "border-bluedark text-bluedark"
                  : "border-transparent hover:text-bluedark"
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab.props.title}
            </button>
          ) : null
        )}
      </div>

      {React.isValidElement(tabs[activeTab])
        ? tabs[activeTab].props.children
        : null}
    </div>
  );
};

export { Tabs, Tab };
