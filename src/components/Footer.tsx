import React from "react";
import {
  FaTiktok,
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";
import { MdLanguage, MdOutlineAccessibility } from "react-icons/md";
import { BsCurrencyDollar } from "react-icons/bs";
import Logo from "../assets/logo.png";

const Footer: React.FC = () => {
  return (
    <footer className=" bottom-0 left-0 w-full bg-white py-4 shadow-inner">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <img src={Logo} alt="Logo" className="h-10 mr-3" />
        </div>
        <div className="text-center text-gray-500 mb-4 md:mb-0">
          <p>© SpotBiz International Ltd. 2024</p>
        </div>
        <div className="flex space-x-4 text-gray-500">
          <a href="#" aria-label="TikTok" className="hover:text-blue-500">
            <FaTiktok />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-blue-500">
            <FaInstagram />
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:text-blue-500">
            <FaLinkedin />
          </a>
          <a href="#" aria-label="Facebook" className="hover:text-blue-500">
            <FaFacebook />
          </a>
          <a href="#" aria-label="Pinterest" className="hover:text-blue-500">
            <FaPinterest />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-blue-500">
            <FaTwitter />
          </a>
          {/* <a href="#" className="hover:text-blue-500">
            <MdLanguage /> English
          </a> */}
          {/* <a href="#" className="hover:text-blue-500">
            <BsCurrencyDollar /> USD
          </a> */}
          {/* <a href="#" className="hover:text-blue-500">
            <MdOutlineAccessibility />
          </a> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
