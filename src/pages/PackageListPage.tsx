// src/pages/PackageListPage.tsx
import React, { useEffect, useState } from 'react';
import Container from '../components/Container1';
import PackageCard from '../components/PkgNewNoBtn';
import { useNavigate } from 'react-router-dom';
import NoUserNav from '../components/NoUserNav';
import Footer from '../components/Footer';
import Container2 from '../components/Container2';
import { BACKEND_URL } from '../../config';
import axios from 'axios';

interface PackageProps {
  packageId: number,
    feature: string,
    adsPerWeek: number,
    analytics: boolean,
    fakeReviews: boolean,
    recommondation: boolean,
    messaging: boolean,
    listing: string,
    price: number,
    isActive: boolean,
}


const PackageListPage: React.FC = () => {
  const navigate = useNavigate();
  const [subscriptionPackages, setSubscriptionPackages] = useState<PackageProps[]>([])

  const fetchData = async () =>{
    const url = `${BACKEND_URL}/packages/get_all`;
  
  
    try{
      const response = await axios.get(url)
      // console.log(response.data);
      setSubscriptionPackages(response.data)
      console.log(subscriptionPackages);
      
      
    } catch (error){
      console.log(error)
    }
  
  
  }
  
  useEffect(() => {
    fetchData()
    console.log(subscriptionPackages);
    
  }, [])

  return (
    <div>
      <NoUserNav />
      <Container2>
        <div className="flex flex-col items-center justify-center h-full pt-8">
          <h1 className="text-3xl font-bold text-center mb-4 mt-8">Subscription Plans</h1>
          <div className="mt-3 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ml-8 mr-8">
          {subscriptionPackages.map((pkg) => (
              <PackageCard
                key={pkg.packageId}
                feature={pkg.feature}
                price={"Rs. " + pkg.price}
                adPerWeek={pkg.adsPerWeek}
                analytics={pkg.analytics}
                fakeReviews={pkg.fakeReviews}
                listing={pkg.listing}
                messaging={pkg.messaging}
                recommondation={pkg.recommondation}
                isActive={pkg.isActive}
                // selectOption={() => handleClick(pkg.packageId)}

              />
            ))}
          </div>
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">*Register to the System to buy the plans</p>
            <button
              onClick={() => navigate('/business/signup')}
              className="mt-3 mb-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              List Your Business
            </button>
          </div>
        </div>
      </Container2>
      <Footer />
    </div>
  );
};

export default PackageListPage;
