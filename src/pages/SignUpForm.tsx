import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Customer from "../assets/signup-image.png";

const SignUpFormCustomer: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      navigate("/customerhome");
    }
  };

  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};

    if (!name) {
      setFormErrors({ name: "*Please fill this field" });
      return false;
    }
    if (!email) {
      setFormErrors({ email: "*Please fill this field" });
      return false;
    } else if (!validateEmail(email)) {
      setFormErrors({ email: "Invalid email address" });
      return false;
    }
    if (!phone) {
      setFormErrors({ phone: "*Please fill this field" });
      return false;
    } else if (!validatePhone(phone)) {
      setFormErrors({ phone: "Phone number must be 10 digits" });
      return false;
    }
    if (!password) {
      setFormErrors({ password: "*Please fill this field" });
      return false;
    } else if (!validatePassword(password)) {
      setFormErrors({ password: passwordError });
      return false;
    }

    setFormErrors({});
    return true;
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
    const numberSymbolCriteria =
      /\d/.test(password) || /[@$!%*?&]/.test(password);

    let strength = "weak";
    let errorMessage = "";

    if (!lengthCriteria) {
      errorMessage = "Password must be at least 8 characters long.";
    } else if (!mixedCaseCriteria) {
      errorMessage =
        "Password must include both uppercase and lowercase letters.";
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
      <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl flex overflow-hidden">
        <div className="w-1/2 flex items-center justify-center p-4">
          <img
            src={Customer}
            alt="Signup"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-10 text-center text-primary">
            Create Your Account
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex items-center bg-gray-200 rounded px-3 py-2">
              <FaUser className="text-gray-500 mr-2" />
              <input
                className="bg-gray-200 appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                id="name"
                type="text"
                placeholder="Full Name"
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
                placeholder="Email"
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

export default SignUpFormCustomer;
