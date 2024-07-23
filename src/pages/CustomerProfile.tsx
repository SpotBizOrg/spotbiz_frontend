import React, { useState } from 'react';
import Customernavbar from '../components/Customernavbar';
import { FaEdit, FaMapMarkerAlt, FaCamera, FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing icons from react-icons

const CustomerProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('About Me');

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Customernavbar />
      <div className="relative bg-cover bg-center h-60 w-full" style={{ backgroundImage: 'url(https://marketplace.canva.com/EAEmGBdkt5A/3/0/1600w/canva-blue-pink-photo-summer-facebook-cover-gy8LiIJTTGw.jpg)' }}>
      <button className="absolute bottom-0 right-0 bg-gray-800 text-white rounded-full mr-4 mb-2 p-2 hover:bg-gray-700">
              <FaCamera className="w-5 h-5" />
            </button></div>
      <div className="flex flex-1">
        <div className="w-1/3 bg-gray-800 text-white flex flex-col items-center p-6">
          <div className="relative -mt-24">
            <img
              className="w-40 h-40 rounded-full"
              src="https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944"
              alt="Profile"
            />
            <button className="absolute bottom-0 right-0 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700">
              <FaCamera className="w-5 h-5" />
            </button>
          </div>
          <h1 className="text-2xl font-bold mt-7">Adele Laurie Blue Adkins</h1>
          <p className="text-lg mt-2"><FaMapMarkerAlt className="inline mr-1" /> Zeeland</p>
          <div className="mt-6 text-center w-full">
            <div className="flex justify-center">
              <div className="mt-6">
                <div className="flex flex-col items-center">
                  <p className="text-lg">My Score</p>
                  <h2 className="text-3xl font-bold mt-2">242</h2>
                  <p className="text-lg">+15 this week</p>
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
          className={`py-2 px-3 ${activeTab === 'About Me' ? 'text-pink-600 font-bold border-b-2 border-pink-600' : 'text-gray-600 hover:border-gray-300'}`} 
          onClick={() => setActiveTab('About Me')}
        >
          About Me
        </button>
        <button 
          className={`py-2 px-3 ${activeTab === 'Subscribed Businesses' ? 'text-pink-600 font-bold border-b-2 border-pink-600' : 'text-gray-600 hover:border-gray-300'}`} 
          onClick={() => setActiveTab('Subscribed Businesses')}
        >
          Subscribed Businesses
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
    case 'Subscribed Businesses':
      return <SubscribedBusinesses />;
    case 'Privacy & Security':
      return <PrivacySecurity />;
    case 'About Me':
    default:
      return <AboutMe />;
  }
};

const AboutMe: React.FC = () => (
  <div className="mt-4 space-y-6">
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <h2 className="text-lg font-bold">Personal Information</h2>
        <button className="text-blue-600 hover:text-blue-800 flex items-center">
          <FaEdit className="w-5 h-5 ml-1" />
        </button>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-gray-600">Name</label>
          <p className="text-gray-800">Rafiquar</p>
        </div>
        <div>
          <label className="text-gray-600">Last Name</label>
          <p className="text-gray-800">Rahman</p>
        </div>
        <div>
          <label className="text-gray-600">Email address</label>
          <p className="text-gray-800">rafiquarrahman51@gmail.com</p>
        </div>
        <div>
          <label className="text-gray-600">Phone</label>
          <p className="text-gray-800">+09 345 346 46</p>
        </div>
        <div>
          <label className="text-gray-600">Address</label>
          <p className="text-gray-800">34/B, Washington, America</p>
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
  

export default CustomerProfile;
