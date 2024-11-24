import React, { useEffect, useState } from "react";
import MasterCardImage from "../assets/CardImages/masterCard.png";
import visaCardImage from "../assets/CardImages/visaCard.png";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { BACKEND_URL } from "../../config";
import axios from "axios";

// const handleClick = () => {
//   const selectedPlanId = 1;
//   navigate("/packages/payment", { state: { selectedPlanId } });
// };

interface Payment {
  cardType: string;
  cardNo: number | null;
  expMonth: number | null;
  expYear: number | null;
  cvn: number | null;
  amount: number;
}

interface BillingDetails{
  subscriptionBillingId:number;
  subscriptionId:number;
  amount:number;
  billingStatus:string;
  billingDate:string;
  businessId:number;
  isActive:boolean;
}

interface PaymentPageProps {
  selectedPlanId: number;
  subscriptionBillingId:number;
}

const PaymentGateway: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedPlanId } = location.state as PaymentPageProps;
  const {subscriptionBillingId} = location.state as PaymentPageProps;
  const [selectedPlan, setSelectedPlan] = useState<string>("Standerd");
  const [price, setPrice] = useState<number>(300);
  const [loading, setloading] = useState(false);
  const [payment, setPayment] = useState<Payment>({
    cardType: "",
    cardNo: null,
    expMonth: null,
    expYear: null,
    cvn: null,
    amount: price,
  });
  const [isDeclarationChecked, setIsDeclarationChecked] =
    useState<boolean>(false);
    const [billingDetails,setBillingDetails] = useState<BillingDetails>();
  const currentTime = new Date();

  const storedEmail = localStorage.getItem('email');
  const storedUserId = localStorage.getItem('user_id');

  // //for testing
  // const storedEmail = "yuhanga2001@gmail.com";
  // const storedUserId = 8;


  useEffect(() => {
    fetchPlanDetails();
    fetchBillingDetails();

    console.log(selectedPlanId);
    console.log(subscriptionBillingId);
    
    
  }, []);

  const fetchBillingDetails = async () => {
    const url = `${BACKEND_URL}/subscription-billing/${subscriptionBillingId}`;
    try {
      const response = await axios.get(url);
      setBillingDetails(response.data);
      console.log("billing", billingDetails);
      
    } catch (error) {
      console.error(error);
    }
  }

  const fetchPlanDetails = async () => {
    setloading(true);
    const url = `${BACKEND_URL}/packages/get/${selectedPlanId}`;
    try {
      const response = await axios.get(url);
      setSelectedPlan(response.data.feature);
      setPrice(response.data.price);
      setPayment((prevPayment) => ({
        ...prevPayment,
        amount: response.data.price,
      }));
      
    } catch (error) {
      console.error(error);
    }
    finally{
      setloading(false)
    }
    // try {
    //   console.log(selectedPlanId);
    //   setSelectedPlan("Standerd");
    //   setPrice(1000);
    //   setPayment((prevPayment) => ({
    //     ...prevPayment,
    //     amount: 1000,
    //   }));
    //   setloading(false);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const validateInputs = () => {
    if (payment.cardType === "") {
      toast.error("Please select card type");
    } else if (payment.cardNo === undefined) {
      toast.error("Please enter card number");
    } else if (
      payment.cardNo === null ||
      payment.cardNo.toString().length < 16
    ) {
      toast.error("Please enter valid card number");
    } else if (payment.expMonth === undefined) {
      toast.error("Please enter expiration month");
    } else if (
      payment.expMonth === null ||
      payment.expMonth < 1 ||
      payment.expMonth > 12
    ) {
      toast.error("Please enter valid expiration month");
    } else if (payment.expYear === undefined) {
      toast.error("Please enter expiration year");
    } else if (
      payment.expYear === null ||
      payment.expYear <
        parseInt(currentTime.getFullYear().toString().slice(-2)) ||
      (payment.expYear ===
        parseInt(currentTime.getFullYear().toString().slice(-2)) &&
        payment.expMonth < currentTime.getMonth() + 1)
    ) {
      toast.error("Please enter valid expiration year");
    } else if (payment.cvn === undefined) {
      toast.error("Please enter CVV");
    } else if (payment.cvn === null || payment.cvn.toString().length < 3) {
      toast.error("Please enter valid CVV");
    } else if (!isDeclarationChecked) {
      toast.error("Please agree to the terms and conditions");
    } else {
      return true;
    }
  };

  const markPaymentAsPaid = async () => {

    // getLocalStorageData();

    const url = `${BACKEND_URL}/subscription-billing/${subscriptionBillingId}`;
    if (billingDetails) {
      billingDetails.billingStatus = "PAID";
      billingDetails.isActive = true;
    }
    try {
      const response = await axios.put(url, billingDetails);
      if (response.status === 200) {
        toast.success("Payment Successful");
        getLocalStorageData()
      }
    } catch (error) {
      console.error(error);
      toast.error("Payment Failed");
    }
  }

  const saveOpnHours = async (data: JSON) => {
    console.log(data);

    try{
      const url = `${BACKEND_URL}/businessOpening/${storedEmail}`;

      const response = await axios.post(url, data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

  }

  const saveBusinessData = async (data: JSON, category: string, tags: Array<string>, busienssId:number) => {

    const body = {
      ...data, 
      categoryId: parseInt(category), 
      tags: tags,
      userId: storedUserId,
      profileCover:null,
      locationUrl:null,
      status: "APPROVED",
      businessId: busienssId
    
    }

    console.log(body);
    

    try{
      const url = `${BACKEND_URL}/business/update/${storedEmail}`;

      const response = await axios.put(url, body);
      console.log(response.data);

    } catch (error) {
      console.error(error);
    }
    
  }

  const saveLocalStorageData = async (data: any) => {

    try {
        await saveBusinessData(data.businessDetails, data.category, data.tags, data.businessId); // Wait for this to complete
        await saveOpnHours(data.openHours); // Wait for this to complete
    } catch (error) {
        console.error("Error saving data:", error);
    } 
};


  const getLocalStorageData = () => {
    const data = JSON.parse(localStorage.getItem("data")!);
    console.log("from local storage", data);
    saveLocalStorageData(data);
    
  }

  const handlePayment = async() => {
    if (validateInputs()) {
      console.log(payment);

      try{
        setloading(true);
        await markPaymentAsPaid();
      } catch (error) {
        console.error(error)
      } finally{
        setloading(false)
        // toast.success("Payment Successful");
        navigate("/business/dashboard")
      }
      
      
      // setTimeout(() => {
      //   setloading(false);
      //   toast.success("Payment Successful");
        
      // }, 2000);
    }
  };

  const handleBack =async () => {
    try{
      setloading(true);
      const url = `${BACKEND_URL}/subscription-billing/delete/${subscriptionBillingId}`;
      
      const response = await axios.put(url, billingDetails);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally{
      setloading(false);
      navigate("/business/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary">
      <div className="flex flex-col md:flex-col bg-white rounded-lg px-8 shadow-lg w-full max-w-5xl items-center justify-center min-h-[600px] gap-4">
        <div>
          <h1 className="text-3xl font-bold">Payment Details</h1>
        </div>
        <div className="flex flex-col md:flex-row p-6 w-full max-w-5xl gap-10 items-center justify-center">
          <div id="schedule" className="flex-1 space-y-4">
            <h3 className="text-lg">
              Selected Plan:{" "}
              <input
                type="text"
                name="selectedPlan"
                id="selectedPlan"
                value={selectedPlan}
                disabled
                className="form-control border border-gray-300 p-2 rounded-md w-auto"
              />
            </h3>
            <h3 className="text-lg">
              Price: Rs.&nbsp;
              <input
                type="text"
                name="amount"
                id="amount"
                value={payment.amount}
                disabled
                className="form-control border border-gray-300 p-2 rounded-md w-auto"
              />
            </h3>

            <div className="border border-gray-300 p-4 space-y-2 rounded-md">
              <p className="text-red-600 font-semibold">
                Important: Subscriptions are automatically renewed at the end of
                each billing period unless canceled beforehand.
              </p>
              <p>
                - You can cancel your subscription at any time from your account
                settings, and you will retain access until the end of the
                current billing cycle.
              </p>
              <p>
                - Refunds are not available after the billing cycle has started.
              </p>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  onChange={() =>
                    setIsDeclarationChecked(!isDeclarationChecked)
                  }
                  checked={isDeclarationChecked}
                />
                <span>I agree to the subscription terms and conditions</span>
              </label>
            </div>
          </div>

          <div id="payment" className="flex-1 space-y-4 ">
            <div className="form-group space-y-2">
              <label className="font-bold">
                Card Type<span className="text-red-600">*</span>
              </label>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="cardType"
                    id="visaCard"
                    value="Visa"
                    checked={payment.cardType === "Visa"}
                    onChange={(e) =>
                      setPayment({ ...payment, cardType: e.target.value })
                    }
                  />
                  <label htmlFor="visaCard" className="cursor-pointer">
                    <img src={visaCardImage} alt="VisaCard" className="w-10" />
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="cardType"
                    id="masterCard"
                    value="Master"
                    checked={payment.cardType === "Master"}
                    onChange={(e) =>
                      setPayment({ ...payment, cardType: e.target.value })
                    }
                  />
                  <label htmlFor="masterCard" className="cursor-pointer">
                    <img
                      src={MasterCardImage}
                      alt="MasterCard"
                      className="w-10"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="form-group space-y-2">
              <label htmlFor="cardNo" className="font-bold">
                Card Number<span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                id="cardNo"
                className="form-control border border-gray-300 p-2 rounded-md w-full"
                placeholder="XXXXXXXXXXXXXXXX"
                required
                value={payment.cardNo ?? ""}
                onChange={(e) =>
                  setPayment({ ...payment, cardNo: +e.target.value })
                }
              />
            </div>

            <div className="form-group flex gap-4">
              <div className="flex-1 space-y-2">
                <label htmlFor="expMonth" className="font-bold">
                  Expiration Month<span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  id="expMonth"
                  className="form-control border border-gray-300 p-2 rounded-md w-full"
                  placeholder="MM"
                  required
                  value={payment.expMonth ?? ""}
                  onChange={(e) =>
                    setPayment({ ...payment, expMonth: +e.target.value })
                  }
                />
              </div>
              <div className="flex-1 space-y-2">
                <label htmlFor="expYear" className="font-bold">
                  Expiration Year<span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  id="expYear"
                  className="form-control border border-gray-300 p-2 rounded-md w-full"
                  placeholder="YY"
                  required
                  value={payment.expYear ?? ""}
                  onChange={(e) =>
                    setPayment({ ...payment, expYear: +e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-group space-y-2">
              <label htmlFor="cvn" className="font-bold">
                CVV<span className="text-red-600">*</span>
              </label>
              <input
                type="password"
                id="cvn"
                className="form-control border border-gray-300 p-2 rounded-md w-full"
                placeholder="XXX"
                required
                value={payment.cvn ?? ""}
                onChange={(e) =>
                  setPayment({ ...payment, cvn: +e.target.value })
                }
              />
            </div>

            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleBack}
                className=" bg-gray-400 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded focus:outline-none"
              >
                Back
              </button>

              <button
                className="bg-bluedark hover:bg-blue-700 text-white font-bold px-6 py-2 rounded focus:outline-none"
                type="submit"
                disabled={loading}
                onClick={handlePayment}
              >
                {loading ? (
                  <>
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 me-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    Loading...
                  </>
                ) : (
                  "Pay Now"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <HashLoader color="#36d7b7" size={50} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentGateway;
