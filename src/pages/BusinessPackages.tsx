import { useState } from 'react';
import Businessnavbar from '../components/Businessnavbar';
import Businesssidebar from '../components/Businesssidebar';
import PackageCard from '../components/PackageCard';
import { Button, CustomFlowbiteTheme, Modal } from "flowbite-react";
import Popup from '../components/Popup';

const packagesData = [
  {
    id: 1,
    title: 'Freelancer',
    description: 'The essentials to provide your best work for clients.',
    monthlyPrice: 15,
    features: ['5 products', 'Up to 1,000 subscribers', 'Basic analytics', '48-hour support response time'],
    buttonText: 'Buy plan',
  },
  {
    id: 2,
    title: 'Startup',
    description: 'A plan that scales with your rapidly growing business.',
    monthlyPrice: 30,
    features: ['25 products', 'Up to 10,000 subscribers', 'Advanced analytics', '24-hour support response time', 'Marketing automations'],
    buttonText: 'Buy plan',
    isPopular: true,
  },
  {
    id: 3,
    title: 'Enterprise',
    description: 'Dedicated support and infrastructure for your company.',
    monthlyPrice: 60,
    features: ['Unlimited products', 'Unlimited subscribers', 'Advanced analytics', '1-hour support response time', 'Marketing automations', 'Custom reporting tools'],
    buttonText: 'Buy plan',
  },
];


export default function BusinessPackages() {
  const [isMonthly, setIsMonthly] = useState(true);
  const [openModal, setOpenModal] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen flex flex-col">
      <Businessnavbar />
      <div className="flex flex-1 mt-12">
        <div className="flex-none w-64">
          <Businesssidebar selectedTile={''} />
        </div>
        <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Pricing plans for teams of all sizes</h2>
              
              {/* <div className="flex justify-center mt-8">
                <button
                  onClick={() => setIsMonthly(true)}
                  className={`px-4 py-2 font-semibold text-sm ${isMonthly ? 'text-white bg-blue6' : 'text-gray-700 bg-gray-200'} rounded-l-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsMonthly(false)}
                  className={`px-4 py-2 font-semibold text-sm ${!isMonthly ? 'text-white bg-blue6' : 'text-gray-700 bg-gray-200'} rounded-r-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
                >
                  Annually
                </button>
              </div> */}
              <Button onClick={() => setOpenModal(true)}>Toggle modal</Button>
      <Button
        onClick={togglePopup}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Open Popup
      </Button>
      <Popup isOpen={isPopupOpen} onClose={togglePopup} />
            </div>
            <div className="mt-16 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {packagesData.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  title={pkg.title}
                  description={pkg.description}
                  price={isMonthly ? `$${pkg.monthlyPrice}` : `$${pkg.monthlyPrice * 12}`}
                  features={pkg.features}
                  buttonText={pkg.buttonText}
                  isPopular={pkg.isPopular}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className='flex w-full items-center justify-center'>
    <Modal position="center"  show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>Terms of Service</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            With less than a month to go before the European Union enacts new consumer privacy laws for its citizens,
            companies around the world are updating their terms of service agreements to comply.
          </p>
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant
            to ensure a common set of data rights in the European Union. It requires organizations to notify users as
            soon as possible of high-risk data breaches that could personally affect them.
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setOpenModal(false)}>I accept</Button>
        <Button color="gray" onClick={() => setOpenModal(false)}>
          Decline
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
    
    </>
    
  );
}
