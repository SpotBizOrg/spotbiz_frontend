import React, { useState } from 'react';
import Customernavbar from '../components/Customernavbar';
import { FaEdit, FaMapMarkerAlt, FaCamera, FaEye, FaEyeSlash, FaStar } from 'react-icons/fa'; // Importing icons from react-icons

const BusinessProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('About Me');

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Customernavbar />
      <div className="flex flex-1 mt-16"> {/* Added top margin to avoid conflict with navbar */}
        <div className="w-1/3 h-auto bg-gray-800 text-white flex flex-col items-center">
          <div className="relative mt-7">
            <img
              className="w-40 h-40 rounded-full"
              src="data:image/png;base64,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"
              alt="Profile"
            />
            <button className="absolute bottom-0 right-0 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700">
              <FaCamera className="w-5 h-5" />
            </button>
          </div>
          <h1 className="text-3xl font-bold mt-7">Abans</h1>
          <p className="text-base mt-2"><FaMapMarkerAlt className="inline mr-1" />38/A, Aberdeen Road, Colombo 10</p>
          <div className="mt-6 text-center w-full">
            <div className="flex justify-center">
              <div className="mt-6">
                <div className="flex flex-col items-center">
                  <p className="text-xl">Subscriber Count</p>
                  <h2 className="text-2xl font-bold mt-1">242</h2>
                </div>
                <hr className="w-full mt-5 mb-5 border-gray-400" />
                <div className="flex flex-col items-center">
                  <p className="text-xl">My Ratings</p>
                  <div className="flex mt-3" >
                    <FaStar className="text-yellow-500 w-7 h-7 pr-1" />
                    <FaStar className="text-yellow-500 w-7 h-7 pr-1" />
                    <FaStar className="text-yellow-500 w-7 h-7 pr-1" />
                    <FaStar className="text-yellow-500 w-7 h-7 pr-1" />
                    <FaStar className="text-gray-300 w-7 h-7" /> {/* Example: 4 out of 5 stars */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/3 p-6">
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <ProfileContent activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
};

const Tabs: React.FC<{ activeTab: string, setActiveTab: (tab: string) => void }> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="mt-4 border-b border-gray-200">
      <nav className="flex space-x-4">
        <button 
          className={`py-2 px-3 ${activeTab === 'About Business' ? 'text-pink-600 font-bold border-b-2 border-pink-600' : 'text-gray-600 hover:border-gray-300'}`} 
          onClick={() => setActiveTab('About Business')}
        >
          About Business
        </button>
        
        <button 
          className={`py-2 px-3 ${activeTab === 'Privacy & Security' ? 'text-pink-600 font-bold border-b-2 border-pink-600' : 'text-gray-600 hover:border-gray-300'}`} 
          onClick={() => setActiveTab('Privacy & Security')}
        >
          Privacy & Security
        </button>
      </nav>
    </div>
  );
};

const ProfileContent: React.FC<{ activeTab: string }> = ({ activeTab }) => {
  switch (activeTab) {
    case 'Privacy & Security':
      return <PrivacySecurity />;
    case 'About Business':
    default:
      return <AboutBusiness />;
  }
};

const AboutBusiness: React.FC = () => (
  <div className="mt-4 space-y-6">
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <h2 className="text-lg font-bold">Business Information</h2>
        <button className="text-blue-600 hover:text-blue-800 flex items-center">
          <FaEdit className="w-5 h-5 ml-1" />
        </button>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-gray-600">Business Owner Name</label>
          <p className="text-gray-800">Rafiquar Rahman</p>
        </div>
        <div>
          <label className="text-gray-600">Business Name</label>
          <p className="text-gray-800">Abans</p>
        </div>
        <div>
          <label className="text-gray-600">Business Owner Email</label>
          <p className="text-gray-800">rafiquarrahman51@gmail.com</p>
        </div>
        <div>
          <label className="text-gray-600">Business Registration Number</label>
          <p className="text-gray-800">345 346 46</p>
        </div>
        <div>
          <label className="text-gray-600">Business Owner Contact Number</label>
          <p className="text-gray-800">+09 345 346 46</p>
        </div>
      </div>
    </div>
  </div>
);

const SubscribedBusinesses: React.FC = () => (
  <div className="mt-4 space-y-6">
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <h2 className="text-lg font-bold">My Subscribed Businesses</h2>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md relative">
          <img
            className="w-20 h-20 rounded-full"
            src="https://via.placeholder.com/150"
            alt="Business 1"
          />
          <div className="ml-4">
            <h3 className="text-md font-semibold text-gray-800">Michelle Oros</h3>
            <p className="text-sm text-gray-600">Senior Product</p>
          </div>
          <a href="#" className="absolute bottom-2 right-8 text-pink-600 hover:text-pink-800">Unsubscribe</a>
        </div>
        <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md relative">
          <img
            className="w-20 h-20 rounded-full"
            src="https://via.placeholder.com/150"
            alt="Business 2"
          />
          <div className="ml-4">
            <h3 className="text-md font-semibold text-gray-800">Gurpreet Sall</h3>
            <p className="text-sm text-gray-600">Senior UI/UX</p>
          </div>
          <a href="#" className="absolute bottom-2 right-8 text-pink-600 hover:text-pink-800">Unsubscribe</a>
        </div>
        <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md relative">
          <img
            className="w-20 h-20 rounded-full"
            src="https://via.placeholder.com/150"
            alt="Business 3"
          />
          <div className="ml-4">
            <h3 className="text-md font-semibold text-gray-800">Abolfazl Fat</h3>
            <p className="text-sm text-gray-600">CEO, Pro</p>
          </div>
          <a href="#" className="absolute bottom-2 right-8 text-pink-600 hover:text-pink-800">Unsubscribe</a>
        </div>
      </div>
    </div>
  </div>
);

const PrivacySecurity: React.FC = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
  
    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };
  
    return (
      <div className="mt-4 space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <div className="flex justify-between items-center border-b border-gray-200 pb-4">
            <h2 className="text-lg font-bold">Privacy & Security</h2>
            <button className="text-blue-600 hover:text-blue-800 flex items-center">
              <FaEdit className="w-5 h-5 ml-1" />
            </button>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-600">Username</label>
              <p className="text-gray-800">rafiquarrahman</p>
            </div>
            <div className="relative flex items-center">
              <div>
                <label className="text-gray-600">Password</label>
                <p className="text-gray-800 flex items-center">
                  {passwordVisible ? 'mypassword123' : '********'}
                  <button
                    onClick={togglePasswordVisibility}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </p>
              </div>
              <button className="bg-pink-600 text-white px-4 py-2 rounded-full ml-14">
                Change Password
              </button>
            </div>
            <div>
              <label className="text-gray-600">Last Login</label>
              <p className="text-gray-800">July 20, 2024</p>
            </div>
            <div>
              <label className="text-gray-600">Login IP</label>
              <p className="text-gray-800">192.168.1.1</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  

export default BusinessProfile;
