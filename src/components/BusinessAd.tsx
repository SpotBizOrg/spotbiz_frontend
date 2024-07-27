import React, { useState } from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import Businessnavbar from '../components/Businessnavbar';
import Businesssidebar from '../components/Businesssidebar';
import profilePic from '../assets/profile.png';
import abans from '../assets/Abans-Logo-1024x297.png';
import ad1 from '../assets/ad1.png';
import ad2 from '../assets/ad2.png';
import ad3 from '../assets/ad3.png';
import ad4 from '../assets/add4.jpeg';
import ad5 from '../assets/ad5.jpeg';
import ad6 from '../assets/ad6.jpg';

interface Advertisement {
  img: string;
  date: string;
  details: string;
  description: string;
  startDate: string;
  endDate: string;
  branch: string;
  contact: string;
}

const BusinessAd: React.FC = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageDetails, setSelectedImageDetails] = useState<Advertisement | null>(null);

  const openPopup = (image: string, details: Advertisement) => {
    setSelectedImage(image);
    setSelectedImageDetails(details);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setSelectedImage(null);
    setSelectedImageDetails(null);
  };

  const advertisements: Advertisement[] = [
    { img: ad1, date: '2024-07-06', details: 'Ad 1 details', description: 'Abans LG Audio Visual Offers 21 Apr 2013', startDate: '2024-07-01', endDate: '2024-07-10', branch: 'Main Branch', contact: '+1234567890' },
    { img: ad2, date: '2024-07-05', details: 'Ad 2 details', description: 'Ad 2 description', startDate: '2024-07-02', endDate: '2024-07-12', branch: 'Downtown Branch', contact: '+0987654321' },
    { img: ad3, date: '2024-07-04', details: 'Ad 3 details', description: 'Ad 3 description', startDate: '2024-07-03', endDate: '2024-07-15', branch: 'West End Branch', contact: '+1357924680' },
    { img: ad4, date: '2024-07-03', details: 'Ad 4 details', description: 'Ad 4 description', startDate: '2024-07-04', endDate: '2024-07-20', branch: 'East Side Branch', contact: '+2468013579' },
    { img: ad5, date: '2024-07-02', details: 'Ad 5 details', description: 'Ad 5 description', startDate: '2024-07-05', endDate: '2024-07-25', branch: 'Uptown Branch', contact: '+9876543210' },
    { img: ad6, date: '2024-07-01', details: 'Ad 6 details', description: 'Ad 6 description', startDate: '2024-07-06', endDate: '2024-07-30', branch: 'Midtown Branch', contact: '+0123456789' },
  ];

  const renderSocialIcons = () => (
    <div className="flex items-center mt-4 space-x-4">
      <span>Share this promotion:</span>
      <FaFacebook className="text-blue-700 text-2xl cursor-pointer" />
      <FaWhatsapp className="text-green-600 text-2xl cursor-pointer" />
      <FaInstagram className="text-pink-600 text-2xl cursor-pointer" />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex">
        <div className="w-1/5">
          <Businesssidebar selectedTile={''} />
        </div>
        <div className="w-4/5 flex flex-col">
          <Businessnavbar />
          <div className="flex items-center justify-center flex-grow p-20">
            <img src={abans} alt="Abans Logo" className="h-20" />
          </div>

          <main className="flex-grow p-20">
            {popupOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-4 rounded shadow-lg max-w-3/4">
                  <button onClick={closePopup} className="float-right text-red-500">X</button>
                  <img src={selectedImage!} alt="Ad" className="w-full h-auto object-cover rounded mb-4 max-h-96" />
                  <p className="text-lg font-semibold mb-2">{selectedImageDetails?.description}</p>
                  <p className="text-sm text-gray-600 mb-2">Promotion Validity: {selectedImageDetails?.startDate} - {selectedImageDetails?.endDate}</p>

                  <div className="bg-gray-100 rounded-lg p-4 mb-4">
                    <div className="flex justify-between mb-2">
                      <div>
                        <p className="font-semibold">Start Date:</p>
                        <p>{selectedImageDetails?.startDate}</p>
                      </div>
                      <div>
                        <p className="font-semibold">End Date:</p>
                        <p>{selectedImageDetails?.endDate}</p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <p className="font-semibold">Branch Name:</p>
                        <p>{selectedImageDetails?.branch}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Contact No:</p>
                        <p>{selectedImageDetails?.contact}</p>
                      </div>
                    </div>
                  </div>

                  {renderSocialIcons()}
                </div>
              </div>
            )}

            <h1 className="text-2xl font-bold mb-10 bg-yellow-200 p-4 rounded-lg w-100">Latest Promotions</h1>
            <div className="grid grid-cols-3 gap-4">
              {advertisements.slice(0, 3).map((ad, index) => (
                <div key={index} className="bg-yellow-50 shadow-md rounded p-4">
                  <img src={ad.img} alt="Ad" className="w-full h-auto object-cover rounded-lg" />
                  <p className="mt-2 text-gray-600">Posted on: {ad.date}</p>
                  <button
                    onClick={() => openPopup(ad.img, ad)}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    See More
                  </button>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-bold mt-8 mb-4 bg-yellow-200 p-4 rounded-lg w-100">Old Promotions</h2>
            <div className="grid grid-cols-3 gap-4">
              {advertisements.slice(3).map((ad, index) => (
                <div key={index} className="bg-yellow-50 shadow-md rounded p-4">
                  <img src={ad.img} alt="Ad" className="w-full h-auto object-cover rounded-lg" />
                  <p className="mt-2 text-gray-600">Posted on: {ad.date}</p>
                  <button
                    onClick={() => openPopup(ad.img, ad)}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    See More
                  </button>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default BusinessAd;
