import { useEffect, useState } from "react";
import { Modal, TextInput, Label, Button } from "flowbite-react";
import Adminnavbar from "../components/Adminnavbar";
import Adminsidebar from "../components/Adminsidebar";
import Container from "../components/Container";
import GameCard from "../components/GameCard";
import { FaPlus } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../config";
import { HashLoader } from "react-spinners";
import { useAuth } from "../utils/AuthProvider";

function ManageGames() {
  useEffect(() => {
    document.title = "SpotBiz | Games | Admin";
    fetchRegularGames();
    fetchSeasonalGames();
    if (!checkAuthenticated() || user?.role != "ADMIN") {
      login();
    }
  }, []);

  interface Game {
    image: File | null;
    title: string;
    gameType: string;
    developer: string;
    description: string;
    url: string;
  }

  interface Game_update {
    gameId: string;
    image: File | null;
    title: string;
    gameType: string;
    developer: string;
    description: string;
    url: string;
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

  const { user, checkAuthenticated, login } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("regular");
  const [showForm, setShowForm] = useState(false);
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
  const [newGame, setNewGame] = useState<Game>({
    image: null,
    title: "",
    gameType: "",
    developer: "",
    description: "",
    url: "",
  });
  const [editGame, setEditGame] = useState<Game_update>({
    gameId: "",
    image: null,
    title: "",
    gameType: "",
    developer: "",
    description: "",
    url: "",
  });

  const [imagePreview, setImagePreview] = useState<string>("");
  const [deleteGameId, setDeleteGameId] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [regularGames, setRegularGames] = useState<Game_display[]>([]);
  const [seasonalGames, setSeasonalGames] = useState<Game_display[]>([]);

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

  const fetchRegularGames = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/game/all_games/REGULAR`);
      if (response.status == 404) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      if (!response.ok) {
        toast.error("An unexpected error occurred");
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

  const getDisplayedGames = (): Game_display[] => {
    switch (activeTab) {
      case "seasonal":
        return Array.isArray(seasonalGames) ? seasonalGames : [seasonalGames];
      case "regular":
        return Array.isArray(regularGames) ? regularGames : [regularGames];
      default:
        return [];
    }
  };

  const handleImageUpload = async (imageFile: string | Blob) => {
    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const response = await fetch(`${BACKEND_URL}/upload_image`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error uploading image:", errorData);
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${
            errorData.message || "Unknown error"
          }`
        );
      }

      const imageUrl = await response.text();
      console.log("Image URL:", imageUrl);
      return imageUrl;
    } catch (error) {
      console.error("An error occurred during image upload:", error);
      throw error;
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setNewGame((prevState) => ({ ...prevState, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageChangeUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setEditGame((prevState) => ({ ...prevState, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddGame = async () => {
    try {
      setLoading(true);

      if (
        newGame.title == null ||
        newGame.gameType == null ||
        newGame.developer == null ||
        newGame.description == null ||
        newGame.url == null ||
        newGame.title == "" ||
        newGame.gameType == "" ||
        newGame.developer == "" ||
        newGame.description == "" ||
        newGame.url == ""
      ) {
        toast.error("Please fill all fields!");
        throw new Error(`One or more fields are empty`);
      }

      let imageUrl = "";

      if (newGame.image) {
        imageUrl = await handleImageUpload(newGame.image);
      } else {
        toast.error("Please upload an image!");
        throw new Error(`Image is empty`);
      }

      const gameData = {
        gameName: newGame.title,
        gameType: newGame.gameType,
        developer: newGame.developer,
        description: newGame.description,
        gameUrl: newGame.url,
        imageUrl: imageUrl,
      };

      console.log(gameData);
      const response = await fetch(`${BACKEND_URL}/game/insert_game`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gameData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        toast.error("An unexpected error occurred");
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${
            errorData.message || "Unknown error"
          }`
        );
      }

      const responseData = await response.json();
      console.log("Success:", responseData);
      toast.success("Game added succesfully!");
      fetchRegularGames();
      fetchSeasonalGames();
      setShowForm(false);
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateGame = async () => {
    try {
      setLoading(true);

      if (
        editGame.title == null ||
        editGame.gameType == null ||
        editGame.developer == null ||
        editGame.description == null ||
        editGame.url == null ||
        editGame.title == "" ||
        editGame.gameType == "" ||
        editGame.developer == "" ||
        editGame.description == "" ||
        editGame.url == ""
      ) {
        toast.error("Please fill all fields!");
        throw new Error(`One or more fields are empty`);
      }

      let imageUrl = "";

      if (editGame.image) {
        imageUrl = await handleImageUpload(editGame.image);
        console.log(imageUrl);
      }

      const gameData = {
        gameId: editGame.gameId,
        gameName: editGame.title,
        gameType: editGame.gameType,
        developer: editGame.developer,
        description: editGame.description,
        gameUrl: editGame.url,
        imageUrl: imageUrl,
      };

      console.log(gameData);
      const response = await fetch(`${BACKEND_URL}/game/update_game`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gameData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        toast.error("An unexpected error occurred");
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${
            errorData.message || "Unknown error"
          }`
        );
      }

      const responseData = await response.json();
      console.log("Success:", responseData);
      toast.success("Game updated succesfully!");
      fetchRegularGames();
      fetchSeasonalGames();
      setIsModalOpen(false);
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGame = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${BACKEND_URL}/game/delete_game/${deleteGameId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        toast.error("An unexpected error occurred");
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${
            errorData.message || "Unknown error"
          }`
        );
      }

      const responseData = await response.json();
      console.log("Success:", responseData);
      toast.success("Game deleted succesfully!");
      window.location.reload();
      setIsDeleteModelOpen(false);
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const displayedGames = getDisplayedGames();

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
              className={`px-0 py-2 pb-[calc(0.5rem - 4px)] rounded focus:outline-none ${
                activeTab === "regular"
                  ? "text-black border-b-4 border-black"
                  : "bg-transparent text-blue-500 border-b-4 border-transparent hover:border-b-4 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("regular")}
            >
              Regular Games
            </button>
            <button
              className={`px-0 py-2 pb-[calc(0.5rem - 4px)] rounded focus:outline-none ${
                activeTab === "seasonal"
                  ? "text-black border-b-4 border-black"
                  : "bg-transparent text-blue-500 border-b-4 border-transparent hover:border-b-4 hover:border-gray-300"
              }`}
              onClick={() => setActiveTab("seasonal")}
            >
              Seasonal Games
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
                  : "No regular games available."}
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
                    usage={0}
                    onEdit={() => {
                      setIsModalOpen(true);
                      setEditGame({
                        gameId: game.gameId,
                        image: null,
                        title: game.gameName,
                        gameType: game.gameType,
                        developer: game.developer,
                        description: game.description,
                        url: game.gameUrl,
                      });
                    }}
                    onDelete={() => {
                      setIsDeleteModelOpen(true);
                      setDeleteGameId(game.gameId);
                    }}
                  />
                </div>
              ))
            )}
          </div>

          <div
            className="relative flex items-center justify-center w-[1130px] h-[94px] mt-5 border-2 border-dashed border-gray-400 rounded-lg bg-white/50 backdrop-blur-md hover:bg-white/80 hover:border-gray-600 transition-all duration-300 cursor-pointer"
            onClick={() => setShowForm(true)}
          >
            <FaPlus className="text-3xl text-gray-500" />
          </div>
        </div>

        <Modal
          show={showForm}
          onClose={() => setShowForm(false)}
          size="lg"
          className="flex items-center justify-center min-h-screen z-40"
          theme={{
            content: {
              base: "bg-white w-3/4 rounded-lg",
              inner: "p-5 rounded-lg shadow-lg",
            },
          }}
        >
          <Modal.Header>Add New Game</Modal.Header>
          <Modal.Body>
            <div className="flex flex-wrap space-x-4">
              <div className="min-w-[196px] ml-4">
                <Label htmlFor="gameTitle" value="Title" />
                <TextInput
                  id="gameTitle"
                  placeholder="Game Title"
                  onChange={(e) =>
                    setNewGame({ ...newGame, title: e.target.value })
                  }
                />
              </div>

              <div className="min-w-[196px]">
                <Label htmlFor="gameType" value="Type" />
                <select
                  id="gameType"
                  className="w-full p-2 border border-gray-300 rounded"
                  onChange={(e) =>
                    setNewGame({ ...newGame, gameType: e.target.value })
                  }
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
                  onChange={(e) =>
                    setNewGame({ ...newGame, developer: e.target.value })
                  }
                />
              </div>

              <div className="flex-1 min-w-[200px]">
                <Label htmlFor="gameDescription" value="Description" />
                <TextInput
                  id="gameDescription"
                  placeholder="Game Description"
                  onChange={(e) =>
                    setNewGame({ ...newGame, description: e.target.value })
                  }
                />
              </div>

              <div className="flex-1 min-w-[200px]">
                <Label htmlFor="gameUrl" value="URL" />
                <TextInput
                  id="gameUrl"
                  placeholder="Game URL"
                  onChange={(e) =>
                    setNewGame({ ...newGame, url: e.target.value })
                  }
                />
              </div>

              <div className="flex-1 min-w-[200px]">
                <Label htmlFor="gameImage" value="Game Image" />
                <input
                  id="gameImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 border-none rounded"
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
              className="px-4 py-2 text-white bg-bluedark rounded hover:bg-blue-600 ml-4"
              onClick={handleAddGame}
            >
              Add Game
            </button>
          </Modal.Footer>
        </Modal>

        {isModalOpen && (
          <Modal
            show={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            size="lg"
            className="flex items-center justify-center min-h-screen z-40"
            theme={{
              content: {
                base: "bg-white w-3/4 rounded-lg",
                inner: "p-5 rounded-lg shadow-lg",
              },
            }}
          >
            <Modal.Header>Update Game</Modal.Header>
            <Modal.Body>
              <div className="flex flex-wrap space-x-4">
                <div className="min-w-[196px] ml-4">
                  <Label htmlFor="gameTitle" value="Title" />
                  <TextInput
                    id="gameTitle"
                    placeholder="Game Title"
                    onChange={(e) =>
                      setEditGame({ ...editGame, title: e.target.value })
                    }
                    value={editGame.title}
                  />
                </div>

                <div className="min-w-[196px]">
                  <Label htmlFor="gameType" value="Type" />
                  <select
                    id="gameType"
                    className="w-full p-2 border border-gray-300 rounded"
                    onChange={(e) =>
                      setEditGame({ ...editGame, gameType: e.target.value })
                    }
                    value={editGame.gameType}
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
                    onChange={(e) =>
                      setEditGame({ ...editGame, developer: e.target.value })
                    }
                    value={editGame.developer}
                  />
                </div>

                <div className="flex-1 min-w-[200px]">
                  <Label htmlFor="gameDescription" value="Description" />
                  <TextInput
                    id="gameDescription"
                    placeholder="Game Description"
                    onChange={(e) =>
                      setEditGame({ ...editGame, description: e.target.value })
                    }
                    value={editGame.description}
                  />
                </div>

                <div className="flex-1 min-w-[200px]">
                  <Label htmlFor="gameUrl" value="URL" />
                  <TextInput
                    id="gameUrl"
                    placeholder="Game URL"
                    onChange={(e) =>
                      setEditGame({ ...editGame, url: e.target.value })
                    }
                    value={editGame.url}
                  />
                </div>

                <div className="flex-1 min-w-[200px]">
                  <Label htmlFor="gameImage" value="Game Image" />
                  <input
                    id="gameImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChangeUpdate}
                    className="w-full p-2 border-none rounded"
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
                className="px-4 py-2 text-white bg-bluedark rounded hover:bg-blue-600 ml-4"
                onClick={handleUpdateGame}
              >
                Update Game
              </button>
            </Modal.Footer>
          </Modal>
        )}

        {isDeleteModelOpen && (
          <Modal
            show={isDeleteModelOpen}
            onClose={() => setIsDeleteModelOpen(false)}
            popup
            className="flex items-center justify-center inset-2/4 inset-y-1/2 z-40"
            theme={{
              content: {
                base: "bg-white w-3/4 rounded-lg",
                inner: "p-6 rounded-lg shadow-lg",
              },
            }}
          >
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to get this action?
                </h3>
                <div className="flex justify-center gap-4 pb-6">
                  <Button
                    className="bg-red-600 hover:bg-red-700"
                    onClick={handleDeleteGame}
                  >
                    Yes, I'm sure
                  </Button>
                  <Button
                    className="bg-gray-500 hover:bg-gray-600"
                    onClick={() => setIsDeleteModelOpen(false)}
                  >
                    No, cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        )}
      </div>
      <div className="px-12 sm:ml-64 mt-20">
        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <HashLoader color="#36d7b7" size={50} />
          </div>
        )}
      </div>
    </Container>
  );
}

export default ManageGames;
