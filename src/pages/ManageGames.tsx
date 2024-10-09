import { useEffect, useState } from 'react';
import { Modal, TextInput, Label } from "flowbite-react";
import Adminnavbar from "../components/Adminnavbar";
import Adminsidebar from "../components/Adminsidebar";
import Container from "../components/Container";
import GameCard from '../components/GameCard';
import { FaPlus } from 'react-icons/fa';

function ManageGames() {
  useEffect(() => {
    document.title = "SpotBiz | Games | Admin";
    fetchNormalGames();
    fetchSeasonalGames();
  }, []);

  interface Game {
    image: File | null;
    title: string;
    type: string;
    developer: string;
    description: string;
    url: string;
  }

  interface Game_display {
    imageUrl: string;
    gameName: string;
    type: string;
    developer: string;
    description: string;
    gameUrl: string;
  }

  const [activeTab, setActiveTab] = useState('normal');
  const [showForm, setShowForm] = useState(false);
  const [newGame, setNewGame] = useState<Game>({
    image: null,
    title: '',
    type: '',
    developer: '',
    description: '',
    url: ''
  });
  const [imagePreview, setImagePreview] = useState<string>('');

  const [normalGames, setNormalGames] = useState<Game_display>({
    imageUrl: '',
    gameName: '',
    type: '',
    developer: '',
    description: '',
    gameUrl: ''
  });
  const [seasonalGames, setSeasonalGames] = useState<Game_display>({
    imageUrl: '',
    gameName: '',
    type: '',
    developer: '',
    description: '',
    gameUrl: ''
  });

  const fetchNormalGames = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/game/all_games/REGULAR");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setNormalGames(data);
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred while fetching normal games. Please try again later.');
    }
  };

  const fetchSeasonalGames = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/game/all_games/SEASONAL");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSeasonalGames(data);
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred while fetching seasonal games. Please try again later.');
    }
  };

  const getDisplayedGames = (): Game_display[] => {
    switch (activeTab) {
      case 'seasonal':
        console.log(seasonalGames)
        return Array.isArray(seasonalGames) ? seasonalGames : [seasonalGames];
      case 'normal':
        return Array.isArray(normalGames) ? normalGames : [normalGames];
      default:
        return [];
    }
  };
  

  const handleImageUpload = async (imageFile: string | Blob) => {
    const formData = new FormData();
    formData.append('file', imageFile);
  
    try {
      const response = await fetch('http://localhost:8080/api/v1/upload_image', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error uploading image:', errorData);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
      }
  
      const imageUrl = await response.text();
      console.log('Image URL:', imageUrl);
      return imageUrl;
    } catch (error) {
      console.error('An error occurred during image upload:', error);
      throw error;
    }
  };  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setNewGame(prevState => ({ ...prevState, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddGame = async () => {
    try {
      let imageUrl = "";
  
      if (newGame.image) {
        imageUrl = await handleImageUpload(newGame.image);
      }
  
      const gameData = {
        gameName: newGame.title,
        gameType: newGame.type,
        developer: newGame.developer,
        description: newGame.description,
        gameUrl: newGame.url,
        imageUrl: imageUrl, 
      };
      
      console.log(gameData)
      const response = await fetch('http://localhost:8080/api/v1/game/insert_game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
      }
  
      const responseData = await response.json();
      console.log('Success:', responseData);
      setShowForm(false); 
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred while saving game progress. Please try again later.');
    }
  };
  
  

  return (
    <Container>
      <Adminnavbar />
      <Adminsidebar selectedTile="Games" />

      <div className="px-12 sm:ml-64 mt-20">
        <div className="w-fit mb-5 border-b-gray-900">
          <h1 className="text-subsubheading text-bluedark">Games</h1>
        </div>
        <div className="flex items-center justify-between w-full mb-5 border-b border-gray-300">
          <div className="flex space-x-6">
            <button
              className={`px-0 py-2 pb-[calc(0.5rem - 4px)] rounded focus:outline-none ${activeTab === 'normal' ? 'text-black border-b-4 border-black' : 'bg-transparent text-blue-500 border-b-4 border-transparent hover:border-b-4 hover:border-gray-300'}`}
              onClick={() => setActiveTab('normal')}
            >
              Regular Games
            </button>
            <button
              className={`px-0 py-2 pb-[calc(0.5rem - 4px)] rounded focus:outline-none ${activeTab === 'seasonal' ? 'text-black border-b-4 border-black' : 'bg-transparent text-blue-500 border-b-4 border-transparent hover:border-b-4 hover:border-gray-300'}`}
              onClick={() => setActiveTab('seasonal')}
            >
              Seasonal Games
            </button>
          </div>
          <div className="flex items-center space-x-2 mb-1">
            <div className="relative w-full max-w-xs">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none p-0">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input type="text" id="simple-search" className="bg-gray-50 border p-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for games..." required />
            </div>
            <button type="submit" className="p-2 text-sm font-medium text-white bg-bluedark rounded-lg border border-bluedark hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row w-full overflow-x-auto overflow-y-hidden h-full space-x-4 scrollbar-hide">
            {getDisplayedGames().map((game, index) => (
              <div key={index} className="min-w-[270px] max-w-[270px]">
                <GameCard 
                  image={game.imageUrl}  
                  title={game.gameName}
                  developer={game.developer}
                  description={game.description}
                  gameUrl={game.gameUrl}
                  usage={0}
                />
              </div>
            ))}
          </div>

          <div 
            className="relative flex items-center justify-center w-[1130px] h-[94px] mt-5 border-2 border-dashed border-gray-400 rounded-lg bg-white/50 backdrop-blur-md hover:bg-white/80 hover:border-gray-600 transition-all duration-300 cursor-pointer"
            onClick={() => setShowForm(true)}
          >
            <FaPlus className="text-3xl text-gray-500" />
          </div>
        </div>

        <Modal show={showForm} onClose={() => setShowForm(false)} size="lg">
          <Modal.Header>Add New Game</Modal.Header>
          <Modal.Body>
            <div className="flex flex-wrap space-x-4 space-y-4">
              <div className="flex-1 min-w-[200px]">
                <Label htmlFor="gameTitle" value="Title" />
                <TextInput
                  id="gameTitle"
                  placeholder="Game Title"
                  onChange={(e) => setNewGame({ ...newGame, title: e.target.value })}
                />
              </div>

              <div className="flex-1 min-w-[200px]">
                <Label htmlFor="gameType" value="Type" />
                <select
                  id="gameType"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={(e) => setNewGame({ ...newGame, type: e.target.value })}
                >
                  <option value="">Select Type</option>
                  <option value="SEASONAL">SEASONAL</option>
                  <option value="REGULAR">REGULAR</option>
                </select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <Label htmlFor="gameDeveloper" value="Developer" />
                <TextInput
                  id="gameDeveloper"
                  placeholder="Game Developer"
                  onChange={(e) => setNewGame({ ...newGame, developer: e.target.value })}
                />
              </div>

              <div className="flex-1 min-w-[200px]">
                <Label htmlFor="gameDescription" value="Description" />
                <TextInput
                  id="gameDescription"
                  placeholder="Game Description"
                  onChange={(e) => setNewGame({ ...newGame, description: e.target.value })}
                />
              </div>

              <div className="flex-1 min-w-[200px]">
                <Label htmlFor="gameUrl" value="URL" />
                <TextInput
                  id="gameUrl"
                  placeholder="Game URL"
                  onChange={(e) => setNewGame({ ...newGame, url: e.target.value })}
                />
              </div>

              <div className="flex-1 min-w-[200px]">
                <Label htmlFor="gameImage" value="Game Image" />
                <input
                  id="gameImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Image Preview"
                    className="w-24 h-24 object-cover mt-2 border border-gray-300 rounded"
                  />
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="px-4 py-2 text-white bg-bluedark rounded hover:bg-blue-600"
              onClick={handleAddGame}
            >
              Add Game
            </button>
          </Modal.Footer>
        </Modal>

      </div>
    </Container>
  );
}

export default ManageGames;


