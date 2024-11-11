import { Tooltip } from "flowbite-react";
import { HiBell } from "react-icons/hi";
import { IoLogoWhatsapp } from "react-icons/io";
import { Bounce, toast } from "react-toastify";

interface FlotingBtnsbusinessProps {
    businessMobile: string;
    clientId: number;
    businessId: number;
}

const FlotingBtnsbusiness: React.FC<FlotingBtnsbusinessProps> = ({ businessMobile, clientId, businessId }) => {

    const markSubscribe = () => {
        console.log('Subscribed');
        console.log('Client ID:', clientId);
        console.log('Business ID:', businessId);
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
        
    }
    return (
        <>
            <div className="fixed bottom-6 right-2">
                <Tooltip content="Chat with seller" placement='left'>
                    <button
                        className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-2 rounded-full shadow-lg"
                        onClick={() => window.open("https://wa.me/+94702561331", "_blank")}
                    >
                        <IoLogoWhatsapp className="text-white text-2xl" />
                    </button>
                </Tooltip>
            </div>
            <div className="fixed bottom-20 right-2">
                <Tooltip content="Subscribe Now" placement='left'>
                    <button 
                        onClick={markSubscribe}
                        className="bg-bluedark hover:bg-blue5 text-white font-bold py-2 px-2 rounded-full shadow-lg">
                        <HiBell className="text-white text-2xl" />
                    </button>
                </Tooltip>
            </div>
        </>
    )
}

export default FlotingBtnsbusiness;
