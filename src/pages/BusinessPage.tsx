import React, { useEffect, useState } from "react";
import Customernavbar from "../components/Customernavbar";
import BusinessTitlenReview from "../components/BusinessTitlenReview";
import BusinessInfoCol from "../components/BusinessInfoCol";
import MainReview from "../components/MainReview";
import AboutBusiness from "../components/AboutBusiness";
import BusinessLocation from "../components/Location";
import Column2 from "../components/Column2";
import OpeningHrs from "../components/OpeningHrs";
import Footer from "../components/Footer";
import Container2 from "../components/Container2";
import FloatingBtnsbusiness from "../components/FlotingBtnsbusiness";
import { BACKEND_URL } from "../../config";
import image from "../assets/promo.lk-44253997837344f08aed5b131f0bd271.jpg";
import { GridLoader } from "react-spinners";
import { useSearchParams, useNavigate } from "react-router-dom";
import { messaging } from "../firebase/firebaseConfig";
import OnlyAddReviewMain from "../components/OnlyAddReviewMain";
import axios from "axios";
import BusinessBadge from "../components/BusinessBadge";

// const businessId: number = 0;

interface WeeklySchedule {
  startTime: string;
  endTime: string;
  specialNote: string;
  isOpen: boolean;
}

interface BusinessBadge {
  badgeId: number;
  businessId: number;
  businessName: string;
  issuedDate: Date;
  rating: number;
}

interface BusinessPageProps {
  businessId: number;
  name: string;
  address: string;
  logo: string;
  description: string;
  avgRating: number;
  reviewCount: number;
  email: string;
  phone: string;
  fblink: string;
  tags: string[];
  weeklySchedule: {
    Monday: WeeklySchedule;
    Tuesday: WeeklySchedule;
    Wednesday: WeeklySchedule;
    Thursday: WeeklySchedule;
    Friday: WeeklySchedule;
    Saturday: WeeklySchedule;
    Sunday: WeeklySchedule;
  };
  latestReview: {
    rating: number;
    description: string;
    date: string;
    userId: number;
    businessId: number;
    title: string;
  };
  pkg: {
    packageId: number;
    feture: string;
    adsPerWeek: number;
    analytics: boolean;
    fakeReviews: boolean;
    recommendation: boolean;
    messaging: boolean;
    price: number;
    listing: string;
    isActive: boolean;
  };
  subscribed: boolean;
  businessBadgeDto: BusinessBadge | null;
}

