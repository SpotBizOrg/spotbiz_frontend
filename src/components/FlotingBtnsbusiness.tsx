import { Tooltip } from "flowbite-react";
import { HiBell } from "react-icons/hi";
import { IoLogoWhatsapp } from "react-icons/io";

const FlotingBtnsbusiness: React.FC =  () => {
    return(
        <>
            <div className="fixed bottom-4 right-0">
      <Tooltip content="Chat with seller" placement='left'>
      <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-2 rounded-full shadow-lg">
          <IoLogoWhatsapp className="text-white text-2xl" />

        </button>
      </Tooltip>
          
      </div>
      <div className="fixed bottom-20 right-0">
      <Tooltip content="Subscribe Now" placement='left'>
      <button className="bg-bluedark hover:bg-blue5 text-white font-bold py-2 px-2 rounded-full shadow-lg">
          <HiBell className="text-white text-2xl" />

        </button>
      </Tooltip>
          
      </div>
        </>
    )
}

export default FlotingBtnsbusiness;