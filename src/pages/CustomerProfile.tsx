import React, { useState } from 'react';
import Businessnavbar from '../components/Businessnavbar';
import Businesssidebar from '../components/Businesssidebar';
import { FaEdit, FaMapMarkerAlt, FaCamera } from 'react-icons/fa'; // Importing icons from react-icons

const CustomerProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('About Me');

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Businessnavbar />
      <div className="flex flex-1 mt-16">
        <div className="flex-none w-64">
          <Businesssidebar selectedTile={''} />
        </div>
        <div className="flex-1 p-1"> {/* Reduced top padding */}
          <div className="bg-white rounded-lg shadow-md p-3">
            <ProfileHeader />
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <ProfileContent activeTab={activeTab} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileHeader: React.FC = () => {
  return (
    <div className="relative bg-black text-white p-10 rounded-lg shadow-md flex">
      <div className="w-1/3 flex justify-center items-center">
        <div className="relative">
          <img
            className="w-48 h-48 rounded-full border-0 border-white" // Increased size
            src="https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944"
            alt="Profile"
          />
          <button className="absolute bottom-0 right-0 text-white bg-gray-800 bg-opacity-50 rounded-full p-1 hover:bg-opacity-75">
            <FaCamera className="w-4 h-6" />
          </button>
        </div>
      </div>
      <div className="w-2/3 ml-5">
        <h1 className="text-3xl font-bold">Meghan Rivera</h1> {/* Increased font size */}
        <p className="text-lg"><FaMapMarkerAlt className="inline mr-1" /> Zeeland</p>
        <div className="mt-6"> {/* Added space */}
          <p className="text-lg">My Score</p>
          <h2 className="text-3xl font-bold">242</h2>
          <p className="text-lg">+15 this week</p>
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
          className={`py-2 px-3 ${activeTab === 'About Me' ? 'text-pink-600 border-b-2 border-pink-600' : 'text-gray-600 hover:border-gray-300'}`} 
          onClick={() => setActiveTab('About Me')}
        >
          About Me
        </button>
        <button 
          className={`py-2 px-3 ${activeTab === 'Subscribed Businesses' ? 'text-pink-600 border-b-2 border-pink-600' : 'text-gray-600 hover:border-gray-300'}`} 
          onClick={() => setActiveTab('Subscribed Businesses')}
        >
          Subscribed Businesses
        </button>
        <button 
          className={`py-2 px-3 ${activeTab === 'My Reviews' ? 'text-pink-600 border-b-2 border-pink-600' : 'text-gray-600 hover:border-gray-300'}`} 
          onClick={() => setActiveTab('My Reviews')}
        >
          My Reviews
        </button>
      </nav>
    </div>
  );
};

const ProfileContent: React.FC<{ activeTab: string }> = ({ activeTab }) => {
  switch (activeTab) {
    case 'Subscribed Businesses':
      return <SubscribedBusinesses />;
    case 'My Reviews':
      return <Posts />;
    case 'About Me':
    default:
      return <AboutMe />;
  }
};

const AboutMe: React.FC = () => (
  <div className="mt-4 space-y-6">
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="flex justify-between items-center border-b border-gray-200 pb-4"> {/* Line below Personal Information */}
        <h2 className="text-lg font-bold">Personal Information</h2>
        <button className="text-blue-600 hover:text-blue-800 flex items-center">
          <FaEdit className="w-5 h-5 ml-1" />
        </button>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-gray-600">First Name</label>
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
        <div className="md:col-span-2">
          <label className="text-gray-600">Bio</label>
          <p className="text-gray-800">Team Manager</p>
        </div>
      </div>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="flex justify-between items-center border-b border-gray-200 pb-4"> {/* Line below Address */}
        <h2 className="text-lg font-bold">Address</h2>
        <button className="text-blue-600 hover:text-blue-800 flex items-center">
          <FaEdit className="w-5 h-5 ml-1" />
        </button>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-gray-600">Country</label>
          <p className="text-gray-800">United Kingdom</p>
        </div>
        <div>
          <label className="text-gray-600">City/State</label>
          <p className="text-gray-800">Leeds, East London</p>
        </div>
        <div>
          <label className="text-gray-600">Postal Code</label>
          <p className="text-gray-800">ERT 2354</p>
        </div>
        <div>
          <label className="text-gray-600">TAX ID</label>
          <p className="text-gray-800">AS45645756</p>
        </div>
      </div>
    </div>
  </div>
);

