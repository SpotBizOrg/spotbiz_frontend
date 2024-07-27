import Customernavbar from "../components/Customernavbar";
import Container from "../components/Container";
import GameCard from '../components/GameCard';
import gamingBanner from '../assets/game_banner/GamingBanner.png';
import ManRunner2048 from '../assets/game_banner/ManRunner2048.jpg';
import Tag234Players from '../assets/game_banner/Tag234Players.jpg';
import KittyScrambleWordStacks from '../assets/game_banner/KittyScrambleWordStacks.jpg';
import Bonkio from '../assets/game_banner/Bonkio.png';
import CuttheRope from '../assets/game_banner/CuttheRope.jpg';
import CupsWaterSortPuzzle from '../assets/game_banner/CupsWaterSortPuzzle.jpg';

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

function CustomerGame() {
  return (

    <Container>
      <Customernavbar />
      <div className="flex flex-col justify-start items-center pt-20 px-16">
        <div className="flex justify-between items-center w-full mb-4">
          <div className="flex items-center">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User" className="rounded-full w-32 h-32 mr-2"/>
            <div>
              <p className="text-black text-xl ">Yuhanga Induwara</p>
              <p className="text-gray-400">Points: 95</p>
            </div>
          </div>
          <div className="flex items-center p-4 rounded-lg shadow-md text-white" style={{ background: 'linear-gradient(135deg, #00f260, #0575e6)', boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)' }}>
            <img src={gamingBanner} alt="Seasonal Game" className="rounded-lg w-24 h-24 mr-4 transform transition-transform hover:scale-105 hover:z-10" />
            <div>
              <h3 className="text-black">Seasonal Game</h3>
              <button className="bg-green-600 text-white mt-2 py-1 px-2 rounded  transform transition-transform hover:scale-105 hover:z-10">Play Game</button>
            </div>
          </div>
        </div>
        <div className="flex flex-row mt-4 w-full overflow-x-auto overflow-y-hidden h-full space-x-4 scrollbar-hide mt-8">
          {games.map((game, index) => (
            <div key={index} className="min-w-[280px] max-w-[280px]">
              <GameCard {...game} />
            </div>
          ))}
        </div>
      </div>
    </Container>
    
  );
}

export default CustomerGame;