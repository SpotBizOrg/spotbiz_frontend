import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaBriefcase, FaRegIdBadge, FaLock } from "react-icons/fa";
import Profile from "../assets/profile-picture.png";

const SignupFormBusiness: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessRegNo, setBusinessRegNo] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      navigate("/signup-in-process");
    }
  };

  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};

    if (!name) {
      errors.name = "*Please fill this field";
    }
    if (!email) {
      errors.email = "*Please fill this field";
    } else if (!validateEmail(email)) {
      errors.email = "Invalid email address";
    }
    if (!phone) {
      errors.phone = "*Please fill this field";
    } else if (!validatePhone(phone)) {
      errors.phone = "Phone number must be exactly 10 digits";
    }
    if (!password) {
      errors.password = "*Please fill this field";
    } else if (!validatePassword(password)) {
      errors.password = passwordError;
    }
    if (!businessName) {
      errors.businessName = "*Please fill this field";
    }
    if (!businessRegNo) {
      errors.businessRegNo = "*Please fill this field";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateEmail = (email: string): boolean => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    return /^\d{10}$/.test(phone);
  };

  const validatePassword = (password: string): boolean => {
    const lengthCriteria = password.length >= 8;
    const mixedCaseCriteria = /[a-z]/.test(password) && /[A-Z]/.test(password);
    const numberSymbolCriteria = /\d/.test(password) || /[@$!%*?&]/.test(password);

    let strength = "weak";
    let errorMessage = "";

    if (!lengthCriteria) {
      errorMessage = "Password must be at least 8 characters long.";
    } else if (!mixedCaseCriteria) {
      errorMessage = "Password must include both uppercase and lowercase letters.";
    } else if (!numberSymbolCriteria) {
      errorMessage = "Password must include numbers or symbols.";
    } else {
      strength = "strong";
      errorMessage = "";
    }

    setPasswordError(errorMessage);
    setPasswordStrength(strength);
    return errorMessage === "";
  };

  const getPasswordStrengthColor = (strength: string) => {
    switch (strength) {
      case "strong":
        return "text-green-500";
      case "weak":
      default:
        return "text-red-500";
    }
  };

  return (
    <div className="flex h-screen bg-primary items-center justify-center font-body">
      <div className="bg-customWhite rounded-lg shadow-lg w-full max-w-5xl flex overflow-hidden">
        <div className="w-1/2 flex items-center justify-center p-4">
          <img
            src={Profile}
            alt="Profile"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-10 text-center text-primary">
            Create Your Account
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex items-center bg-gray-200 rounded px-3 py-2">
              <FaUser className="text-gray-500 mr-2" />
              <input
                className="bg-gray-200 appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                id="name"
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ boxShadow: "none" }}
              />
            </div>
            {formErrors.name && <p className="text-sm text-red-500">{formErrors.name}</p>}
            <div className="flex items-center bg-gray-200 rounded px-3 py-2">
              <FaEnvelope className="text-gray-500 mr-2" />
              <input
                className="bg-gray-200 appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                id="email"
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ boxShadow: "none" }}
              />
            </div>
            {formErrors.email && <p className="text-sm text-red-500">{formErrors.email}</p>}
            <div className="flex items-center bg-gray-200 rounded px-3 py-2">
              <FaPhone className="text-gray-500 mr-2" />
              <input
                className="bg-gray-200 appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                id="phone"
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{ boxShadow: "none" }}
              />
            </div>
            {formErrors.phone && <p className="text-sm text-red-500">{formErrors.phone}</p>}
            <div className="flex items-center bg-gray-200 rounded px-3 py-2">
              <FaLock className="text-gray-500 mr-2" />
              <input
                className="bg-gray-200 appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                type="password"
                placeholder="Password"
                style={{ boxShadow: "none" }}
                aria-label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            {formErrors.password && <p className="text-sm text-red-500">{formErrors.password}</p>}
            <div className="flex items-center bg-gray-200 rounded px-3 py-2">
              <FaBriefcase className="text-gray-500 mr-2" />
              <input
                className="bg-gray-200 appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                id="businessName"
                type="text"
                placeholder="Business Name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                style={{ boxShadow: "none" }}
              />
            </div>
            {formErrors.businessName && <p className="text-sm text-red-500">{formErrors.businessName}</p>}
            <div className="flex items-center bg-gray-200 rounded px-3 py-2">
              <FaRegIdBadge className="text-gray-500 mr-2" />
              <input
                className="bg-gray-200 appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                id="businessRegNo"
                type="text"
                placeholder="Business Registration No"
                value={businessRegNo}
                onChange={(e) => setBusinessRegNo(e.target.value)}
                style={{ boxShadow: "none" }}
              />
            </div>
            {formErrors.businessRegNo && <p className="text-sm text-red-500">{formErrors.businessRegNo}</p>}
            <div className="mt-12">
              <button
                className="w-full bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
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
