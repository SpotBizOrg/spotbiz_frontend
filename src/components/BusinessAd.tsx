import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthProvider";
import { Modal, Badge, TextInput, Label, Button } from "flowbite-react";
import Businessnavbar from "../components/Businessnavbar";
import Businesssidebar from "../components/Businesssidebar";
import Container from "./Container";
import { FaPlus } from "react-icons/fa";

interface Advertisement {
  img: string;
  date: string;
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

  useEffect(() => {
    if (checkAuthenticated() && user?.email && token) {
      fetchAdvertisementData(user.email, token);
    } else {
      console.log("User is not authenticated or email/token is missing");
    }
  }, [user, token]);

  const fetchAdvertisementData = (email: string, token: string) => {
    fetch(
      `http://localhost:8080/api/v1/business_owner/advertisements/${email}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const parsedAdvertisements = data.map((ad: any) => ({
          ...JSON.parse(ad.data),
          isActive: ad.status,
        }));
        console.log(parsedAdvertisements);
        setAdvertisements(parsedAdvertisements);
      })
      .catch((error) => console.error(error));
  };

  const openPopup = (image: string, details: Advertisement) => {
    setSelectedImage(image);
    setSelectedImageDetails(details);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setSelectedImage(null);
    setSelectedImageDetails(null);
  };

  const openFormPopup = () => {
    setFormPopupOpen(true);
  };

  const closeFormPopup = () => {
    setFormPopupOpen(false);
  };

  const handleAddAd = () => {
    console.log("New Advertisement:", newAd);
    closeFormPopup();
  };

  const [newAd, setNewAd] = useState<Partial<Advertisement>>({
    description: "",
    img: "",
  });

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
            Advertisements posted on last two weeks
          </p>
          <div
            className="relative flex items-center justify-center w-[40px] h-[40px] mt-0 border-2 border-dashed border-gray-400 rounded-lg bg-white/50 backdrop-blur-md hover:bg-white/80 hover:border-gray-600 transition-all duration-300 ease-in-out cursor-pointer"
            onClick={openFormPopup}
          >
            <FaPlus className="text-xl text-gray-500" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {advertisements.map((ad, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-md shadow-md mb-5 border border-gray-300 cursor-pointer transform transition-transform duration-300 hover:scale-105"
              onClick={() => openPopup(ad.img, ad)}
            >
              <img
                src={ad.img}
                alt="Ad"
                className="w-full h-auto object-cover rounded-lg mb-5 "
              />
              <p className="text-bodylarge">{ad.description}</p>
              <p className="mt-2 text-bodysmall text-gray-600">
                <b>Posted on:</b> {ad.date}
              </p>
            </div>
          ))}
        </div>

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
                    {selectedImageDetails?.date}
                  </p>
                  <p className="text-sm text-gray-600">
                    <b>Removing on: </b>
                    {selectedImageDetails?.endDate}
                  </p>

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

        <Modal
          dismissible
          show={formPopupOpen}
          onClose={closeFormPopup}
          size="lg"
          theme={{
            content: {
              base: "bg-white w-3/4 rounded-lg",
              inner: "rounded-lg shadow-lg",
            },
          }}
        >
          <Modal.Header>Add New Advertisement</Modal.Header>
          <Modal.Body>
            <form className="space-y-6">
              <div>
                <Label htmlFor="details">Advertisement Name</Label>
                <TextInput
                  id="details"
                  type="text"
                  value={newAd.description}
                  onChange={(e) =>
                    setNewAd({ ...newAd, description: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="image">Advertisement Image</Label>
                <TextInput
                  id="image"
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setNewAd({ ...newAd, img: reader.result as string });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="mt-1"
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleAddAd}>Add Advertisement</Button>
            <Button color="gray" onClick={closeFormPopup}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Container>
  );
};

export default BusinessAd;
