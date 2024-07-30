import React, { useState } from "react";
import { Button, List, Modal } from "flowbite-react";
import { FaBell } from "react-icons/fa";
import BusinessImg from "../assets/Abans.png";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { BsBellSlashFill } from "react-icons/bs";

const SubscribedBusinesses: React.FC = () => {
  const [businessToUnsubscribe, setBusinessToUnsubscribe] = useState<
    string | null
  >(null);
  const [showModal, setShowModal] = useState(false);

  const businesses = [
    {
      img: "https://st3.depositphotos.com/3800167/16211/v/450/depositphotos_162117320-stock-illustration-luxury-hotel-crown-and-key.jpg",
      name: "Luxury Hotel",
      category: "Hotels",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmTz44eme1dFrXyh48R25yq9tgBoIw0KUVnw&s",
      name: "Tech World",
      category: "Computer Shops",
    },
    {
      img: "https://img.freepik.com/premium-vector/gourmet-food-vector-emblem-logo-design_530862-259.jpg",
      name: "Gourmet Foods",
      category: "Food",
    },
    {
      img: "https://pbs.twimg.com/profile_images/1811315466888941568/mUjq0FQ8_400x400.jpg",
      name: "Electro Mart",
      category: "Electronic Shops",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9bjgy9KkyTWGNQGai0li96ZJhRLT9voo_IQ&s",
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {businesses.map((business, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-4 px-6 transform transition-transform duration-200 hover:scale-105 bg-white border border-gray-300 rounded-lg shadow-sm"
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
              className="text-white bg-bluedark"
              size="sm"
              onClick={() => handleUnsubscribe(business.name)}
            >
              <BsBellSlashFill className="w-4 h-4 mr-2" /> Unsunscribe
            </Button>
          </div>
        ))}
      </div>
      <Modal show={showModal} size="md" popup onClose={cancelUnsubscribe}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to unsubscribe from {businessToUnsubscribe}?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                className="text-white bg-bluedark"
                onClick={confirmUnsubscribe}
              >
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
