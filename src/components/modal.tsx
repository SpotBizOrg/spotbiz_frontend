import React, { useState, useEffect } from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedPackage: any) => void;
  packageData: any;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onUpdate, packageData }) => {
  const [updatedPackage, setUpdatedPackage] = useState(packageData);

  useEffect(() => {
    setUpdatedPackage(packageData);
  }, [packageData]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedPackage({ ...updatedPackage, [name]: value });
  };

  const handleFeatureChange = (feature: string, value: string | number) => {
    setUpdatedPackage((prevPackage: any) => ({
      ...prevPackage,
      features: {
        ...prevPackage.features,
        [feature]: value,
      },
    }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <XMarkIcon className="w-6 h-6" aria-hidden="true" />
        </button>
        <h2 className="text-xl font-bold mb-6 text-center">Edit Package</h2>
        <div className="flex mb-4 space-x-4">
          <div className="flex-1">
            <label className="block text-gray-500 text-sm">Package Title</label>
            <input
              type="text"
              name="title"
              value={updatedPackage?.title || ''}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-500 text-sm">Price (Rs.)</label>
            <input
              type="number"
              name="monthlyPrice"
              value={updatedPackage?.monthlyPrice || ''}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 text-sm">Package Description</label>
          <textarea
            name="description"
            value={updatedPackage?.description || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 text-sm">Features</label>
          <div className="mt-1 border-t border-gray-200 pt-2 pl-4">
            <div className="flex justify-between items-center py-1">
              <span className="text-gray-900 font-bold">Advertisements & promotions per week</span>
              <input
                type="number"
                name="Advertisements & promotions per week"
                value={updatedPackage?.features['Advertisements & promotions per week'] || ''}
                onChange={(e) => handleFeatureChange('Advertisements & promotions per week', parseInt(e.target.value, 10))}
                className="w-16 p-2 border border-gray-300 rounded ml-2"
              />
            </div>
            {['Display business details to customer', 'Profile analytics', 'Interact with customers'].map((feature) => (
              <div key={feature} className="flex justify-between items-center py-1">
                <span className="text-gray-900 font-bold">{feature}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleFeatureChange(feature, '✅')}
                    className={`p-1 border rounded ${updatedPackage?.features[feature] === '✅' ? 'border-green-500' : 'border-gray-300'}`}
                  >
                    <CheckIcon className={`w-5 h-5 ${updatedPackage?.features[feature] === '✅' ? 'text-green-500 font-bold' : 'text-gray-400'}`} aria-hidden="true" style={{ strokeWidth: 2 }} />
                  </button>
                  <button
                    onClick={() => handleFeatureChange(feature, '❌')}
                    className={`p-1 border rounded ${updatedPackage?.features[feature] === '❌' ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <XMarkIcon className={`w-5 h-5 ${updatedPackage?.features[feature] === '❌' ? 'text-red-500 font-bold' : 'text-gray-400'}`} aria-hidden="true" style={{ strokeWidth: 2 }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between mt-4 mx-12">
          <button
            onClick={() => onUpdate(updatedPackage)}
            className="px-12 py-2 bg-black text-base text-center font-semibold text-white rounded-xl hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Update
          </button>
          <button
            onClick={onClose}
            className="px-12 py-2 bg-red-600 text-base font-semibold text-white rounded-xl hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
