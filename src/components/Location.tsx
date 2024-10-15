import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

interface BusinessLocationProps {
  location: string;
}

const BusinessLocation: React.FC<BusinessLocationProps> = ({ location }) => {
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);

  const fetchCoordinates = async (address: string) => {
    // const api_key = '1a8fbbeaffdd467db7e42bd66702aad1'; // Add your OpenCage API key here
    // const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${api_key}`;
    
    // try {
    //   const response = await axios.get(url);
    //   const data = response.data;

    //   if (data && data.results && data.results.length > 0) {
    //     const { lat, lng } = data.results[0].geometry;
    //     setCoordinates([ lat, lng ]);
    //     console.log(`Coordinates for ${address}:`, { lat, lng });
        
    //   } else {
    //     console.error("No coordinates found for the location.");
    //   }
    // } catch (error) {
    //   console.error(`Error fetching coordinates for address ${address}:`, error);
    // }

    try {
      // Update the query with the full address
      // const address = '88 Peradeniya Road, Kandy, Sri Lanka';
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`
      );
      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setCoordinates([parseFloat(lat), parseFloat(lon)]);
        console.log(`Coordinates for ${address}:`, { lat, lon });
        
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };

  useEffect(() => {
    if (location) {
      // fetchCoordinates(location); // Uncomment this line to fetch coordinates
    }
  }, [location]);

  return (
    <div className="bg-white p-4 rounded-md shadow-md mb-5 border border-gray-300">
      <div className="p-2 border mb-4 border-gray-400 rounded text-center">
        <p className="font-bold text-bluedark text-bodymedium">Location</p>
      </div>
      <div
        // ref={mapRef}
        className="h-64 w-full rounded-md"
        style={{ height: "400px" }}
      >

{coordinates ? (
        <MapContainer center={coordinates} zoom={13} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={coordinates}>
            <Popup>{location}</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>Loading map...</p>
      )}
      </div>
    </div>
  );
};

export default BusinessLocation;