const SubscribedBusinesses: React.FC = () => (
  <div className="mt-4 space-y-6">
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="flex justify-between items-center border-b border-gray-200 pb-4"> {/* Line below My Subscribed Businesses */}
        <h2 className="text-lg font-bold">My Subscribed Businesses</h2>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md">
          <img
            className="w-20 h-20 rounded-full" // Increased size
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU-es6wSQDPDMC4J5V2cFLjEsQh-zVGp_ksQ&s"
            alt="Business 1"
          />
          <div className="ml-4">
            <h3 className="text-md font-semibold text-gray-800">Michelle Oros</h3>
            <p className="text-sm text-gray-600">Senior Product</p>
          </div>
        </div>
        <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md">
          <img
            className="w-20 h-20 rounded-full" // Increased size
            src="https://via.placeholder.com/150"
            alt="Business 2"
          />
          <div className="ml-4">
            <h3 className="text-md font-semibold text-gray-800">Gurpreet Sall</h3>
            <p className="text-sm text-gray-600">Senior UI/UX</p>
          </div>
        </div>
        <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md">
          <img
            className="w-20 h-20 rounded-full" // Increased size
            src="https://via.placeholder.com/150"
            alt="Business 3"
          />
          <div className="ml-4">
            <h3 className="text-md font-semibold text-gray-800">Abolfazl Fat</h3>
            <p className="text-sm text-gray-600">CEO, Pro</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Posts: React.FC = () => {
  const posts = [
    {
      user: "Glenda Banks",
      time: "5 hours ago",
      category: "Beauty",
      content: "Hi girls, can anyone suggest a product for oily skin which can be used as a primer. Thanks in advance :)",
      topAnswer: "Try Neutrogena oil free moisturiser. It worked for me.",
      answers: 24,
    },
    {
      user: "Anonymous",
      time: "2 days ago",
      category: "Work",
      content: "Friends, I need help for my project. I want to do a minor project like a ticket booking or library management. Have anyone done something like that and can mail me?",
      answers: 1,
    },
    {
      user: "Anonymous",
      time: "5 days ago",
      category: "Relationships",
      content: "Help me?? Me n my bf had a small fight yday.",
      answers: 1,
    }
  ];

  return (
    <div className="mt-4 space-y-6"> {/* Added spacing between reviews */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex justify-between items-center border-b border-gray-200 pb-4"> {/* Line below My Past Reviews */}
          <h2 className="text-lg font-bold">My Past Reviews</h2>
        </div>
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {posts.map((post, index) => (
            <div key={index} className="bg-white p-2 rounded-lg shadow-md m-2"> {/* Reduced padding and added margin */}
              <div className="flex items-center">
                <img
                  className="w-8 h-8 rounded-full" // Reduced size
                  src="https://via.placeholder.com/150"
                  alt={post.user}
                />
                <div className="ml-4">
                  <h3 className="text-md font-semibold text-gray-800">{post.user}</h3>
                  <p className="text-sm text-gray-600">{post.time}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-800">{post.content}</p>
                {post.topAnswer && (
                  <div className="mt-2 p-2 bg-gray-100 rounded-md">
                    <p className="text-sm text-gray-600"><strong>Top Answer:</strong> {post.topAnswer}</p>
                  </div>
                )}
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-600">{post.answers} answers</span>
                <button className="text-pink-600 hover:text-pink-800">Reply</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
