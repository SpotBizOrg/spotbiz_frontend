import React, { useEffect, useState } from "react";
import AppMockup from "../assets/AppMockup.png";
import CountUp from "react-countup";
import { BACKEND_URL } from "../../config";
import axios from "axios";

interface Details{
  customerCount: 42;
  businessCount: 100;
  categoryCount: 5;
}

const AboutUs = () => {

  const [details, setDetails] = useState<Details | null>(null);

  const fetchData = async () => {
    const url = `${BACKEND_URL}/landingPageData`;

    try {
      const response = await axios.get(url);
      console.log(response.data);
      setDetails(response.data);
    } catch (error) {
      console.error("Error fetching landing page data:", error);
    }
  }

  useEffect(() => {

    fetchData();
    // setDetails({
    //   customerCount: 42,
    //   businessCount: 100,
    //   categoryCount: 5,
    // });
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center bg-blue11 p-8 rounded-lg shadow-lg mx-4 md:mx-8 lg:mx-16 text-black">
      <div className="md:w-1/2 flex items-end -mb-8 -ml-16">
        <img
          src={AppMockup}
          alt="SpotBiz App Mockup"
          className="w-full md:h-full object-contain md:object-bottom"
        />
      </div>
      <div className="md:w-1/2 md:ml-8 text-right md:text-right mt-8 md:mt-0">
        <h2 className="text-3xl font-bold mb-4 leading-tight">
          Discover, Connect & Grow
        </h2>
        <p className="text-lg mb-6 text-black">
          SpotBiz bridges the gap between customers and businesses. Find great
          deals and services near you, while businesses can increase visibility
          and attract more customers. It's a win-win!
        </p>
        <p className="text-subsubsubheading text-center font-semibold mb-6 text-black md:text-right">
          Discover businesses right at your fingertips!
        </p>
        <div className="mt-8 flex flex-col md:flex-row justify-between items-right text-black">
          <div className="text-right mb-4 md:mb-0 md:mr-8">
            <h3 className="text-sm uppercase">Categories</h3>
            <p className="text-2xl font-bold">
              <CountUp end={details?.categoryCount || 5} duration={2} />
            </p>
            <p className="text-sm">Explore a wide range of categories.</p>
          </div>
          <div className="text-right mb-4 md:mb-0 md:mr-8">
            <h3 className="text-sm uppercase">Businesses</h3>
            <p className="text-2xl font-bold">
              <CountUp end={details?.businessCount || 156} duration={2} separator="," />
            </p>
            <p className="text-sm">Verified businesses listed.</p>
          </div>
          <div className="text-right mb-4 md:mb-0 md:mr-8">
            <h3 className="text-sm uppercase">Customers</h3>
            <p className="text-2xl font-bold">
              <CountUp end={details?.customerCount || 200} duration={2} separator="," />
            </p>
            <p className="text-sm">are in the platform.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
