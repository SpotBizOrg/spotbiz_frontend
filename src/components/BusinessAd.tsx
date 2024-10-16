import React, { useState } from 'react';
import { Modal, Badge, TextInput, Label, Button } from 'flowbite-react'; // Importing necessary components from Flowbite
import Businessnavbar from '../components/Businessnavbar';
import Businesssidebar from '../components/Businesssidebar';
import ad1 from '../assets/ad1.png';
import ad2 from '../assets/ad2.png';
import ad3 from '../assets/ad3.png';
import ad4 from '../assets/add4.jpeg';
import ad5 from '../assets/ad5.jpeg';
import ad6 from '../assets/ad6.jpg';
import Container from './Container';
import { FaPlus } from 'react-icons/fa';

interface Advertisement {
  img: string;
  date: string;
  details: string;
  description: string;
  startDate: string;
  endDate: string;
  branch: string;
  contact: string;
  isRemoved: boolean;
}

const BusinessAd: React.FC = () => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [formPopupOpen, setFormPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageDetails, setSelectedImageDetails] = useState<Advertisement | null>(null);
  const [newAd, setNewAd] = useState<Partial<Advertisement>>({
    details: '',
    img: ''
  });

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

  const openFormPopup = () => {
    setFormPopupOpen(true);
  };

  const closeFormPopup = () => {
    setFormPopupOpen(false);
  };

  const handleAddAd = () => {
    // Add logic to handle adding the new advertisement
    console.log('New Advertisement:', newAd);
    closeFormPopup();
  };

  const advertisements: Advertisement[] = [
    {
      img: ad1, date: '2024-07-06', details: 'Abans LG Audio Visual Offers', description: 'Abans LG Audio Visual Offers 21 Apr 2013', startDate: '2024-07-01', endDate: '2024-07-10', branch: 'Main Branch', contact: '+1234567890',
      isRemoved: false
    },
    {
      img: ad2, date: '2024-07-05', details: 'Abans Black Friday', description: 'Ad 2 description', startDate: '2024-07-02', endDate: '2024-07-12', branch: 'Downtown Branch', contact: '+0987654321',
      isRemoved: false
    },
    {
      img: ad3, date: '2024-07-04', details: 'Abans 8 days Deal', description: 'Ad 3 description', startDate: '2024-07-03', endDate: '2024-07-15', branch: 'West End Branch', contact: '+1357924680',
      isRemoved: false
    },
    {
      img: ad4, date: '2024-07-03', details: 'Abans Awurudu', description: 'Ad 4 description', startDate: '2024-07-04', endDate: '2024-07-20', branch: 'East Side Branch', contact: '+2468013579',
      isRemoved: false
    },
    {
      img: ad5, date: '2024-07-02', details: 'Level Up with Abans', description: 'Ad 5 description', startDate: '2024-07-05', endDate: '2024-07-25', branch: 'Uptown Branch', contact: '+9876543210',
      isRemoved: true
    },
    {
      img: ad6, date: '2024-07-01', details: 'Abans Awurudu Offers', description: 'Ad 6 description', startDate: '2024-07-06', endDate: '2024-07-30', branch: 'Midtown Branch', contact: '+0123456789',
      isRemoved: true
    },
  ];

  return (
    <Container>
      <Businessnavbar />
      <Businesssidebar selectedTile="Ads & Promos"/>
      <div className="px-12 sm:ml-64 mt-20">
        <div className="w-fit mb-10 border-b-gray-900">
          <h1 className="text-subsubheading text-bluedark">My Advertisements and Promotions</h1>
        </div>
        <div className='flex items-center justify-between w-full mb-5'>
          <p className='text-gray-400 text-bodysmall font-semibold'>Advertisements posted on last two weeks</p>
          <div
            className="relative flex items-center justify-center w-[40px] h-[40px] mt-0 border-2 border-dashed border-gray-400 rounded-lg bg-white/50 backdrop-blur-md hover:bg-white/80 hover:border-gray-600 transition-all duration-300 ease-in-out cursor-pointer"
            onClick={openFormPopup}
          >
            <FaPlus className="text-xl text-gray-500" />
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          {advertisements.map((ad, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-md shadow-md mb-5 border border-gray-300 cursor-pointer transform transition-transform duration-300 hover:scale-105"
              onClick={() => openPopup(ad.img, ad)}
            >
              <img
                src={ad.img}
                alt="Ad"
                className="w-full h-auto object-cover rounded-lg mb-5 "
              />
              <p className='text-bodylarge'>{ad.details}</p>
              <p className="mt-2 text-bodysmall text-gray-600"><b>Posted on:</b> {ad.date}</p>
            </div>
          ))}
        </div>

        <Modal dismissible show={popupOpen} onClose={closePopup} size="lg" theme={{
        content: {
          base: "bg-white w-3/4 rounded-lg", 
          inner: "rounded-lg shadow-lg",
        },
      }}>
          <Modal.Header>Advertisement Details</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <img src={selectedImage!} alt="Ad" className="w-full h-auto object-cover rounded mb-4" />
              <div className="flex flex-col">
                <div>
                  <p className="text-lg font-semibold">{selectedImageDetails?.description}</p>
                  <p className="text-sm text-gray-600"><b>Posted on: </b>{selectedImageDetails?.date}</p>
                  <p className="text-sm text-gray-600"><b>Removing on: </b>{selectedImageDetails?.endDate}</p>

                  {selectedImageDetails?.isRemoved && (
                    <div className='float-right'>
                      <Badge className='bg-red-400'>Removed</Badge>
                    </div>
                  )}
                </div>
                {/* <div className="bg-gray-100 rounded-lg p-4 mb-4">
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
                </div> */}
              </div>
              {/* {renderSocialIcons()} */}
            </div>
          </Modal.Body>
          {/* <Modal.Footer>
            <Button onClick={closePopup}>Close</Button>
          </Modal.Footer> */}
        </Modal>

        <Modal dismissible show={formPopupOpen} onClose={closeFormPopup} size="lg" theme={{
        content: {
          base: "bg-white w-3/4 rounded-lg", 
          inner: "rounded-lg shadow-lg",
        },
      }}>
          <Modal.Header>Add New Advertisement</Modal.Header>
          <Modal.Body>
            <form className="space-y-6">
              <div>
                <Label htmlFor="details">Advertisement Name</Label>
                <TextInput
                  id="details"
                  type="text"
                  value={newAd.details}
                  onChange={(e) => setNewAd({ ...newAd, details: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="image">Advertisement Image</Label>
                <TextInput
                  id="image"
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setNewAd({ ...newAd, img: reader.result as string });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="mt-1"
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleAddAd}>Add Advertisement</Button>
            <Button color="gray" onClick={closeFormPopup}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Container>
  );
};

export default BusinessAd;
