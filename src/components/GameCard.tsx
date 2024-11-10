import React from "react";
import { useNavigate } from "react-router-dom";

interface GameCardProps {
  gameId: string;
  image: string;
  title: string;
  developer: string;
  description: string;
  gameUrl: string;
  usage: number;
  onEdit: () => void;
  onDelete: () => void;
}

const GameCard: React.FC<GameCardProps> = ({
  gameId,
  image,
  title,
  developer,
  description,
  gameUrl,
  usage,
  onEdit,
  onDelete,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const startTime = new Date().toISOString();
    navigate("/customer/play_game", {
      state: { gameId, gameUrl, startTime, title },
    });
  };

  return (
    <div
      className="p-4 rounded-lg shadow-md text-white"
      style={{
        background: "linear-gradient(135deg, #0f52ba, #000000)",
        boxShadow: "0 0 10px rgba(0, 255, 255, 0.5)",
      }}
    >
      <img
        src={image}
        alt={title}
        className="rounded-lg w-full transform transition-transform hover:scale-105 hover:z-10"
      />
      <h3 className="text-white mt-2">{title}</h3>
      <p className="text-gray-400">@{developer}</p>
      <div className="flex items-center mt-2">
        <span className="text-green-500">{description}</span>
      </div>
      <div className="flex mt-4">
        <button
          className={`bg-bluedark text-white py-2 px-4 rounded transform transition-transform hover:scale-105 hover:z-10 flex-grow`}
          onClick={handleClick}
        >
          {usage === 0 ? "Play" : "Play Game"}
        </button>
        {usage === 0 && (
          <>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded transform transition-transform hover:scale-105 hover:z-10 ml-2 flex-grow"
              onClick={onEdit}
            >
              Edit
            </button>
            <button
              className="bg-red-600 text-white py-2 px-4 rounded transform transition-transform hover:scale-105 hover:z-10 ml-2 flex-grow"
              onClick={onDelete}
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
