import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Customer from "../assets/signup-image.png";
import { toast } from 'react-toastify';
import { BACKEND_URL } from "../../config";

const SignUpFormCustomer: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const status = "PENDING";
  const role = "CUSTOMER";
  const [loading, setLoading] = useState(false); 

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      setLoading(true);
      performSubmit(); 
    }
  };

  const performSubmit = async () => {
  
    try {
      const response = await fetch(`${BACKEND_URL}/customer/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phoneNo, password, status, role }),
      });
  
      if (!response.ok) {
        if (response.status === 409) {
          setLoading(false);
          throw new Error('A user with the same email already exists!');
        } else {
          setLoading(false);
          throw new Error('Registration failed unexpectadly. Try again!');
        }
      }
      toast.success("Registration successful!");
      setLoading(false);
        setTimeout(() => {
          navigate('/login');
        }, 1000);
    } catch (err) {
      if (err instanceof Error) {
        setLoading(false);
        toast.error(err.message);
      } else {
        setLoading(false);
        toast.error('An unexpected error occurred');
      }
    }
  };  

  const validateForm = (): boolean => {

    if (!name) {
      toast.error("Name can not be empty");
      return false;
    }
    if (!email) {
      toast.error("Email can not be empty");
      return false;
    } else if (!validateEmail(email)) {
      toast.error("Please enter a valid email");
      return false;
    }
    if (!phoneNo) {
      toast.error("Phone number can not be empty");
      return false;
    } else if (!validatePhone(phoneNo)) {
      toast.error("Phone number must be exactly 10 digits");
      return false;
    }
    if (!password) {
      toast.error("Password can not be empty");
      return false;
    } else if(!validatePassword(password)){
      return false;
    }

    return true;
  };

  const validateEmail = (email: string): boolean => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    return /^\d{10}$/.test(phone);
  };

  const validatePassword = (password: string): boolean => {
    let errorMessage = "";
  
    if (password.length < 8) {
      errorMessage = "Password must be at least 8 characters long.";
    } 
    else if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
      errorMessage = "Password must include both uppercase and lowercase letters.";
    } 
    else if (!/\d/.test(password) && !/[@$!%*?&]/.test(password)) {
      errorMessage = "Password must include numbers or symbols.";
    } 
  
    if (errorMessage) {
      toast.error(errorMessage);
      return false;
    }
    
    return true;
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
            <div className="flex items-center bg-gray-200 rounded px-3 py-2">
              <FaPhone className="text-gray-500 mr-2" />
              <input
                className="bg-gray-200 appearance-none border-0 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                id="phone"
                type="text"
                placeholder="Phone Number"
                value={phoneNo}
                onChange={(e) => setPhone(e.target.value)}
                style={{ boxShadow: "none" }}
              />
            </div>
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
            <div className="mt-12">
              <button
                className="w-full bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                {loading ? (
                  <>
                  <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                  </svg>
                  Loading...
                </>
                ) : 'SIGN UP'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpFormCustomer;
