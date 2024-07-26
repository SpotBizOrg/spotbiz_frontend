import React from 'react';

interface GameCardProps {
  image: string;
  title: string;
  nickname: string;
  rating: number;
  votes: number;
  onlineCount: number;
  visits: string;
  url: string; 
}

const GameCard: React.FC<GameCardProps> = ({
  image,
  title,
  nickname,
  rating,
  votes,
  onlineCount,
  visits,
  url, 
}) => {
  const handleClick = () => {
    window.location.href = url;
  };

  return (
    <div className="p-4 rounded-lg shadow-md text-white" style={{ background: 'linear-gradient(135deg, #00f260, #0575e6)', boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)' }}>
      <img src={image} alt={title} className="rounded-lg w-full transform transition-transform hover:scale-105 hover:z-10" />
      <h3 className="text-black mt-2">{title}</h3>
      <p className="text-gray-400">@{nickname}</p>
      <div className="flex items-center mt-2">
        <span className="text-green-500">{rating}%</span>
        <span className="text-gray-400 ml-1">({votes} Votes)</span>
      </div>
      <div className="flex items-center mt-2">
        <span className="text-yellow-500">Online: {onlineCount}</span>
        <span className="text-gray-400 ml-1">Visits: {visits}</span>
      </div>
      <button
        className="bg-bluedark text-white mt-4 py-2 px-4 rounded transform transition-transform hover:scale-105 hover:z-10"
        onClick={handleClick}
      >
        Play Game
      </button>
    </div>
  );
};

export default GameCard;
