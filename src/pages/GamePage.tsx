import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AdComponent from '../components/AdComponent';
import { format } from 'date-fns';

interface LocationState {
  gameUrl: string;
  startTime: string;
}

const GamePage: React.FC = () => {
  const location = useLocation();
  const { gameUrl, startTime } = location.state as LocationState;
  const [showAd, setShowAd] = useState(true);

  useEffect(() => {
    const startTimestamp = new Date(startTime);
    console.log(gameUrl)
    document.body.style.overflow = 'hidden';

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const endTimestamp = new Date();
      const duration = (endTimestamp.getTime() - startTimestamp.getTime()) / 1000; 
      sendGameStatsToBackend('1', '2', startTimestamp, duration, 23.4); 
      event.preventDefault();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.body.style.overflow = 'auto';
      
      const endTimestamp = new Date();
      const duration = (endTimestamp.getTime() - startTimestamp.getTime()) / 1000; 
      sendGameStatsToBackend('1', '2', startTimestamp, duration, 25.6); 
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [startTime]);

  const sendGameStatsToBackend = async (userId: string, gameId: string, startDate: Date, duration: number, points: number) => {
    if(duration <= 10){
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/api/v1/game_progress/save_progress', {
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
  
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred while saving game progress. Please try again later.');
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
    </div>
  );
};

export default GamePage;