const BusinessPage: React.FC = () => {
  const StoredEmail = localStorage.getItem("email");
  const StoredClientId = parseInt(localStorage.getItem("user_id") || "0");

  const [searchParams] = useSearchParams();
  const [businessData, setBusinessData] =
    React.useState<BusinessPageProps | null>(null);
  const [loading, setLoading] = useState(true); // loading state
  const businessId = parseInt(searchParams.get("businessId") || "0", 10);

  const fetchBusinessData = async (businessId: number) => {
    const url = `${BACKEND_URL}/businessPage/businessData?businessId=${businessId}&clientId=${StoredClientId}`;

    try {
      console.log("fetching business data");
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      // if (!response.ok) {
      //   throw new Error(data.message);
      // }

      if (response.ok) {
        console.log("success fetch");
        setBusinessData(data);
        console.log(businessData);
      } else if (response.status === 400) {
        console.error("Invalide business Id");
        // navigate('/error'); // uncomment this line to redirect to error page
      } else {
        throw new Error(data.message);
      }

      // console.log("success fetch");
      // setBusinessData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // stop loading when data is fetched
    }
  };

  const markClick = (businessId: number) => {
    const url = `${BACKEND_URL}/business-clicks/click`;
    const body = {
      businessClickId: 0,
      businessId: businessId,
      clicks: 1,
    };
    // Fire-and-forget PUT request using axios
    axios
      .put(url, body)
      .catch((error) => console.error("Request failed", error));
  };

  useEffect(() => {
    document.title = "SpotBiz | Business";
    console.log("Component mounted, starting fetchBusinessData...");
    fetchBusinessData(businessId);
  }, []);

  useEffect(() => {
    if (businessData) {
      markClick(businessData.businessId);
    }
  }, [businessData]);

  if (loading) {
    return (
      <div className="flex flex-row justify-center items-center h-screen">
        <GridLoader color="#0D3B66" margin={10} size={30} />
      </div>
    );
  }

  return (
    <>
      <Container2>
        <Customernavbar />
        <div className="px-12 sm mt-8 mb-20">
          <div className="w-fullflex flex-col">
            <BusinessTitlenReview
              businessName={businessData?.name || "business name"}
              location={businessData?.address || "No address is given"}
              rating={businessData?.avgRating || 0}
              totReviws={businessData?.reviewCount || 0}
              weeklySchedule={businessData?.weeklySchedule || undefined}
            />
            <div className="w-full flex flex-row justify-start">
              <div className="flex flex-col w-1/6">
                <BusinessInfoCol
                  name={businessData?.name || "business name"}
                  logo={businessData?.logo || image}
                  address={businessData?.address || "no address is given"}
                  phone={businessData?.phone || "no phone number is given"}
                  email={businessData?.email || "no email is given"}
                  fbLink={businessData?.fblink || "#"}
                />
                {businessData?.businessBadgeDto && (
                  <BusinessBadge
                    month={new Date(
                      businessData.businessBadgeDto.issuedDate
                    ).toLocaleString("default", { month: "long" })}
                    year={new Date(businessData.businessBadgeDto.issuedDate)
                      .getFullYear()
                      .toString()}
                  />
                )}

                {businessData?.latestReview ? (
                  <MainReview
                    title={businessData.latestReview.title}
                    rating={businessData.latestReview.rating}
                    description={businessData.latestReview.description}
                    date={businessData.latestReview.date}
                    userId={businessData.latestReview.userId}
                    businessId={businessData.latestReview.businessId}
                    businessEmail={businessData.email}
                    storedEmail={StoredEmail || "example@mail.com"}
                  />
                ) : (
                  <OnlyAddReviewMain businessId={businessId} />
                )}
              </div>
              <div className="w-3/6 ml-20 mr-20 p-8 max-h-[130vh] overflow-y-auto scrollbar-hide">
                {businessData && <Column2 businessEmail={businessData.email} />}
              </div>
              <div className="flex flex-col w-2/6">
                <AboutBusiness
                  about={businessData?.description || "No description yet"}
                />
                {businessData && (
                  <BusinessLocation location={businessData.address} />
                )}
                {businessData?.weeklySchedule ? (
                  <OpeningHrs
                    Monday={businessData?.weeklySchedule.Monday}
                    Tuesday={businessData?.weeklySchedule.Tuesday}
                    Wednesday={businessData?.weeklySchedule.Wednesday}
                    Thursday={businessData?.weeklySchedule.Thursday}
                    Friday={businessData?.weeklySchedule.Friday}
                    Saturday={businessData?.weeklySchedule.Saturday}
                    Sunday={businessData?.weeklySchedule.Sunday}
                  />
                ) : (
                  <div className="bg-white p-4 rounded-md shadow-md mb-10 border border-gray-300">
                    <div className="p-2 border border-gray-400 rounded text-center">
                      <p className="font-bold text-bluedark text-bodymedium">
                        Opening Hours
                      </p>
                    </div>
                    <div className="p-4 text-gray-800 text-bodysmall">
                      <p className="text-center text-gray-500">
                        No opening hours available
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <FloatingBtnsbusiness
          businessMobile={businessData?.phone || ""}
          clientId={StoredClientId || 0}
          businessId={businessData?.businessId || 0}
          messaging={businessData?.pkg.messaging ?? false}
          isSubscribed={businessData?.subscribed || false}
        />
      </Container2>
      <Footer />
    </>
  );
};

export default BusinessPage;
