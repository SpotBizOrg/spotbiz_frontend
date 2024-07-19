import React from 'react';
import logo from '../assets/logo.png';

const SignupInProgress: React.FC = () => {
  return (
    <div className="flex h-screen bg-primary items-center justify-center font-body">
      <div className="m-auto bg-white rounded-lg shadow-lg w-full max-w-3xl p-16 text-left">
        <img src={logo} alt="SpotBiz" className="h-16 mx-auto mb-8" />
        <h2 className="text-3xl font-bold mb-6 text-primary">Sign-Up in Progress</h2>
        <p className="text-gray-700 mb-6 text-lg text-primary">Thank you for signing up!</p>
        <p className="text-gray-700 mb-6 text-lg text-primary">
          Your details are currently under review by our admin team. This process ensures that all information is accurate and up-to-date. You will receive a confirmation email once your account has been approved.
        </p>
        <p className="text-gray-700 text-lg text-primary">We appreciate your patience and look forward to welcoming you to our community!</p>
      </div>
    </div>
  );
}

export default SignupInProgress;
