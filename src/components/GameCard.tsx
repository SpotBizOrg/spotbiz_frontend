import React from 'react';

interface GameCardProps {
  image: string;
  title: string;
  developer: string;
  description: string;
  visits: string;
  url: string; 
  usage: number; 
}

const handleEditClick = () => {
};

const handleDeleteClick = () => {
};

const GameCard: React.FC<GameCardProps> = ({
  image,
  title,
  developer,
  description,
  visits,
  url, 
  usage, 
}) => {
  const handleClick = () => {
    window.location.href = url;
  };

  return (
    <div className="p-4 rounded-lg shadow-md text-white" style={{ background: 'linear-gradient(135deg, #0f52ba, #000000)', boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)' }}>
      <img src={image} alt={title} className="rounded-lg w-full transform transition-transform hover:scale-105 hover:z-10" />
      <h3 className="text-white mt-2">{title}</h3>
      <p className="text-gray-400">@{developer}</p>
      <div className="flex items-center mt-2">
        <span className="text-green-500">{description}</span>
      </div>
      <div className="flex items-center mt-2">
        <span className="text-gray-400 ">Visits: {visits}</span>
      </div>
      <div className="flex mt-4">
        <button
          className={`bg-bluedark text-white py-2 px-4 rounded transform transition-transform hover:scale-105 hover:z-10 flex-grow`}
          onClick={handleClick}
        >
          {usage === 0 ? 'Play' : 'Play Game'}
        </button>
        {usage === 0 && (
          <>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded transform transition-transform hover:scale-105 hover:z-10 ml-2 flex-grow"
              onClick={handleEditClick}
            >
              Edit
            </button>
            <button
              className="bg-red-600 text-white py-2 px-4 rounded transform transition-transform hover:scale-105 hover:z-10 ml-2 flex-grow"
              onClick={handleDeleteClick}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default GameCard;
