import Adminnavbar from "../components/Adminnavbar";
import Adminsidebar from "../components/Adminsidebar";
import Container from "../components/Container";
import GameCard from '../components/GameCard';
import ManRunner2048 from '../assets/game_banner/ManRunner2048.jpg';
import Tag234Players from '../assets/game_banner/Tag234Players.jpg';
import KittyScrambleWordStacks from '../assets/game_banner/KittyScrambleWordStacks.jpg';
import Bonkio from '../assets/game_banner/Bonkio.png';
import CuttheRope from '../assets/game_banner/CuttheRope.jpg';
import CupsWaterSortPuzzle from '../assets/game_banner/CupsWaterSortPuzzle.jpg';
import { FaPlus } from 'react-icons/fa';

function ManageGames() {
  const games = [
    {
      image: ManRunner2048,
      title: 'Man Runner 2048',
      nickname: 'Nickname',
      rating: 96,
      votes: 873,
      onlineCount: 1858,
      visits: '11M',
      url: 'https://games.crazygames.com/en_US/man-runner-2048'
    },
    {
      image: Tag234Players,
      title: 'Tag 2 3 4 Players',
      nickname: 'Nickname',
      rating: 96,
      votes: 873,
      onlineCount: 1858,
      visits: '11M',
      url: 'https://www.crazygames.com/embed/tag-2-3-4-players'
    },
    {
      image: KittyScrambleWordStacks,
      title: 'Kitty Scramble: Word Stacks',
      nickname: 'Nickname',
      rating: 96,
      votes: 873,
      onlineCount: 1858,
      visits: '11M',
      url: 'https://www.crazygames.com/embed/kitty-scramble'
    },
    {
      image: CuttheRope,
      title: 'Cut the Rope',
      nickname: 'Nickname',
      rating: 96,
      votes: 873,
      onlineCount: 1858,
      visits: '11M',
      url: 'https://www.crazygames.com/embed/cut-the-rope-ebx'
    },
    {
      image: CupsWaterSortPuzzle,
      title: 'Cups - Water Sort Puzzle',
      nickname: 'Nickname',
      rating: 96,
      votes: 873,
      onlineCount: 1858,
      visits: '11M',
      url: 'https://www.crazygames.com/embed/cups---water-sort-puzzle'
    },
    {
      image: Bonkio,
      title: 'Bonk.io',
      nickname: 'Nickname',
      rating: 96,
      votes: 873,
      onlineCount: 1858,
      visits: '11M',
      url: 'https://www.crazygames.com/embed/bonkio'
    },
  ];

  return (
    <Container>
      <Adminnavbar />
      <Adminsidebar selectedTile="Games" />

      <div className="px-12 sm:ml-64 mt-20">
        <div className="flex flex-row items-center justify-between w-full mb-10 border-b-gray-900">
          <h1 className="text-subsubheading text-bluedark">Games</h1>
          <div className="flex items-center space-x-2">
            <div className="relative w-full max-w-xs">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none p-0">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input type="text" id="simple-search" className="bg-gray-50 border p-1 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for games..." required />
            </div>
            <button type="submit" className="p-2 text-sm font-medium text-white bg-bluedark rounded-lg border border-bluedark hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-start items-center">
          <div className="flex flex-row mt-4 w-full overflow-x-auto overflow-y-hidden h-full space-x-4 scrollbar-hide mt-8">
            {games.map((game, index) => (
              <div key={index} className="min-w-[280px] max-w-[280px]">
                <GameCard {...game} />
              </div>
            ))}
          </div>

          <div className="relative flex items-center justify-center w-[1140px] h-[94px] mt-8 border-2 border-dashed border-gray-400 rounded-lg bg-white/50 backdrop-blur-md hover:bg-white/80 hover:border-gray-600 transition-all duration-300 ease-in-out">
            <FaPlus className="text-4xl text-gray-500" />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ManageGames;
