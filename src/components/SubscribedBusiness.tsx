import React, { useState } from "react";
import { Button, List, Modal } from "flowbite-react";
import { FaEyeSlash } from "react-icons/fa";
import BusinessImg from "../assets/Abans.png";

const SubscribedBusinesses: React.FC = () => {
  const [businessToUnsubscribe, setBusinessToUnsubscribe] = useState<
    string | null
  >(null);
  const [showModal, setShowModal] = useState(false);

  const businesses = [
    {
      img: BusinessImg,
      name: "Luxury Hotel",
      category: "Hotels",
    },
    {
      img: BusinessImg,
      name: "Tech World",
      category: "Computer Shops",
    },
    {
      img: BusinessImg,
      name: "Gourmet Foods",
      category: "Food",
    },
    {
      img: BusinessImg,
      name: "Electro Mart",
      category: "Electronic Shops",
    },
    {
      img: BusinessImg,
      name: "Cozy Bites",
      category: "Food",
    },
  ];

  const handleUnsubscribe = (businessName: string) => {
    setBusinessToUnsubscribe(businessName);
    setShowModal(true);
  };

  const confirmUnsubscribe = () => {
    console.log(`Unsubscribed from ${businessToUnsubscribe}`);
    setShowModal(false);
    setBusinessToUnsubscribe(null);
  };

  const cancelUnsubscribe = () => {
    setShowModal(false);
    setBusinessToUnsubscribe(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-lg font-bold mb-4 text-center">
        Subscribed Businesses
      </h2>
      <div className="flex justify-center">
        <List
          unstyled
          className="max-w-md divide-y divide-gray-200 dark:divide-gray-700 w-full"
        >
          {businesses.map((business, index) => (
            <List.Item
              key={index}
              className="flex justify-between items-center py-4 px-6"
            >
              <div className="flex items-center">
                <img
                  src={business.img}
                  alt={business.name}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <p className="text-gray-900 font-medium">{business.name}</p>
                  <p className="text-gray-600 text-sm">{business.category}</p>
                </div>
              </div>
              <Button
                color="failure"
                size="sm"
                onClick={() => handleUnsubscribe(business.name)}
              >
                Unsubscribe
              </Button>
            </List.Item>
          ))}
        </List>
      </div>
      <Modal show={showModal} size="md" popup onClose={cancelUnsubscribe}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <FaEyeSlash className="mx-auto mb-4 h-12 w-12 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to unsubscribe from {businessToUnsubscribe}?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={confirmUnsubscribe}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={cancelUnsubscribe}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SubscribedBusinesses;
