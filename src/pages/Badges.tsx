import Adminnavbar from "../components/Adminnavbar";
import Adminsidebar from "../components/Adminsidebar";
import Container from "../components/Container";

import BadgeImg from "../assets/badge.png";
import "./custom-datepicker.css";

import React, { useState, useEffect } from "react";
import { Button, Card, Modal, Label, TextInput } from "flowbite-react";

import "react-datepicker/dist/react-datepicker.css";
import YearMonthSelector from "../components/DatePicker";
import { FaPlus } from "react-icons/fa";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { toast } from "react-toastify";

interface BadgeDetails {
  month: string;
  year: string;
  businessName: string;
  rating: number;
  createdAt: Date; // New property to store creation date
}

function Badges() {


  useEffect(()=>{
    document.title = "SpotBiz | Badges | Admin";

    fetchBadgeData();

  },[]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBadge, setCurrentBadge] = useState<BadgeDetails | null>(null);
  const [badgeDetails, setBadgeDetails] = useState<BadgeDetails>({
    month: "",
    year: "",
    businessName: "",
    rating: 0,
    createdAt: new Date(), // Initialize with current date
  });
  const [pastBadges, setPastBadges] = useState<BadgeDetails[]>([]);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [businessName, setBusinessName] = useState<string>("")
  const [rating, setRating] = useState<number>(0);
  const [businessId, setBusinessId] = useState<number>(0);

  // Replace these with values fetched from the backend
  // let businessName = "Present Solutions";
  // let rating = 4.5;

  const fetchBadgeData = async () =>{
    const url = `${BACKEND_URL}/business_badge/all/6`

    try{
      const response = await axios.get(url);
      const data = response.data;

      // Transform the fetched data
      const transformedBadges = data.map((badge: any) => ({
        month: new Date(badge.issuedDate).toLocaleString("default", { month: "long" }),
        year: new Date(badge.issuedDate).getFullYear().toString(),
        businessName: badge.businessName,
        rating: badge.rating,
        createdAt: new Date(badge.issuedDate),
      }));

      // Update the pastBadges state
      setPastBadges(transformedBadges);
      
      
    }catch (error) {
      console.error(error);
    }
  }

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

  const saveNewBadge = async() =>{
    const url = `${BACKEND_URL}/business_badge`

    const body = {
      badgeId: 0,
      businessId: businessId,
      businessName: businessName,
      issuedDate: new Date(),
      rating: rating
    }

    console.log(body);
    

    try{
      const response = await axios.post(url, body)
      
      if (response.status == 200) {
        toast.success("Badge Issued!")
      }
    }catch (error) {
      toast.error("Error Occured")
      console.error(error);
    }
  }

  const handleCreateBadge = () => {

    saveNewBadge()
    const newBadge: BadgeDetails = {
      ...badgeDetails,
      createdAt: new Date(),
      month: new Date().toLocaleString("default", { month: "long" }),
      year: new Date().getFullYear().toString(), // Set creation date to current date
    };
    setCurrentBadge(newBadge);
    setPastBadges((prevBadges) => [...prevBadges, newBadge]);
    closeModal();
  };

  const fetchAwardedBusiness = async () => {
    const url = `${BACKEND_URL}/business_badge/new`

    try{
      const response = await axios.get(url);
      // console.log(response.data);

      console.log(response.data.businessName);
      console.log(response.data.businessId);

      setBusinessName(response.data.businessName)
      setRating(response.data.rating)
      setBusinessId(response.data.businessId)
      // businessName = response.data.businessName
      // rating = response.data.rating
      


    }catch (error) {
      toast.error("Error occurred!")
      console.error(error);
    }

  }

  useEffect(() => {
      fetchAwardedBusiness()
  },[isModalOpen==true])

  return (
    <Container>
      <Adminnavbar />
      <Adminsidebar selectedTile="Badges" />

      <div className="px-12 sm:ml-64 mt-20">
      <div className="flex justify-between items-center w-full mb-10">
          <h1 className="text-subsubheading text-bluedark">Business Badges</h1>
          <div
            className="relative flex items-center justify-center w-[40px] h-[40px] mt-0 border-2 border-dashed border-gray-400 rounded-lg bg-white/50 backdrop-blur-md hover:bg-white/80 hover:border-gray-600 transition-all duration-300 ease-in-out cursor-pointer"
            onClick={openModal}
          >
            <FaPlus className="text-xl text-gray-500" />
          </div>
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
                  className="w-36 h-36 mb-4 mx-auto"
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
                      className="w-20 h-20 mb-2 mx-auto"
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
            }}
            className="fixed flex  bg-gray-900 bg-opacity-50"
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
