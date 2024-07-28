import Container from "../components/Container";
import GameCard from '../components/GameCard';
import DropMergetheNumbers from '../assets/game_banner/DropMergetheNumbers.jpg';
import Tag234Players from '../assets/game_banner/Tag234Players.jpg';
import KittyScrambleWordStacks from '../assets/game_banner/KittyScrambleWordStacks.jpg';
import SortParking from '../assets/game_banner/SortParking.jpg';
import CuttheRope from '../assets/game_banner/CuttheRope.jpg';
import CupsWaterSortPuzzle from '../assets/game_banner/CupsWaterSortPuzzle.jpg';
import Adminnavbar from "../components/Adminnavbar";
import { useState } from "react";

const games = [
  {
    image: Tag234Players,
    title: 'Tag 2 3 4 Players',
    developer: 'Jet Games',
    description: 'Hello',
    visits: '11M',
    usage: 1,
    url: 'https://www.crazygames.com/embed/tag-2-3-4-players',
    special: true
  },
  {
    image: KittyScrambleWordStacks,
    title: 'Kitty Scramble: Word Stacks',
    developer: 'Clever Apps',
    description: 'Hello',
    visits: '11M',
    usage: 1,
    url: 'https://www.crazygames.com/embed/kitty-scramble'
  },
  {
    image: CuttheRope,
    title: 'Cut the Rope',
    developer: 'Famobi',
    description: 'Hello',
    visits: '11M',
    usage: 1,
    url: 'https://www.crazygames.com/embed/cut-the-rope-ebx'
  },
  {
    image: CupsWaterSortPuzzle,
    title: 'Cups - Water Sort Puzzle',
    developer: 'Blury Studio',
    description: 'Hello',
    visits: '11M',
    usage: 1,
    url: 'https://www.crazygames.com/embed/cups---water-sort-puzzle'
  },
  {
    image: SortParking,
    title: 'Sort Parking',
    developer: 'Synk',
    description: 'Hello',
    visits: '11M',
    usage: 1,
    url: 'https://www.crazygames.com/embed/sort-parking'
  },
  {
    image: DropMergetheNumbers,
    title: 'Drop & Merge the Numbers',
    developer: 'GMR Bros',
    description: 'Hello',
    visits: '11M',
    usage: 1,
    url: 'https://www.crazygames.com/embed/drop-merge-the-numbers'
  },
  {
    image: SortParking,
    title: 'Sort Parking',
    developer: 'Synk',
    description: 'Hello',
    visits: '11M',
    usage: 1,
    url: 'https://www.crazygames.com/embed/sort-parking'
  },
  {
    image: DropMergetheNumbers,
    title: 'Drop & Merge the Numbers',
    developer: 'GMR Bros',
    description: 'Hello',
    visits: '11M',
    usage: 1,
    url: 'https://www.crazygames.com/embed/drop-merge-the-numbers'
  },
  {
    image: Tag234Players,
    title: 'Tag 2 3 4 Players',
    developer: 'Jet Games',
    description: 'Hello',
    visits: '11M',
    usage: 1,
    url: 'https://www.crazygames.com/embed/tag-2-3-4-players',
    special: true
  },
  {
    image: CuttheRope,
    title: 'Cut the Rope',
    developer: 'Famobi',
    description: 'Hello',
    visits: '11M',
    usage: 1,
    url: 'https://www.crazygames.com/embed/cut-the-rope-ebx'
  },
  {
    image: CupsWaterSortPuzzle,
    title: 'Cups - Water Sort Puzzle',
    developer: 'Blury Studio',
    description: 'Hello',
    visits: '11M',
    usage: 1,
    url: 'https://www.crazygames.com/embed/cups---water-sort-puzzle'
  },
  {
    image: CupsWaterSortPuzzle,
    title: 'Cups - Water Sort Puzzle',
    developer: 'Blury Studio',
    description: 'Hello',
    visits: '11M',
    usage: 1,
    url: 'https://www.crazygames.com/embed/cups---water-sort-puzzle'
  },
  {
    image: DropMergetheNumbers,
    title: 'Drop & Merge the Numbers',
    developer: 'GMR Bros',
    description: 'Hello',
    visits: '11M',
    usage: 1,
    url: 'https://www.crazygames.com/embed/drop-merge-the-numbers'
  },
];

function CustomerGame() {
  const [activeTab, setActiveTab] = useState('featured');
  const featuredGames = games.filter((game, index) => index % 3 === 0);
  const seasonalGames = games.filter((game, index) => index % 3 === 1);
  const alreadyPlayedGames = games.filter((game, index) => index % 3 === 2);

  const getDisplayedGames = () => {
    switch (activeTab) {
      case 'featured':
        return featuredGames;
      case 'seasonal':
        return seasonalGames;
      case 'alreadyPlayed':
        return alreadyPlayedGames;
      default:
        return [];
    }
  };
  return (
    <Container>
      <Adminnavbar />
      <div className="flex flex-col justify-startpt-20 px-16 mt-12 py-4">
        <div className="flex items-center mb-6">
          <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" className="rounded-full w-36 h-36 mr-2" />
          <div>
            <p className="text-black text-xl ml-4">Yuhanga Induwara</p>
            <p className="text-gray-400 ml-4">Points: 95</p>
          </div>
        </div>
        <div className="flex items-center justify-between w-full mb-5 border-b border-gray-300 mb-8">
          <div className="flex space-x-6 ">
            <button
              className={`px-0 py-2 pb-[calc(0.5rem - 4px)] rounded focus:outline-none ${activeTab === 'featured' ? 'text-black border-b-4 border-black' : 'bg-transparent text-blue-500 border-b-4 border-transparent hover:border-b-4 hover:border-gray-300'}`}
              onClick={() => setActiveTab('featured')}
            >
              Featured Games
            </button>
            <button
              className={`px-0 py-2 pb-[calc(0.5rem - 4px)] rounded focus:outline-none ${activeTab === 'seasonal' ? 'text-black border-b-4 border-black' : 'bg-transparent text-blue-500 border-b-4 border-transparent hover:border-b-4 hover:border-gray-300'}`}
              onClick={() => setActiveTab('seasonal')}
            >
              Seasonal Games
            </button>
            <button
              className={`px-0 py-2 pb-[calc(0.5rem - 4px)] rounded focus:outline-none ${activeTab === 'alreadyPlayed' ? 'text-black border-b-4 border-black' : 'bg-transparent text-blue-500 border-b-4 border-transparent hover:border-b-4 hover:border-gray-300'}`}
              onClick={() => setActiveTab('alreadyPlayed')}
            >
              Already Played
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
        </div>
      </div>
    </Container>
  );
}

export default CustomerGame;
