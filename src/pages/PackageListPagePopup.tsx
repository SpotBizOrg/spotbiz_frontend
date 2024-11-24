// src/pages/PackageListPage.tsx
import React, { useEffect, useState } from 'react';
import PackageCard from '../components/PkgNew';
import { useNavigate } from 'react-router-dom';
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


interface PackageListPageProps {
  passId: (packageId: number) => void;
  boughtPackage: number
}

const PackageListPage: React.FC<PackageListPageProps> = ({ passId, boughtPackage }) => {
  const [subscriptionPackages, setSubscriptionPackages] = useState<PackageProps[]>([])
  // const navigate = useNavigate();


  const fetchData = async () => {
    const url = `${BACKEND_URL}/packages/get_all`;
  
    try {
      const response = await axios.get(url);
  
      // Modify the data locally before setting state
      const updatedPackages = response.data.map((item: PackageProps) => {
        if (item.packageId === boughtPackage) {
          return { ...item, isActive: true }; // Return a new object with the modified property
        }
        return item; // Return the unchanged item
      });

      // Update the state with the modified list
      setSubscriptionPackages(updatedPackages);
  
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick= (packageId: number) => {
    passId(packageId)
  }




  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      
          <h1 className="text-3xl font-bold text-center mb-4">Subscription Plans</h1>
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
                selectOption={() => handleClick(pkg.packageId)}

              />
            ))}
          </div>
          
       
    
    </div>
  );
};

export default PackageListPage;
