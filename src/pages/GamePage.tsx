import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AdComponent from '../components/AdComponent';
import { format } from 'date-fns';
import { useAuth } from '../utils/AuthProvider';
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../../config';
import { Modal, Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from 'react-icons/hi';

interface LocationState {
  gameId: string;
  gameUrl: string;
  startTime: string;
  title: string;
}

const GamePage: React.FC = () => {
  const location = useLocation();
  const { gameId, gameUrl, startTime, title } = location.state as LocationState;
  const [showAd, setShowAd] = useState(true);
  const { user, checkAuthenticated, login } = useAuth();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const userId = user?.user_id;

  useEffect(() => {
    document.title = title;
    if(!checkAuthenticated()){
      login();
    }
  }, []);

  useEffect(() => {
    const startTimestamp = new Date(startTime);
    console.log(gameUrl)
    document.body.style.overflow = 'hidden';

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const endTimestamp = new Date();
      const duration = (endTimestamp.getTime() - startTimestamp.getTime()) / 1000; 
      sendGameStatsToBackend(startTimestamp, duration); 
      event.preventDefault();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.body.style.overflow = 'auto';      
      const endTimestamp = new Date();
      const duration = (endTimestamp.getTime() - startTimestamp.getTime()) / 1000; 
      sendGameStatsToBackend(startTimestamp, duration); 
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [startTime]);

  const sendGameStatsToBackend = async (startDate: Date, duration: number) => {
 
    if(duration <= 10){
      return;
    }

    const points = Math.floor(Math.pow(duration / 3000, 1.5));  

    if(points <= 0){
      return;
    }
    
    try {
      const response = await fetch(`${BACKEND_URL}/game_progress/save_progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          gameId,
          dateTime: format(startDate, "yyyy-MM-dd'T'HH:mm:ss.SSSX"),
          duration,
          points,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
      }
  
      const responseData = await response.json();
      console.log('Success:', responseData);
      if(points > 0){
        toast.success(`Congratulations🥳 You earned ${points} points!`);
      }
  
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleCloseAd = () => {
    setShowAd(false);
  };

  return (
    <div className="game-page relative bg-white">
      {showAd && <AdComponent onClose={handleCloseAd} />}
      <iframe
        src={gameUrl}
        title="Game"
        width="100%"
        height="800px"
        allowFullScreen
      ></iframe>

      {isModelOpen && (
        <Modal show={isModelOpen} onClose={() => setIsModelOpen(false)} popup className="flex items-center justify-center inset-2/4 inset-y-1/2 z-40" theme={{
            content: {
              base: "bg-white w-3/4 rounded-lg",
              inner: "p-6 rounded-lg shadow-lg",
            },
          }}>
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to get this action?
              </h3>
              <div className="flex justify-center gap-4 pb-6">
                <Button className="bg-red-600 hover:bg-red-700">
                  Yes, I'm sure
                </Button>
                <Button className="bg-gray-500 hover:bg-gray-600" onClick={() => setIsModelOpen(false)}>
                  Continue Playing
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default GamePage;
