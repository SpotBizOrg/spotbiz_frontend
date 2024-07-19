import Adminnavbar from "../components/Adminnavbar";
import Adminsidebar from "../components/Adminsidebar";
import Container from "../components/Container";

import BadgeImg from "../assets/badge.png";
import "./custom-datepicker.css";

import React, { useState, useEffect } from "react";
import { Button, Card, Modal, Label, TextInput } from "flowbite-react";

import "react-datepicker/dist/react-datepicker.css";
import YearMonthSelector from "../components/DatePicker";

interface BadgeDetails {
  month: string;
  year: string;
  businessName: string;
  rating: number;
  createdAt: Date; // New property to store creation date
}

function Badges() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBadge, setCurrentBadge] = useState<BadgeDetails | null>(null);
  const [badgeDetails, setBadgeDetails] = useState<BadgeDetails>({
    month: "",
    year: "",
    businessName: "",
    rating: 0,
    createdAt: new Date(), // Initialize with current date
  });
  const [pastBadges, setPastBadges] = useState<BadgeDetails[]>([
    // Sample data for past badges
    {
      month: "June",
      year: "2023",
      businessName: "Sample Business 1",
      rating: 4.2,
      createdAt: new Date("2023-06-01"),
    },
    {
      month: "July",
      year: "2023",
      businessName: "Sample Business 2",
      rating: 4.8,
      createdAt: new Date("2023-07-01"),
    },
    {
      month: "August",
      year: "2023",
      businessName: "Sample Business 3",
      rating: 4.5,
      createdAt: new Date("2023-08-01"),
    },
  ]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Replace these with values fetched from the backend
  const businessName = "ABC private limited";
  const rating = 4.5;

  useEffect(() => {
    setBadgeDetails((prevDetails) => ({
      ...prevDetails,
      businessName,
      rating,
    }));
  }, [businessName, rating]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleMonthYearChange = (monthYear: string) => {
    const [month, year] = monthYear.split(" ");
    setBadgeDetails((prevDetails) => ({ ...prevDetails, month, year }));
  };

  const handleCreateBadge = () => {
    const newBadge: BadgeDetails = {
      ...badgeDetails,
      createdAt: new Date(), // Set creation date to current date
    };
    setCurrentBadge(newBadge);
    setPastBadges((prevBadges) => [...prevBadges, newBadge]);
    closeModal();
  };

  return (
    <Container>
      <Adminnavbar />
      <Adminsidebar selectedTile="Badges" />

      <div className="px-12 sm:ml-64 mt-20">
        <div className="w-fit mb-10 ">
          <h1 className="text-subsubheading text-bluedark">Business Badges</h1>
        </div>

        <div className=" mx-auto p-4">
          {/* Current Badge Section */}
          <section
            id="current-badge"
            className="mb-8 bg-white p-6 rounded-lg  text-center border border-gray-200"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Current Badge of Excellence
            </h2>
            {currentBadge ? (
              <Card className="flex flex-col items-center text-center">
                <div className="flex justify-center items-center w-full">
                  <p className="text-sm text-gray-500">
                    {currentBadge.month} {currentBadge.year}
                  </p>
                </div>
                <img
                  src={BadgeImg}
                  alt="Badge"
                  className="w-24 h-24 mb-4 mx-auto"
                />
                <p className="text-md font-medium">
                  {currentBadge.businessName}
                </p>
                <p className="text-md font-medium text-yellow-500">
                  Rating: {currentBadge.rating}
                </p>
              </Card>
            ) : (
              <p>No current badge available.</p>
            )}
            <Button onClick={openModal} className="mt-4 bg-bluedark">
              Create New Badge
            </Button>
          </section>

          {/* Past Badges Section */}
          <section
            id="past-badges"
            className="bg-white p-6 rounded-lg border border-gray-200 text-center"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Past Badges
            </h2>
            {pastBadges.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pastBadges.map((badge, index) => (
                  <Card
                    key={index}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="flex justify-center items-center w-full">
                      <p className="text-sm text-gray-500">{`${badge.month} ${badge.year}`}</p>
                    </div>
                    <img
                      src={BadgeImg}
                      alt="Badge"
                      className="w-16 h-16 mb-2 mx-auto"
                    />
                    <p className="text-md font-medium">{badge.businessName}</p>
                  </Card>
                ))}
              </div>
            ) : (
              <p>No past badges available.</p>
            )}
          </section>

          {/* Modal for Creating Badge */}
          <Modal
            show={isModalOpen}
            onClose={closeModal}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "rgba(17, 24, 39, 0.5)",
            }}
          >
            <Modal.Header>Create New Badge</Modal.Header>
            <Modal.Body>
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <TextInput
                      id="businessName"
                      name="businessName"
                      placeholder="Business Name"
                      value={businessName}
                      disabled
                    />
                  </div>
                  <div className="w-1/2">
                    <Label htmlFor="rating">Rating</Label>
                    <TextInput
                      id="rating"
                      name="rating"
                      placeholder="Rating"
                      value={rating.toString()}
                      disabled
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="date">Select Month and Year</Label>
                  <YearMonthSelector
                    onMonthYearChange={handleMonthYearChange}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex justify-center items-center w-full">
                    <p className="text-sm text-gray-500">{`${badgeDetails.month} ${badgeDetails.year}`}</p>
                  </div>
                  <img
                    src={BadgeImg}
                    alt="Badge"
                    className="w-24 h-24 mb-2 mx-auto"
                  />
                  <p className="text-md font-medium">
                    {badgeDetails.businessName}
                  </p>
                  <p className="text-md font-medium text-yellow-500">
                    Rating: {badgeDetails.rating}
                  </p>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button className="bg-bluedark" onClick={handleCreateBadge}>
                Create Badge
              </Button>
              <Button color="gray" onClick={closeModal}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </Container>
  );
}

export default Badges;
