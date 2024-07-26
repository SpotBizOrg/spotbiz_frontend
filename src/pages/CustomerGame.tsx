import Customernavbar from "../components/Customernavbar";
import Container from "../components/Container";
import GameCard from '../components/GameCard';
import gamingBanner from '../assets/game_banner/GamingBanner.png';
import DropMergetheNumbers from '../assets/game_banner/DropMergetheNumbers.jpg';
import Tag234Players from '../assets/game_banner/Tag234Players.jpg';
import KittyScrambleWordStacks from '../assets/game_banner/KittyScrambleWordStacks.jpg';
import SortParking from '../assets/game_banner/SortParking.jpg';
import CuttheRope from '../assets/game_banner/CuttheRope.jpg';
import CupsWaterSortPuzzle from '../assets/game_banner/CupsWaterSortPuzzle.jpg';
import Adminnavbar from "../components/Adminnavbar";

const games = [
  {
    image: Tag234Players,
    title: 'Tag 2 3 4 Players',
    Developer: 'Jet Games',
    description: 'Hello',
    visits: '11M',
    usage: 1,
    url: 'https://www.crazygames.com/embed/tag-2-3-4-players',
    special: true
  },
  {
    image: KittyScrambleWordStacks,
    title: 'Kitty Scramble: Word Stacks',
    Developer: 'Clever Apps',
    description: 'Hello',
    visits: '11M',
    usage: 1,
    url: 'https://www.crazygames.com/embed/kitty-scramble'
  },
  {
    image: CuttheRope,
    title: 'Cut the Rope',
    Developer: 'Famobi',
    description: 'Hello',
    visits: '11M',
    usage: 1,
    url: 'https://www.crazygames.com/embed/cut-the-rope-ebx'
  },
  {
    image: CupsWaterSortPuzzle,
    title: 'Cups - Water Sort Puzzle',
    Developer: 'Blury Studio',
    description: 'Hello',
    visits: '11M',
    usage: 1,
    url: 'https://www.crazygames.com/embed/cups---water-sort-puzzle'
  },
  {
    image: SortParking,
    title: 'Sort Parking',
    Developer: 'Synk',
    description: 'Hello',
    visits: '11M',
    usage: 1,
    url: 'https://www.crazygames.com/embed/sort-parking'
  },
  {
    image: DropMergetheNumbers,
    title: 'Drop & Merge the Numbers',
    Developer: 'GMR Bros',
    description: 'Hello',
    visits: '11M',
    usage: 1,
    url: 'https://www.crazygames.com/embed/drop-merge-the-numbers'
  },
];

function CustomerGame() {
  return (
    <Container>
      <Customernavbar />
      <div className="flex flex-col justify-start items-center pt-20 px-16">
        <div className="flex justify-between items-center w-full mb-4">
          <div className="flex items-center">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" className="rounded-full w-32 h-32 mr-2" />
            <div>
              <p className="text-black text-xl">Yuhanga Induwara</p>
              <p className="text-gray-400">Points: 95</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative w-full max-w-xs">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none p-0">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input type="text" id="simple-search" className="bg-gray-50 border p-1 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for games..." required />
            </div>
            <button type="submit" className="p-2 text-sm font-medium text-white bg-bluedark rounded-lg border border-bluedark hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
        <div className="flex flex-row mt-4 w-full overflow-x-auto overflow-y-hidden h-full space-x-4 scrollbar-hide mt-8">
          {games.map((game, index) => (
            <div key={index} className="min-w-[280px] max-w-[280px] relative">
              {game.special && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10">Seasonal Special</span>
              )}
              <GameCard {...game} />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default CustomerGame;
