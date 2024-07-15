import React from 'react';
import { Link } from 'react-router-dom';
import registrationImage from '../assets/RegistrationPage.png'; // Make sure to replace with the actual path to your image

const Registration: React.FC = () => {
  return (
    <div className="flex h-screen bg-primary items-center justify-center">
      <div className="bg-customWhite rounded-lg shadow-lg w-full max-w-5xl flex overflow-hidden">
        <div className="w-full md:w-1/2 flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-10">Tell us who you are?</h1>
            <div className="flex flex-col space-y-8">
              <Link
                to="/signup-business"
                className="bg-primary text-white py-4 px-8 rounded-2xl shadow-lg hover:bg-blue-400 text-center text-lg font-semibold"
              >
                I want to add my business into SpotBiz
              </Link>
              <Link
                to="/signup-customer"
                className="bg-primary text-white py-4 px-8 rounded-2xl shadow-lg hover:bg-blue-400 text-center text-lg font-semibold"
              >
                I want to search for the services available in SpotBiz
              </Link>
            </div>
          </div>
        </div>
        <div className="w-1/2 flex items-center justify-center p-4">
          <img
            src={registrationImage}
            alt="Businessman"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Registration;
