import React from "react";
import somethingwentwrong from '../assets/something went wrong.jpg';
import { useNavigate } from 'react-router-dom';

const SomethingWentWrong: React.FC = () => {

    const navigate = useNavigate();


    const handleNavigate = () => {
        if(localStorage.getItem('token')){
            navigate('/home');
        }
        else{
            navigate('/');
        }
    }


  return (
    <div className="flex flex-col items-center justify-center w-2/3">
        <img src={somethingwentwrong} alt="" width={300} className='mb-4'/>
        <h1 className='font-semibold text-4xl mb-12'>Oops! Something went wrong</h1>
        <button 
            className='bg-primary text-white px-4 py-2 rounded-md'
            onClick={() => handleNavigate()}
            >
            Go back
        </button>
    </div>
  );
};

export default SomethingWentWrong;