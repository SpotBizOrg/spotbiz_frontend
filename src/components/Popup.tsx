import React, { useRef, useState } from 'react';
import PackageCard from './PackageCard';
import PackageListPage from '../pages/PackageListPagePopup';
import axios from 'axios';
import { BACKEND_URL } from '../../config';
import { useNavigate } from 'react-router-dom';
import { HashLoader } from 'react-spinners';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  boughtPackage: number;
  businessId: number

}


const Popup: React.FC<PopupProps> = ({ isOpen, onClose, boughtPackage, businessId }) => {

  const [selectedSubPackage, setSeletectedSubPackage] = useState<number>(0)
  const selectedPackageRef = useRef<number>(selectedSubPackage);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();


      // nagigation upon selecting a package
      const handleClick = async (selectedPlanId: number, subscriptionBillingId:number) => {

        if (selectedPlanId === 0) {
          window.location.reload()
        } else {
            navigate("/packages/payment", { state: { selectedPlanId, subscriptionBillingId } });
            
        }
    };


      // get the price of the selected package
      const getPrice = async (packageId: number) => {
        const url = `${BACKEND_URL}/packages/get/${packageId}`

        try{
            const response = await axios.get(url);
            const item = response.data;
            console.log(item);
            return item.price;
        }catch (e){
            console.error("Error fetching data:", e)
        }
    }

      // save the purchase in the database - pending state
      const savePurchase = async (packageId: number) => {

        const price = await getPrice(packageId);
        console.log(price);
        

        const url = `${BACKEND_URL}/subscription-billing/subscription-billing`
        const data = {
            subscriptionBillingId: 0,
            subscriptionId: packageId,
            businessId: businessId,
            billingDate: (new Date()).toISOString(),
            billingStatus: "PENDING",
            amount: price,
            isActive: true
          }
        console.log(data);
        

        try{
            const response = await axios.post(url, data);
            const item = response.data;
            console.log(item);
            return item.subscriptionBillingId;
        }catch (e){
            console.error("Error fetching data:", e)
        }
    }

    // set the selected subscription package id
    const setSelectedPackageId = async (packageId: number): Promise<void> => {
      
      selectedPackageRef.current = packageId; // Update ref synchronously
      setSeletectedSubPackage(packageId);       // Set state (asynchronously)
      console.log("Updated Package ID (ref):", selectedPackageRef.current);
      console.log(selectedSubPackage);
      
      //set loader
      setloading(true);

      // save the purchase in the database
      const billingId = await savePurchase(packageId);
      console.log("Billing ID:", billingId);

      setloading(false)

      // navigate to the next page
      handleClick(packageId, billingId);


    };
  

  if (!isOpen) return null;

  return (
    <div className="fixed font-body inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
      <div className="bg-white p-8 rounded-md shadow-lg w-11/12">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-xl font-bold">&times;</button>
        </div>
        <div className="mt-2">
          <PackageListPage passId={setSelectedPackageId} boughtPackage={boughtPackage} />
          {/* <p className="text-subsubheading text-center">Subscription Plans</p>
          <div className="mt-8 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {packagesData.map((pkg) => (
              <PackageCard
                key={pkg.id}
                title={pkg.title}
                description={pkg.description}
                price={"Rs. " + pkg.monthlyPrice.toString()}
                features={pkg.features}
                buttonText={pkg.buttonText}
                isPopular={pkg.isPopular}
                onClick={() => {}} // Provide a dummy onClick handler
              />
            ))}
          </div> */}
        </div>
        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <HashLoader color="#36d7b7" size={50} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;
