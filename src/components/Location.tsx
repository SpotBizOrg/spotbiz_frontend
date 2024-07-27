import React from "react";
import map from '../assets/map.png';

const BusinessLocation: React.FC = () => {
    return (
        <div className="bg-white p-4 rounded-md shadow-md mb-10 border border-gray-300">
            <div className="p-2 border border-gray-400 rounded text-center">
                <p className="font-bold text-bluedark text-bodymedium">Location</p>
            </div>
            <div 
              className="bg-cover rounded-md relative p-4"
              style={{ backgroundImage: `url(${map})`, height: '300px' }}
            >
              <button className="text-bodysmall absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue2 border text-white px-4 py-2 rounded-md font-semibold">
                View Map
              </button>
            </div>
          </div>
    )
}

export default BusinessLocation;