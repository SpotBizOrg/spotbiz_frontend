import React from 'react';
import { FaUser, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';
import Customer from '../assets/signup-image.png';

const SignUpFormCustomer: React.FC = () => {
  return (
    <div className="flex h-screen bg-primary items-center justify-center font-body">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl flex overflow-hidden">
        <div className="w-1/2 flex items-center justify-center p-4">
          <img src={Customer} alt="Signup" className="w-full h-full object-cover rounded-lg"/>
        </div>
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-10 text-center">Create Your Account</h2>
          <form className="space-y-4">
            <div className="flex items-center bg-gray-200 rounded px-3 py-2">
              <FaUser className="text-gray-500 mr-2" />
              <input
                className="bg-gray-200 appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                id="name"
                type="text"
                placeholder="Name"
                style={{ boxShadow: 'none' }}
              />
            </div>
            <div className="flex items-center bg-gray-200 rounded px-3 py-2">
              <FaEnvelope className="text-gray-500 mr-2" />
              <input
                className="bg-gray-200 appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                id="email"
                type="email"
                placeholder="Email"
                style={{ boxShadow: 'none' }}
              />
            </div>
            <div className="flex items-center bg-gray-200 rounded px-3 py-2">
              <FaPhone className="text-gray-500 mr-2" />
              <input
                className="bg-gray-200 appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                id="phone"
                type="text"
                placeholder="Phone No"
                style={{ boxShadow: 'none' }}
              />
            </div>
            <div className="flex items-center bg-gray-200 rounded px-3 py-2">
              <FaLock className="text-gray-500 mr-2" />
              <input
                className="bg-gray-200 appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                id="password"
                type="password"
                placeholder="Password"
                style={{ boxShadow: 'none' }}
              />
            </div>
            <div className="mt-12">
              <button className="w-full bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpFormCustomer;


// /Users/shalinideetiratne/Documents/customer-signup/src/assets/images/signup-image.png