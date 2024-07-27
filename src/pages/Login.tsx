import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import login from '../assets/LoginPage.png';
import { toast } from 'react-toastify';
import { useAuth } from '../utils/AuthProvider';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const { localSave, checkAuthenticated, logout } = useAuth();
  
  const handleLogin = () => {
    if (validateForm()) {
      setLoading(true);
      performLogin();
    }
  };
  checkAuthenticated();

  const performLogin = async () => {
  
    try {
      const response = await fetch('http://localhost:8080/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        if(response.status === 401){
          throw new Error('Your password is incorrect!');
        }
        else if(response.status === 404){
          throw new Error('This email is not registered with the system!');
        }
      }
  
      const data = await response.json();
  
      if (data.status === 'APPROVED' && data.role === 'CUSTOMER') {
        localSave(data);
        toast.success("Login successful!");
        setTimeout(() => {
          navigate('/customerhome');
        }, 1000);
      } else {
        toast.error('Login not approved or incorrect role');
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setLoading(false); 
    }
  };

  const validateForm = (): boolean => {
    if (!email) {
      toast.error('Email is required');
      return false;
    }
    if (!validateEmail(email)) {
      toast.error('Invalid email address');
      return false;
    }
    if (!password) {
      toast.error('Password is required');
      return false;
    }
    return true;
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="flex h-screen bg-primary items-center justify-center font-body">
      <div className="bg-customWhite rounded-lg shadow-lg w-full max-w-5xl flex overflow-hidden">
        <div className="w-1/2 flex items-center justify-center p-4">
          <img
            src={login}
            alt="Shaking hands"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="w-1/2 flex flex-col justify-center p-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Welcome Back!</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
                Email
              </label>
              <div className="flex items-center rounded w-full py-2 px-3 bg-secondary text-gray-700 leading-tight">
                <FaEnvelope className="mr-2" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent flex-1 focus:outline-none border-0"
                  placeholder="example@gmail.com"
                  style={{ boxShadow: 'none' }}
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm mb-2" htmlFor="password">
                Password
              </label>
              <div className="flex items-center rounded w-full py-2 px-3 bg-secondary text-gray-700 leading-tight">
                <FaLock className="mr-2" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent flex-1 focus:outline-none border-0"
                  placeholder="******"
                  style={{ boxShadow: 'none' }}
                />
              </div>
            </div>
            <div className="flex items-center justify-between mb-6">
              <button
                className="bg-bluedark hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none w-full"
                type="button"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <>
                  <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                  </svg>
                  Loading...
                </>
                ) : 'LOG IN'}
              </button>
            </div>
            <div className="mb-4 text-right">
              <a className="inline-block text-sm text-bluedark hover:text-blue-800" href="#">
                Forgot Password?
              </a>
            </div>
            <p className="text-center text-gray-500 text-sm">
              Don’t you have an account? <Link to="/register" className="text-bluedark font-bold">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
