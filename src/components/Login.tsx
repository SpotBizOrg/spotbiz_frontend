import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import login from '../assets/LoginPage.png';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Add your login logic here
    navigate('/customerhome'); 
  };

  return (
    <div className="flex h-screen bg-primary items-center justify-center">
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
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
                Email
              </label>
              <div className="flex items-center shadow appearance-none border rounded w-full py-2 px-3 bg-secondary text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <FaEnvelope className="mr-2" />
                <input
                  id="email"
                  type="email"
                  className="bg-transparent flex-1 focus:outline-none"
                  placeholder="example@gmail.com"
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm mb-2" htmlFor="password">
                Password
              </label>
              <div className="flex items-center shadow appearance-none border rounded w-full py-2 px-3 bg-secondary text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <FaLock className="mr-2" />
                <input
                  id="password"
                  type="password"
                  className="bg-transparent flex-1 focus:outline-none"
                  placeholder="******"
                />
              </div>
            </div>
            <div className="flex items-center justify-between mb-6">
              <button
                className="bg-bluedark hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                type="button"
                onClick={handleLogin}
              >
                LOG IN
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
}

export default LoginPage;
