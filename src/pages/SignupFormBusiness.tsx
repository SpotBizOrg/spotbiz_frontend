import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaBriefcase, FaRegIdBadge, FaLock } from 'react-icons/fa';
import Profile from '../assets/profile-picture.png';

const SignupFormBusiness: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [error, setError] = useState<string>('');

  const validatePhoneNumber = (number: string): boolean => {
    const phoneNumberPattern = /^\d{10}$/;
    return phoneNumberPattern.test(number);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPhoneNumber(value);

    if (!validatePhoneNumber(value)) {
      setError('Phone number must be exactly 10 digits.');
    } else {
      setError('');
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validatePassword(password) && validatePhoneNumber(phoneNumber)) {
      navigate('/signup-in-process');
    }
  };

  const validatePassword = (password: string): boolean => {
    const lengthCriteria = password.length >= 8;
    const mixedCaseCriteria = /[a-z]/.test(password) && /[A-Z]/.test(password);
    const numberSymbolCriteria = /\d/.test(password) || /[@$!%*?&]/.test(password);

    let strength = 'weak';
    let errorMessage = '';

    if (!lengthCriteria) {
      errorMessage = 'Password must be at least 8 characters long.';
    } else if (!mixedCaseCriteria) {
      errorMessage = 'Password must include both uppercase and lowercase letters.';
    } else if (!numberSymbolCriteria) {
      errorMessage = 'Password must include numbers or symbols.';
    } else {
      strength = 'strong';
      errorMessage = '';
    }

    setPasswordError(errorMessage);
    setPasswordStrength(strength);
    return errorMessage === '';
  };

  const getPasswordStrengthColor = (strength: string) => {
    switch (strength) {
      case 'strong':
        return 'text-green-500';
      case 'weak':
      default:
        return 'text-red-500';
    }
  };

  return (
    <div className="flex h-screen bg-primary items-center justify-center font-body">
      <div className="bg-customWhite rounded-lg shadow-lg w-full max-w-5xl flex overflow-hidden">
        <div className="w-1/2 flex items-center justify-center p-4">
          <img src={Profile} alt="Profile" className="w-full h-full object-cover rounded-lg" />
        </div>
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-10 text-center">Create Your Account</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex items-center border border-gray-300 rounded py-2 px-3 bg-gray-100">
              <FaUser className="mr-3 text-gray-500" />
              <input className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none" type="text" placeholder="Your Name" style={{boxShadow: 'none' }} aria-label="Full name" required />
            </div>
            <div className="flex items-center border border-gray-300 rounded py-2 px-3 bg-gray-100">
              <FaEnvelope className="mr-3 text-gray-500" />
              <input className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none" type="email" placeholder="Your Email"  style={{boxShadow: 'none' }} aria-label="Email" required />
            </div>
            <div className="flex items-center border border-gray-300 rounded py-2 px-3 bg-gray-100">
              <FaPhone className="mr-3 text-gray-500" />
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
                type="text"
                placeholder="Phone Number"
                style={{ boxShadow: 'none' }}
                aria-label="Phone Number"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <div className="flex items-center border border-gray-300 rounded py-2 px-3 bg-gray-100">
              <FaLock className="mr-3 text-gray-500" />
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none"
                type="password"
                placeholder="Password"
                style={{ boxShadow: 'none' }}
                aria-label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {password && (
              <div className="text-sm mt-1">
                <p className={`password-strength ${getPasswordStrengthColor(passwordStrength)}`}>Password strength: {passwordStrength}</p>
                <ul className="list-disc list-inside text-left">
                  <li className={password.length >= 8 ? 'text-green-500' : 'text-red-500'}>At least 8 characters</li>
                  <li className={/[A-Z]/.test(password) && /[a-z]/.test(password) ? 'text-green-500' : 'text-red-500'}>Mixed-case letters</li>
                  <li className={/\d/.test(password) || /[@$!%*?&]/.test(password) ? 'text-green-500' : 'text-red-500'}>Contains a number or a symbol</li>
                </ul>
              </div>
            )}
            <div className="flex items-center border border-gray-300 rounded py-2 px-3 bg-gray-100">
              <FaBriefcase className="mr-3 text-gray-500" />
              <input className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none" type="text" placeholder="Business Name" aria-label="Business Name" style={{boxShadow: 'none' }} required />
            </div>
            <div className="flex items-center border border-gray-300 rounded py-2 px-3 bg-gray-100">
              <FaRegIdBadge className="mr-3 text-gray-500" />
              <input className="appearance-none bg-transparent border-none w-full text-gray-700 leading-tight focus:outline-none" type="text" placeholder="Business Registration No" style={{boxShadow: 'none' }} aria-label="Business Registration No" required />
            </div>
            <div className="mt-12">
              <button className="w-full bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupFormBusiness;
