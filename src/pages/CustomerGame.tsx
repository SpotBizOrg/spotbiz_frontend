import Container from "../components/Container";
import GameCard from "../components/GameCard";
import { useEffect, useState } from "react";
import Customernavbar2 from "../components/Customernavbar2";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../config";
import { HashLoader } from "react-spinners";
import { useAuth } from "../utils/AuthProvider";
import axios from "axios";

interface UserDetails{
  userId: number;
  name: string;
  points: number;
}

interface Game_display {
  gameId: string;
  imageUrl: string;
  gameName: string;
  gameType: string;
  developer: string;
  description: string;
  gameUrl: string;
}

interface Leaderboard {
  userId: string;
  email: string;
  name: string;
  phoneNo: string;
  role: string;
  status: string;
  points: string;
}

function CustomerGame() {
  useEffect(() => {
    document.title = "SpotBiz | Games | Customer";
    fetchUserDetails();
    fetchProfilePic();
    fetchRegularGames();
    fetchSeasonalGames();
    fetchPlayedGames();
    fetchLeaderboard();
    if (!checkAuthenticated()) {
      login();
    }
  }, []);

  const { user, checkAuthenticated, login } = useAuth();
  const userId = user?.user_id;
  const [activeTab, setActiveTab] = useState("played");
  const [regularGames, setRegularGames] = useState<Game_display[]>([]);
  const [seasonalGames, setSeasonalGames] = useState<Game_display[]>([]);
  const [playedGames, setPlayedGames] = useState<Game_display[]>([]);
  const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([]);
  const [isLeaderboardActivated, setIsLeaderboardActivated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [profilePic, setProfilePic] = useState<string | null>(null);

  const fetchProfilePic = async () => {
    const url = `${BACKEND_URL}/customer/pics/${userId}`;

    try {
      const response = await axios.get(url);
      console.log(response.data);
      setProfilePic(response.data.imageUrl);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  const fetchUserDetails = async () => {
    const url = `${BACKEND_URL}/game/details/${userId}`;

    try{
      const response = await axios.get(url);
      console.log(response.data);

      const transformedData = {
        userId: response.data.userId,
        name: response.data.name,
        points: response.data.points
      }

      setUserDetails(transformedData);

    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  const fetchRegularGames = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/game/all_games/REGULAR`);
      if (response.status == 404) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRegularGames(data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const fetchSeasonalGames = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/game/all_games/SEASONAL`);
      if (response.status == 404) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (!response.ok) {
        toast.error("An unexpected error occurred");
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSeasonalGames(data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const fetchPlayedGames = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/already_played_games/${userId}`
      );
      if (response.status == 404) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Played games:", data);
      const games: Game_display[] = data.map((item: any) => ({
        gameId: item.game.gameId,
        imageUrl: item.game.imageUrl || "",
        gameName: item.game.gameName,
        gameType: item.game.gameType,
        developer: item.game.developer,
        description: item.game.description,
        gameUrl: item.game.gameUrl || "",
      }));

      setPlayedGames(games);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/game/leaderboard`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${
            errorData.message || "Unknown error"
          }`
        );
      }

      const responseData = await response.json();
      setLeaderboard(responseData);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const getDisplayedGames = (): Game_display[] => {
    switch (activeTab) {
      case "seasonal":
        return Array.isArray(seasonalGames) ? seasonalGames : [seasonalGames];
      case "regular":
        return Array.isArray(regularGames) ? regularGames : [regularGames];
      case "played":
        return Array.isArray(playedGames) ? playedGames : [playedGames];
      default:
        return [];
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (activeTab === "seasonal") {
      const filteredSeasonalGames = seasonalGames.filter((game) =>
        game.gameName.toLowerCase().includes(query)
      );

      setSeasonalGames(filteredSeasonalGames);
    } else if (activeTab === "regular") {
      const filteredRegularGames = regularGames.filter((game) =>
        game.gameName.toLowerCase().includes(query)
      );

      setRegularGames(filteredRegularGames);
    }
  };

  const handleBackspace = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") {
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
          <img
            className="ring-offset-2 ring h-40 w-40 rounded-full"
            src={profilePic || "https://flowbite.com/docs/images/people/profile-picture-3.jpg"}
            // src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
          />
          <div>
            <p className="text-black text-xl ml-4">{userDetails?.name || "Nirasha Nelki"}</p>
            <p className="text-gray-400 ml-4">Points: {userDetails?.points || 95}</p>
          </div>
        </div>
        <div className="flex items-center justify-between w-full mb-5 border-b border-gray-300 mb-8">
          <div className="flex space-x-6 ">
            <button
              className={`px-0 py-2 pb-[calc(0.5rem - 4px)] rounded focus:outline-none ${
                activeTab === "played"
                  ? "text-black border-b-4 border-black"
                  : "bg-transparent text-blue-500 border-b-4 border-transparent hover:border-b-4 hover:border-gray-300"
              }`}
              onClick={() => {
                setActiveTab("played");
                setIsLeaderboardActivated(false);
              }}
            >
              Already Played
            </button>
            <button
              className={`px-0 py-2 pb-[calc(0.5rem - 4px)] rounded focus:outline-none ${
                activeTab === "regular"
                  ? "text-black border-b-4 border-black"
                  : "bg-transparent text-blue-500 border-b-4 border-transparent hover:border-b-4 hover:border-gray-300"
              }`}
              onClick={() => {
                setActiveTab("regular");
                setIsLeaderboardActivated(false);
              }}
            >
              Regular Games
            </button>
            <button
              className={`px-0 py-2 pb-[calc(0.5rem - 4px)] rounded focus:outline-none ${
                activeTab === "seasonal"
                  ? "text-black border-b-4 border-black"
                  : "bg-transparent text-blue-500 border-b-4 border-transparent hover:border-b-4 hover:border-gray-300"
              }`}
              onClick={() => {
                setActiveTab("seasonal");
                setIsLeaderboardActivated(false);
              }}
            >
              Seasonal Games
            </button>
            <button
              className={`px-0 py-2 pb-[calc(0.5rem - 4px)] rounded focus:outline-none ${
                activeTab === "leaderboard"
                  ? "text-black border-b-4 border-black"
                  : "bg-transparent text-blue-500 border-b-4 border-transparent hover:border-b-4 hover:border-gray-300"
              }`}
              onClick={() => {
                setActiveTab("leaderboard");
                setIsLeaderboardActivated(true);
              }}
            >
              Leaderboard
            </button>
            <button
              className={`px-0 py-2 pb-[calc(0.5rem - 4px)] rounded focus:outline-none ${
                activeTab === "howToPlay"
                  ? "text-black border-b-4 border-black"
                  : "bg-transparent text-blue-500 border-b-4 border-transparent hover:border-b-4 hover:border-gray-300"
              }`}
              onClick={() => {
                setActiveTab("howToPlay");
                setIsLeaderboardActivated(false);
              }}
            >
              How to play?
            </button>
          </div>
          <div className="flex items-center space-x-2 mb-1">
            <div className="relative w-full max-w-xs">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none p-0">
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border p-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={`Search for games...`}
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
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row w-full overflow-x-auto overflow-y-hidden h-full space-x-4 scrollbar-hide">
            {displayedGames.length === 0 ||
            displayedGames[0]?.gameId === "" ||
            displayedGames[0]?.gameId === null ? (
              <div className="text-center text-gray-500">
                {activeTab === "seasonal"
                  ? "No seasonal games available."
                  : activeTab === "regular"
                  ? "No regular games available."
                  : activeTab === "played"
                  ? "No played games available. Try playing some games"
                  : null}
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
          <div className="">
            {!isLeaderboardActivated ||
            leaderboard.length === 0 ||
            leaderboard[0]?.userId === "" ||
            leaderboard[0]?.userId === null ? (
              <div className="text-center text-gray-500">
                {activeTab === "leaderboard" ? "Leaderboard is empty." : null}
              </div>
            ) : (
              <div className="relative overflow-x-auto overflow-y-auto sm:rounded-lg border-2 border-black p-8 bg-gradient-to-r from-cyan-500 to-blue5">
              {/* <div className="relative overflow-x-auto overflow-y-auto sm:rounded-lg border border-black hover:translate-x-1 hover:shadow-md"> */}
              <table className="w-full font-mono text-md text-left rtl:text-right text-black outline outline-offset-2 outline-indigo-800">
                  <thead className="table-header text-xs text-white uppercase bg-black">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3"
                        style={{ minWidth: "150px" }}
                      >
                        Rank
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3"
                        style={{ minWidth: "150px" }}
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3"
                        style={{ minWidth: "150px" }}
                      >
                        <div className="flex items-center">Score</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {leaderboard.map((user, index) => {
                    // Determine styles based on index (even or odd)
                    const isEven = index % 2 === 0;
                    const baseClass = isEven
                      ? "bg-slate-100 border-indigo-700"
                      : "bg-slate-300 border-slate-700";
                    const hoverClass = isEven
                      ? "hover:bg-blue9 dark:hover:bg-blue-700"
                      : "hover:bg-purple-200 dark:hover:bg-green-700";
                      // const transformClass = "hover:scale-100 hover:shadow-lg";
                      const transformClass = "hover:translate-x-1 hover:shadow-md";


                    return (
                      <tr
                        key={index}
                        className={`${baseClass} ${hoverClass} ${transformClass} border-b dark:bg-gray-800 dark:border-gray-700 transition duration-300`}                      >
                        <td className="px-6 py-6">{index + 1}</td>
                        <td className="px-6 py-6">{user.name}</td>
                        <td className="px-6 py-6">{user.points}</td>
                      </tr>
                    );
                  })}


                  </tbody>
                </table>
              {/* </div> */}
                
              </div>
            )}
          </div>

          <div>
            {
              activeTab === "howToPlay" && (
                <div className="bg-gray-100 p-8 rounded-lg shadow-lg max-w-6xl mx-auto mt-2 border border-gray-300">
                  <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">How to Play Games on SpotBiz</h1>
                  <p className="text-gray-700 mb-4">
                    SpotBiz offers a variety of exciting games for you to enjoy. These games are divided into two categories: 
                    <span className="font-semibold text-blue-600"> Seasonal Games</span> and 
                    <span className="font-semibold text-blue-600"> Regular Games</span>.
                  </p>

                  <h2 className="text-2xl font-semibold text-blue-500 mt-6 mb-3">🎉 Seasonal Games</h2>
                  <p className="text-gray-700 mb-4">
                    Seasonal Games are added during special occasions like Halloween and Christmas, bringing you festive fun and rewards.
                  </p>

                  <h2 className="text-2xl font-semibold text-blue-500 mt-6 mb-3">🎮 Regular Games</h2>
                  <p className="text-gray-700 mb-4">
                    Regular Games are available year-round and designed to keep you entertained every day.
                  </p>

                  <h2 className="text-2xl font-semibold text-blue-500 mt-6 mb-3">🏆 Earn Points</h2>
                  <p className="text-gray-700 mb-4">
                    The longer you play, the more points you earn! Points accumulate based on your playtime, and the frequency of points increases the longer you play.
                  </p>

                  <h2 className="text-2xl font-semibold text-blue-500 mt-6 mb-3">📋 Leaderboard</h2>
                  <p className="text-gray-700 mb-4">
                    Compete with other players and see your rank on the 
                    <span className="font-semibold text-blue-600"> monthly leaderboard</span>. The top 10 players of the month will be displayed for everyone to admire.
                  </p>

                  <h2 className="text-2xl font-semibold text-blue-500 mt-6 mb-3">🎁 Rewards</h2>
                  <p className="text-gray-700">
                    Players with the highest scores have the chance to win 
                    <span className="font-semibold text-blue-600"> discount coupons</span> that can be used on purchases from businesses registered on the SpotBiz platform. Play more to increase your chances of winning!
                  </p>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </Container>
  );
}

export default CustomerGame;
