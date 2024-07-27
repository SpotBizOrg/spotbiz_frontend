import React from "react";
import Logo from "../assets/logo.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-8 shadow-inner">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex itmes-center">
            <img src={Logo} alt="Logo" className="h-16 mr-3" />
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-700 hover:text-blue-500">
              About
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-500">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-500">
              Licensing
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-500">
              Contact
            </a>
          </div>
          <div className="border-t border-gray-200 pt-4 text-center">
            <p className="text-gray-700">© 2022 SpotBiz™</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


// fixed bottom-0 left-0 w-full bg-white py-4 shadow-inner
// bg-gray-100 py-8 shadow-inner