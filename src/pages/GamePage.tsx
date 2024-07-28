import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AdComponent from '../components/AdComponent';

const GamePage: React.FC = () => {
  const location = useLocation();
  const { url } = location.state;
  const [showAd, setShowAd] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleCloseAd = () => {
    setShowAd(false);
  };

  return (
    <div className="game-page relative bg-white">
      {showAd && <AdComponent onClose={handleCloseAd} />}
      <iframe
        src={url}
        title="Game"
        width="100%"
        height="800px"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default GamePage;
