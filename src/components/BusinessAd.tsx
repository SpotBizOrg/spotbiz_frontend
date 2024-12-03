import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthProvider";
import { Modal, Badge } from "flowbite-react";
import Businessnavbar from "../components/Businessnavbar";
import Businesssidebar from "../components/Businesssidebar";
import Container from "./Container";
import { FaPlus } from "react-icons/fa";
import AddAdvertisementModal from "../components/AddBusinessAd";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../config";

interface Advertisement {
  id: number;
  img: string;
  description: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

const BusinessAd: React.FC = () => {
  const { token, user, checkAuthenticated } = useAuth();
  const [popupOpen, setPopupOpen] = useState(false);
  const [formPopupOpen, setFormPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageDetails, setSelectedImageDetails] =
    useState<Advertisement | null>(null);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (checkAuthenticated() && user?.email && token) {
      handleAddAd();
    } else {
      console.log("User is not authenticated or email/token is missing");
    }
  }, [user, token]);

  const openPopup = (image: string, details: Advertisement, id: Number) => {
    setSelectedImage(image);
    setSelectedImageDetails(details);
    setTags([]);
    setLoading(true);
    console.log(id);
    fetch(`${BACKEND_URL}/advertisement/getTags/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.keywords)) {
          setTags(data.keywords);
        } else {
          console.error("Unexpected data format:", data);
          // toast.error("Unexpected data format");
        }
      })
      .catch((error) => {
        console.error("Failed to fetch tags:", error);
        // toast.error("Failed to fetch tags");
      })
      .finally(() => {
        setLoading(false);
      });
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setSelectedImage(null);
    setSelectedImageDetails(null);
  };

  const openFormPopup = () => {
    const validationUrl = `${BACKEND_URL}/advertisement/add_validation/${user?.email}`;
    setLoading(true);
    fetch(validationUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to validate advertisement addition");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setFormPopupOpen(true);
        } else {
          // toast.error(
          //   "You have reached the advertisement limit for this week. Please upgrade your package to add more ads."
          // );
        }
      })
      .catch((error) => {
        console.error("Validation error:", error);
        // toast.error(
        //   "An error occurred while validating. Please try again later."
        // );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const closeFormPopup = () => {
    setFormPopupOpen(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleAddAd = () => {
    try {
      fetch(
        `${BACKEND_URL}/business_owner/advertisements/${user?.email}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch advertisements");
          }
          return response.json();
        })
        .then((data) => {
          const parsedAdvertisements = data.map((ad: any) => ({
            id: ad.adsId,
            img: JSON.parse(ad.data).img,
            description: JSON.parse(ad.data).description,
            startDate: JSON.parse(ad.data).startDate,
            endDate: JSON.parse(ad.data).endDate,
            isActive: ad.status,
          }));
          console.log(parsedAdvertisements);
          setAdvertisements(parsedAdvertisements);
        })
        .catch((error) => {
          console.error("Failed to fetch advertisements:", error);
          // toast.error("Failed to fetch advertisements");
        });
    } catch (error) {
      console.error("Failed to fetch advertisements:", error);
      // toast.error("Failed to fetch advertisements");
    }
  };

  return (
    <Container>
      <Businessnavbar />
      <Businesssidebar selectedTile="Ads & Promos" />
      <div className="px-12 sm:ml-64 mt-20">
        <div className="w-fit mb-10 border-b-gray-900">
          <h1 className="text-subsubheading text-bluedark">
            My Advertisements and Promotions
          </h1>
        </div>
        <div className="flex items-center justify-between w-full mb-5">
          <p className="text-gray-400 text-bodysmall font-semibold">
            Advertisements posted on last 30 days
          </p>
          <div
            className="relative flex items-center justify-center w-[40px] h-[40px] mt-0 border-2 border-dashed border-gray-400 rounded-lg bg-white/50 backdrop-blur-md hover:bg-white/80 hover:border-gray-600 transition-all duration-300 ease-in-out cursor-pointer"
            onClick={openFormPopup}
          >
            <FaPlus className="text-xl text-gray-500" />
          </div>
        </div>

        {advertisements.length === 0 ? (
          <p className="text-center text-gray-500">No advertisements found</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {advertisements.map((ad, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-md shadow-md mb-5 border border-gray-300 cursor-pointer transform transition-transform duration-300 hover:scale-105"
                onClick={() => openPopup(ad.img, ad, ad.id)}
              >
                <img
                  src={ad.img}
                  alt="Ad"
                  className="w-full h-auto object-cover rounded-lg mb-5 "
                />
                <p className="text-bodylarge">{ad.description}</p>
                <p className="mt-2 text-bodysmall text-gray-600">
                  <b>Posted on:</b> {formatDate(ad.startDate)}
                </p>
              </div>
            ))}
          </div>
        )}

        <Modal
          dismissible
          show={popupOpen}
          onClose={closePopup}
          size="lg"
          theme={{
            content: {
              base: "bg-white w-3/4 rounded-lg",
              inner: "rounded-lg shadow-lg",
            },
          }}
        >
          <Modal.Header>Advertisement Details</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <img
                src={selectedImage!}
                alt="Ad"
                className="w-full h-auto object-cover rounded mb-4"
              />
              <div className="flex flex-col">
                <div>
                  <p className="text-lg font-semibold">
                    {selectedImageDetails?.description}
                  </p>
                  <p className="text-sm text-gray-600">
                    <b>Posted on: </b>
                    {selectedImageDetails?.startDate
                      ? formatDate(selectedImageDetails.startDate)
                      : "Date not available"}
                  </p>
                  <p className="text-sm text-gray-600">
                    <b>Removing on: </b>
                    {selectedImageDetails?.endDate
                      ? formatDate(selectedImageDetails.endDate)
                      : "Date not available"}
                  </p>

                  {loading ? (
                    <p>Loading tags...</p>
                  ) : (
                    <div>
                      {tags.map((tag, index) => (
                        <span key={index} className="badge">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {!selectedImageDetails?.isActive && (
                    <div className="float-right">
                      <Badge className="bg-red-400">Removed</Badge>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        <AddAdvertisementModal
          show={formPopupOpen}
          onClose={closeFormPopup}
          onAdd={handleAddAd}
        />
      </div>
    </Container>
  );
};

export default BusinessAd;
