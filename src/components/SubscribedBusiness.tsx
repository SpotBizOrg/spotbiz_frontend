import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, List, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

// Utility to get logged-in user's email
const getLoggedInUserEmail = () => localStorage.getItem("email") || null;

// Interface Definitions
interface User {
  userId: number;
  name: string;
  email: string;
}

interface SubscribedBusiness {
  businessId: number;
  businessName: string;
  logo: string;
}

const SubscribedBusinesses: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [businesses, setBusinesses] = useState<SubscribedBusiness[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [businessToUnsubscribe, setBusinessToUnsubscribe] = useState<SubscribedBusiness | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);

  const email = getLoggedInUserEmail();

  // Fetch User and Subscribed Business Details
  useEffect(() => {
    const fetchDetails = async () => {
      if (!email) {
        setError("User not logged in. Please log in to view subscribed businesses.");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Step 1: Fetch User Details
        const userResponse = await axios.get(`http://localhost:8080/api/v1/users/${email}`);
        const userData = userResponse.data;

        if (!userData?.userId) throw new Error("Invalid user data.");
        setUser(userData);

        const subscriptionsResponse = await axios.get(
          `http://localhost:8080/api/v1/sub_business/subscribed/email/${userData.userId}`
        );
        const subscribedBusinesses = subscriptionsResponse.data;

        // Map response data directly to businesses
        const businessDetails = subscribedBusinesses.map((sub: any) => ({
          businessId: sub.businessId,
          businessName: sub.businessName || "Unknown Business",
          logo: sub.logo || "/placeholder-image.png", // Fallback image
        }));

        setBusinesses(businessDetails);
      } catch (err) {
        console.error("Error fetching subscribed businesses:", err);
        setError("Failed to fetch subscribed businesses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [email]);

  // Unsubscribe Handler
  const handleUnsubscribe = (business: SubscribedBusiness) => {
    setBusinessToUnsubscribe(business);
    setShowModal(true);
  };

  const confirmUnsubscribe = async () => {
    if (!user || !businessToUnsubscribe) return;

    try {
      await axios.delete(
        `http://localhost:8080/api/v1/sub_business/unsubscribe/${user.userId}/${businessToUnsubscribe.businessId}`
      );

      setBusinesses(businesses.filter((b) => b.businessId !== businessToUnsubscribe.businessId));
    } catch (err) {
      console.error("Error unsubscribing from business:", err);
      alert("Failed to unsubscribe. Please try again.");
    } finally {
      setShowModal(false);
      setBusinessToUnsubscribe(null);
    }
  };

  const cancelUnsubscribe = () => {
    setShowModal(false);
    setBusinessToUnsubscribe(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-lg font-bold mb-4 text-center">Subscribed Businesses</h2>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && businesses.length > 0 && (
        <List unstyled className="max-w-md mx-auto divide-y divide-gray-200">
          {businesses.map((business) => (
            <List.Item key={business.businessId} className="flex justify-between py-4 items-center">
              <div className="flex items-center">
                <img
                  src={business.logo}
                  alt={business.businessName}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <p className="text-gray-900 font-medium">{business.businessName}</p>
                </div>
              </div>
              <Button
                className="text-white bg-bluedark"
                size="sm"
                onClick={() => handleUnsubscribe(business)}
              >
                Unsubscribe
              </Button>
            </List.Item>
          ))}
        </List>
      )}

      {!loading && !error && businesses.length === 0 && (
        <p className="text-center text-gray-500">No subscribed businesses found.</p>
      )}

      <Modal show={showModal} size="md" popup onClose={cancelUnsubscribe}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400" />
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Are you sure you want to unsubscribe from {businessToUnsubscribe?.businessName}?
            </h3>
            <div className="flex justify-center gap-4">
              <Button className="text-white bg-bluedark" onClick={confirmUnsubscribe}>
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
