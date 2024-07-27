import React, { useEffect } from 'react';
import successImage from "../assets/IntelliHome.png"; // Replace with your image path

interface SuccessMessageProps {
  onClose: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1000); // Display for 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-900 z-50">
      <div className="bg-white rounded-lg shadow-lg p-12 max-w-md w-full text-center">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>
        <img
          src={successImage}
          alt="Success"
          className="w-32 h-32 mx-auto mb-4"
        />
        <h2 className="text-3xl font-bold text-primary mb-2">Successfull!</h2>
        <p className="text-lg mb-4">Your Login is Successfull.</p>
        <button
          onClick={onClose}
          className="bg-primary text-white rounded-full px-4 py-2 mt-4"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;




// "../assets/IntelliHome.png"