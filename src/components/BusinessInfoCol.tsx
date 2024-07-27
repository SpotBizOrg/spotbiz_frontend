import React from "react";
import image from '../assets/promo.lk-44253997837344f08aed5b131f0bd271.jpg';
import { FaUser, FaMapMarkerAlt, FaPhone, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import { IoLogoWhatsapp } from "react-icons/io";

const BusinessInfoCol: React.FC = () => {
    return(
        <>
        <div className="bg-white p-2 rounded-md shadow-md space-y-2 mb-5">
        <div className="flex items-center space-x-2 mb-5">
          <img src={image} alt="Logo" className="h-22 w-22 justify-center" />
        </div>
        <div>
            <div className="flex flex-row item-center justify-start mb-2">
                <FaUser className="mr-3 pt-1 text-gray-500 text-bodymedium" />
                <p className="flex item-center text-gray-800 text-bodysmall">R.D.A Chandana
                </p>
            </div>
            <div className="flex flex-row text-center justify-start mb-2">
                <FaMapMarkerAlt className="mr-3 pt-1 text-gray-500 text-bodymedium" />
                <p className="flex item-center text-gray-800 text-bodysmall">Colombo 7
                </p>
            </div>
            <div className="flex flex-row text-center justify-start mb-2">
                <FaPhone className="mr-3 pt-1 text-gray-500 text-bodymedium" />
                <p className="flex item-center text-gray-800 text-bodysmall">011-1234567
                </p>
            </div>
            <div className="flex flex-row text-center justify-start mb-2">
                <FaFacebookF className="mr-3 pt-1 text-gray-500 text-bodymedium" />
                <p className="flex item-center text-gray-800 text-bodysmall">Abans
                </p>
            </div>
            <div className="flex flex-row text-center justify-start mb-2">
                <IoLogoWhatsapp className="mr-3 pt-1 text-gray-500 text-bodymedium" />
                <p className="flex item-center text-gray-800 text-bodysmall">Contact via WhatsApp
                </p>
            </div>
        </div>
      </div>
        <button className="border border-green-500 text-green-500 font-bold px-4 py-1 rounded-md w-full text-bodysmall mb-5">Open Now</button>

        </>
        
    )
}

export default BusinessInfoCol;