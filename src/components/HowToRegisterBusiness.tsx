import GroupImage from '../assets/1.png';
import { useNavigate } from 'react-router-dom';

const HowToRegisterBusiness = () => {
  const navigate = useNavigate();
  function navigateToPage(){
    navigate('/packages')
  }
  return (
    <div className="flex items-center bg-blue11 p-8 rounded-custom3 shadow-lg mx-4 md:mx-8 lg:mx-16">
      <img src={GroupImage} alt="Connect to our network" className="w-1/2 h-auto" />
      <div className="ml-8 text-left">
        <h2 className="text-3xl font-bold mb-4">Connect to our network. Expand your reach</h2>
        <p className="text-lg mb-6">Increase visibility! Attract new customers and boost business sales. Get reviews and build a strong online reputation. Your company profile can include contact information, a description, products, photos, and your business location on the map.</p>
        <button onClick={navigateToPage} className="bg-green-500 text-white py-2 px-6 rounded-full text-lg flex items-center">
          List your business
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="ml-2 h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7-7l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HowToRegisterBusiness;
