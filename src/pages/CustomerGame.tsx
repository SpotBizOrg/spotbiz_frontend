import Container from "../components/Container";
import GameCard from '../components/GameCard';
import { useEffect, useState } from "react";
import Customernavbar2 from "../components/Customernavbar2";
import { toast } from 'react-toastify';
import { BACKEND_URL } from '../../config';
import { HashLoader } from 'react-spinners';
import { useAuth } from '../utils/AuthProvider';

interface Game_display {
  gameId: string;
  imageUrl: string;
  gameName: string;
  gameType: string;
  developer: string;
  description: string;
  gameUrl: string;
}

function CustomerGame() {

  useEffect(() => {
    document.title = "SpotBiz | Games | Admin";
    fetchRegularGames();
    fetchSeasonalGames();
    // fetchPlayedGames();
    if(!checkAuthenticated()){
      login();
    }
  }, []);

  const { user, checkAuthenticated, login } = useAuth();
  const userId = user?.user_id;
  const [activeTab, setActiveTab] = useState('played');
  const [regularGames, setRegularGames] = useState<Game_display[]>([]);
  const [seasonalGames, setSeasonalGames] = useState<Game_display[]>([]);
  const [playedGames, setPlayedGames] = useState<Game_display[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchRegularGames = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/game/all_games/REGULAR`);
      if (response.status == 404) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (!response.ok) {
        toast.error('An unexpected error occurred');
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRegularGames(data);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const fetchSeasonalGames = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/game/all_games/SEASONAL`);
      if (response.status == 404) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (!response.ok) {
        toast.error('An unexpected error occurred');
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSeasonalGames(data);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };   

  const fetchPlayedGames = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/game/played_games/${userId}`);
      if (response.status == 404) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (!response.ok) {
        toast.error('An unexpected error occurred');
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setPlayedGames(data);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };   

  const getDisplayedGames = (): Game_display[] => {
    switch (activeTab) {
      case 'seasonal':
        return Array.isArray(seasonalGames) ? seasonalGames : [seasonalGames];
      case 'regular':
        return Array.isArray(regularGames) ? regularGames : [regularGames];
      case 'played':
        return Array.isArray(playedGames) ? playedGames : [playedGames];
      default:
        return [];
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
        setSearchQuery(query);

    if(activeTab === 'seasonal'){
      const filteredSeasonalGames = seasonalGames.filter((game) =>
        game.gameName.toLowerCase().includes(query)
      );

      setSeasonalGames(filteredSeasonalGames);
    } else if(activeTab === 'regular'){
      const filteredRegularGames = regularGames.filter((game) =>
        game.gameName.toLowerCase().includes(query)
      );

      setRegularGames(filteredRegularGames);
    }
  };

  const handleBackspace = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      fetchRegularGames();
      fetchSeasonalGames();
    }
  };

  const handleButtonClick = () => {}; 

  const displayedGames = getDisplayedGames();

  return (
    <Container>
      <Customernavbar2 />
      <div className="flex flex-col justify-startpt-20 px-16 mt-12 py-4">
        <div className="flex items-center mb-6 ">
          <img className="ring-offset-2 ring h-40 w-40 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" />
          <div>
            <p className="text-black text-xl ml-4">Shalini</p>
            <p className="text-gray-400 ml-4">Points: 95</p>
          </div>
        </div>
        <div className="flex items-center justify-between w-full mb-5 border-b border-gray-300 mb-8">
          <div className="flex space-x-6 ">
            <button
              className={`px-0 py-2 pb-[calc(0.5rem - 4px)] rounded focus:outline-none ${activeTab === 'played' ? 'text-black border-b-4 border-black' : 'bg-transparent text-blue-500 border-b-4 border-transparent hover:border-b-4 hover:border-gray-300'}`}
              onClick={() => setActiveTab('played')}
            >
              Already Played
            </button>
            <button
              className={`px-0 py-2 pb-[calc(0.5rem - 4px)] rounded focus:outline-none ${activeTab === 'regular' ? 'text-black border-b-4 border-black' : 'bg-transparent text-blue-500 border-b-4 border-transparent hover:border-b-4 hover:border-gray-300'}`}
              onClick={() => setActiveTab('regular')}
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
              <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border p-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={`Search for ${activeTab} games...`}
                  value={searchQuery}
                  onChange={handleSearch}
                  onKeyDown={handleBackspace} 
                  required
              />
            </div>
            <button 
                type="button" 
                className="p-2 text-sm font-medium text-white bg-bluedark rounded-lg border border-bluedark hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleButtonClick} 
            >
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row w-full overflow-x-auto overflow-y-hidden h-full space-x-4 scrollbar-hide">
          {displayedGames.length === 0 || displayedGames[0]?.gameId === '' || displayedGames[0]?.gameId === null ? (
          <div className="text-center text-gray-500">
            { activeTab === 'seasonal' ? 'No seasonal games available.' : activeTab === 'regular' ? 'No regular games available.' : activeTab === 'played' ? 'No played games available. Try playing some games 🤗' : null }
            </div>
          ) : (
            displayedGames.map((game, index) => (
              <div key={index} className="min-w-[270px] max-w-[270px]">
                <GameCard
                  gameId={game.gameId}
                  image={game.imageUrl}  
                  title={game.gameName}
                  developer={game.developer}
                  description={game.description}
                  gameUrl={game.gameUrl}
                  usage={1}
                  onDelete={() => {}}
                  onEdit={() => {}}
                />
              </div>
            ))
          )}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default CustomerGame;
