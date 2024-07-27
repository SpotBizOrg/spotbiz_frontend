import React, { useState } from 'react';

const NearMeBtn = () => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div
      onClick={handleClick}
      className={`flex p-2 text-bodysmall rounded-md border px-4 cursor-pointer ${
        isActive ? 'bg-blue1 text-white border-blue-500' : 'bg-white text-black border-gray-300'
      }`}
    >
      Near Me
    </div>
  );
};

export default NearMeBtn;
