import { Tooltip } from "flowbite-react";
import { HiBell } from "react-icons/hi";
import { IoLogoWhatsapp } from "react-icons/io";
import { Bounce, toast } from "react-toastify";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { useEffect, useState } from "react";

interface FlotingBtnsbusinessProps {
    businessMobile: string;
    clientId: number;
    businessId: number;
    messaging: boolean;
    isSubscribed: boolean;
}

const FlotingBtnsbusiness: React.FC<FlotingBtnsbusinessProps> = ({ businessMobile, clientId, businessId, messaging, isSubscribed }) => {
    const [subscribed, setSubscribed] = useState<boolean>(false);

    const subscribe = () => {
        const url = `${BACKEND_URL}/sub_business/subscribe`;
    
        const body = {
            subscribeId: 0,
            dateTime: new Date().toISOString().split('.')[0],
            businessId: businessId,
            userId: clientId,
        };
    
        // Make the API call without waiting
        axios.post(url, body)
            .then((response) => {
                if (response.status === 200) {
                    toast('🎉 Subscribed!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                } else {
                    toast.error('An unexpected error occurred');
                }
            })
            .catch((error) => {
                console.error('An error occurred:', error);
            });
    
    };

    const handleSubscribe = async () => {

        if(subscribed){
            unsubscribe();
            setSubscribed(false);
        } else {
            subscribe();
            setSubscribed(true);
        }

    }

    const unsubscribe = () => {
        const url = `${BACKEND_URL}/sub_business/unsubscribe/${clientId}/${businessId}`;
    
        axios.delete(url)
            .then((response) => {
                if (response.status === 200) {
                    toast('😢 Unsubscribed!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                } else {
                    toast.error('An unexpected error occurred');
                }
            })
            .catch((error) => {
                console.error('An error occurred:', error);
            });

    };
    

    useEffect(() => {
        setSubscribed(isSubscribed);
    }, [isSubscribed])


    return (
        <>
            <div className="fixed bottom-6 right-2">
                {messaging && clientId !== 0 && (
                    <Tooltip content="Chat with seller" placement="left">
                        <button
                            className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-2 rounded-full shadow-lg"
                            onClick={() => window.open("https://wa.me/+94702561331", "_blank")}
                        >
                            <IoLogoWhatsapp className="text-white text-2xl" />
                        </button>
                    </Tooltip>
                )}
            </div>
            <div className="fixed bottom-20 right-2">
                {clientId !== 0 && (
                    <Tooltip
                        content={subscribed ? "Unsubscribe" : "Subscribe Now"}
                        placement="left"
                    >
                        <button
                            onClick={handleSubscribe}
                            className={`font-bold py-2 px-2 rounded-full shadow-lg text-white ${
                                subscribed
                                    ? "bg-red-500 hover:bg-red-400" // Red for subscribed
                                    : "bg-bluedark hover:bg-blue5" // Blue for not subscribed
                            }`}
                        >
                            <HiBell className="text-white text-2xl" />
                        </button>
                    </Tooltip>
                )}
            </div>
        </>
    )
}

export default FlotingBtnsbusiness;
