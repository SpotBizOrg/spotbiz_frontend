// src/components/CouponPopup.tsx
import React, { useState, useEffect, useRef } from 'react';

interface CouponPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const CouponPopup: React.FC<CouponPopupProps> = ({ isOpen, onClose }) => {
  const [couponCode, setCouponCode] = useState(['', '', '']);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    if (couponCode.join('') === '123') {
      setIsValid(true);
    } else if (couponCode.join('').length === 3) {
      setIsValid(false);
    } else {
      setIsValid(null);
    }
  }, [couponCode]);

  useEffect(() => {
    if (isOpen) {
      setCouponCode(['', '', '']);
      setIsValid(null);
      inputRefs[0].current?.focus();
    }
  }, [isOpen]);

  const handleInputChange = (index: number, value: string) => {
    if (/^\d$/.test(value) || value === '') { // Only allow single digit numbers
      const newCouponCode = [...couponCode];
      newCouponCode[index] = value;
      setCouponCode(newCouponCode);
      
      // Move focus to the next input if current input is filled
      if (value !== '' && index < inputRefs.length - 1) {
        inputRefs[index + 1].current?.focus();
      }

      // Move focus back if input is cleared
      if (value === '' && index > 0) {
        inputRefs[index - 1].current?.focus();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed font-body inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
      <div className="bg-white p-8 rounded-md shadow-lg w-5/6 max-w-md">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-xl font-bold">&times;</button>
        </div>
        <div className="mt-2 text-center">
          <h2 className="text-2xl font-bold mb-4">Check Coupon Code</h2>
          <p className="text-gray-500 mb-4">Enter the coupon code</p>
          <div className="flex justify-center gap-2 mb-4">
            {couponCode.map((code, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                maxLength={1}
                value={code}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="border rounded p-2 w-12 text-center text-lg"
              />
            ))}
          </div>
          {isValid === true && (
            <div className="mt-4 flex justify-center">
              <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center">
                <span className="text-green-500 text-5xl">✔</span>
              </div>
            </div>
          )}
          {isValid === false && (
            <div className="mt-4 flex justify-center">
              <div className="w-16 h-16 rounded-full border-4 border-red-500 flex items-center justify-center">
                <span className="text-red-500 text-5xl">✖</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CouponPopup;
