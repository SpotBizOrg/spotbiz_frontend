import { useState } from 'react';
import Adminnavbar from "../components/Adminnavbar";
import Adminsidebar from "../components/Adminsidebar";
import Container from "../components/Container";
import GameCard from '../components/GameCard';
import { FaPlus } from 'react-icons/fa';
import DropMergetheNumbers from '../assets/game_banner/DropMergetheNumbers.jpg';
import Tag234Players from '../assets/game_banner/Tag234Players.jpg';
import KittyScrambleWordStacks from '../assets/game_banner/KittyScrambleWordStacks.jpg';
import SortParking from '../assets/game_banner/SortParking.jpg';
import CuttheRope from '../assets/game_banner/CuttheRope.jpg';
import CupsWaterSortPuzzle from '../assets/game_banner/CupsWaterSortPuzzle.jpg';

function ManageGames() {
  const [activeTab, setActiveTab] = useState('seasonal');

  const games = [
    {
      image: Tag234Players,
      title: 'Tag 2 3 4 Players',
      Developer: 'Jet Games',
      description: 'Hello',
      visits: '11M',
      usage: 0,
      url: 'https://www.crazygames.com/embed/tag-2-3-4-players'
    },
    {
      image: KittyScrambleWordStacks,
      title: 'Kitty Scramble: Word Stacks',
      Developer: 'Clever Apps',
      description: 'Hello',
      visits: '11M',
      usage: 0,
      url: 'https://www.crazygames.com/embed/kitty-scramble'
    },
    {
      image: CuttheRope,
      title: 'Cut the Rope',
      Developer: 'Famobi',
      description: 'Hello',
      visits: '11M',
      usage: 0,
      url: 'https://www.crazygames.com/embed/cut-the-rope-ebx'
    },
    {
      image: CupsWaterSortPuzzle,
      title: 'Cups - Water Sort Puzzle',
      Developer: 'Blury Studio',
      description: 'Hello',
      visits: '11M',
      usage: 0,
      url: 'https://www.crazygames.com/embed/cups---water-sort-puzzle'
    },
    {
      image: SortParking,
      title: 'Sort Parking',
      Developer: 'Synk',
      description: 'Hello',
      visits: '11M',
      usage: 0,
      url: 'https://www.crazygames.com/embed/sort-parking'
    },
    {
      image: DropMergetheNumbers,
      title: 'Drop & Merge the Numbers',
      Developer: 'GMR Bros',
      description: 'Hello',
      visits: '11M',
      usage: 0,
      url: 'https://www.crazygames.com/embed/drop-merge-the-numbers'
    },
    {
      image: Tag234Players,
      title: 'Tag 2 3 4 Players',
      Developer: 'Jet Games',
      description: 'Hello',
      visits: '11M',
      usage: 0,
      url: 'https://www.crazygames.com/embed/tag-2-3-4-players'
    },
    {
      image: KittyScrambleWordStacks,
      title: 'Kitty Scramble: Word Stacks',
      Developer: 'Clever Apps',
      description: 'Hello',
      visits: '11M',
      usage: 0,
      url: 'https://www.crazygames.com/embed/kitty-scramble'
    },
    {
      image: CuttheRope,
      title: 'Cut the Rope',
      Developer: 'Famobi',
      description: 'Hello',
      visits: '11M',
      usage: 0,
      url: 'https://www.crazygames.com/embed/cut-the-rope-ebx'
    },
    {
      image: CupsWaterSortPuzzle,
      title: 'Cups - Water Sort Puzzle',
      Developer: 'Blury Studio',
      description: 'Hello',
      visits: '11M',
      usage: 0,
      url: 'https://www.crazygames.com/embed/cups---water-sort-puzzle'
    },
    {
      image: SortParking,
      title: 'Sort Parking',
      Developer: 'Synk',
      description: 'Hello',
      visits: '11M',
      usage: 0,
      url: 'https://www.crazygames.com/embed/sort-parking'
    },
    {
      image: DropMergetheNumbers,
      title: 'Drop & Merge the Numbers',
      Developer: 'GMR Bros',
      description: 'Hello',
      visits: '11M',
      usage: 0,
      url: 'https://www.crazygames.com/embed/drop-merge-the-numbers'
    },
    {
      image: SortParking,
      title: 'Sort Parking',
      Developer: 'Synk',
      description: 'Hello',
      visits: '11M',
      usage: 0,
      url: 'https://www.crazygames.com/embed/sort-parking'
    },
    {
      image: DropMergetheNumbers,
      title: 'Drop & Merge the Numbers',
      Developer: 'GMR Bros',
      description: 'Hello',
      visits: '11M',
      usage: 0,
      url: 'https://www.crazygames.com/embed/drop-merge-the-numbers'
    },
  ];

  const seasonalGames = games.filter((game, index) => index % 3 === 0);
  const normalGames = games.filter((game, index) => index % 3 === 1);
  const businessGames = games.filter((game, index) => index % 3 === 2);

  const getDisplayedGames = () => {
    switch (activeTab) {
      case 'seasonal':
        return seasonalGames;
      case 'normal':
        return normalGames;
      case 'business':
        return businessGames;
      default:
        return [];
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
              className={`px-0 py-2 pb-[calc(0.5rem - 4px)] rounded focus:outline-none ${activeTab === 'seasonal' ? 'text-black border-b-4 border-black' : 'bg-transparent text-blue-500 border-b-4 border-transparent hover:border-b-4 hover:border-gray-300'}`}
              onClick={() => setActiveTab('seasonal')}
            >
              Seasonal Games
            </button>
            <button
              className={`px-0 py-2 pb-[calc(0.5rem - 4px)] rounded focus:outline-none ${activeTab === 'normal' ? 'text-black border-b-4 border-black' : 'bg-transparent text-blue-500 border-b-4 border-transparent hover:border-b-4 hover:border-gray-300'}`}
              onClick={() => setActiveTab('normal')}
            >
              Normal Games
            </button>
            <button
              className={`px-0 py-2 pb-[calc(0.5rem - 4px)] rounded focus:outline-none ${activeTab === 'business' ? 'text-black border-b-4 border-black' : 'bg-transparent text-blue-500 border-b-4 border-transparent hover:border-b-4 hover:border-gray-300'}`}
              onClick={() => setActiveTab('business')}
            >
              Business Games
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
                <GameCard {...game} />
              </div>
            ))}
          </div>

          <div className="relative flex items-center justify-center w-[1130px] h-[94px] mt-5 border-2 border-dashed border-gray-400 rounded-lg bg-white/50 backdrop-blur-md hover:bg-white/80 hover:border-gray-600 transition-all duration-300 ease-in-out">
            <FaPlus className="text-4xl text-gray-500" />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ManageGames;
