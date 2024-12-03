import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AdComponent from "../components/AdComponent";
import SmallAdComponent from "../components/SmallAdComponent";
import { format } from "date-fns";
import { useAuth } from "../utils/AuthProvider";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../config";
import { Modal, Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

interface LocationState {
  gameId: string;
  gameUrl: string;
  startTime: string;
  title: string;
}

const GamePage: React.FC = () => {
  const location = useLocation();
  const { gameId, gameUrl, startTime, title } = location.state as LocationState;
  const [showAd, setShowAd] = useState(true);
  const [showSmallAd, setShowSmallAd] = useState(false);
  const [hasClosedAd, setHasClosedAd] = useState(false);
  const { user, checkAuthenticated, login } = useAuth();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [activeDuration, setActiveDuration] = useState(0); // Active game time in seconds
  const [pauseStart, setPauseStart] = useState<Date | null>(null);
  const userId = user?.user_id;

  const startTimestamp = new Date(startTime);

  useEffect(() => {
    document.title = title;
    if (!checkAuthenticated()) {
      login();
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const interval = setInterval(() => {
      if (!isModelOpen) {
        setActiveDuration((prev) => prev + 1);
      }
    }, 1000);

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!hasClosedAd) return;
      sendGameStatsToBackend(activeDuration);
      event.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.body.style.overflow = "auto";
      if (hasClosedAd) sendGameStatsToBackend(activeDuration);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      clearInterval(interval);
    };
  }, [isModelOpen, hasClosedAd]);

  useEffect(() => {
    let smallAdInterval: NodeJS.Timeout;

    if (!showAd) {
      smallAdInterval = setInterval(() => {
        setShowSmallAd(true);
      }, 60000);
    }

    return () => {
      clearInterval(smallAdInterval);
    };
  }, [showAd]);

  const sendGameStatsToBackend = async (duration: number) => {
    sendAlreadyPlayedGame();
    if (duration <= 10) {
      console.log("No significant play time.");
      return;
    }

    const points = Math.ceil(Math.pow(duration / 30, 1.5));
    if (points <= 0) {
      console.log("No points earned", duration);
      return;
    }

    try {
      const response = await fetch(
        `${BACKEND_URL}/game_progress/save_progress`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            gameId,
            dateTime: format(startTimestamp, "yyyy-MM-dd'T'HH:mm:ss.SSSX"),
            duration,
            points,
          }),
        }
      );

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
      console.log("Success:", responseData);
      if (points > 0) {
        toast.success(`Congratulations🥳 You earned ${points} points!`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const sendAlreadyPlayedGame = async () => {
    if (!userId || !gameId) {
      return;
    }

    try {
      const response = await fetch(
        `${BACKEND_URL}/already_played_games/${userId}/${gameId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

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
      console.log("Success:", responseData);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleCloseAd = () => {
    setShowAd(false);
    setHasClosedAd(true);
  };

  const handleCloseSmallAd = () => {
    setShowSmallAd(false);
  };

  const handlePause = () => {
    setPauseStart(new Date());
    setIsModelOpen(true);
  };

  const handleResume = () => {
    if (pauseStart) {
      const pauseDuration =
        (new Date().getTime() - pauseStart.getTime()) / 1000;
      setActiveDuration((prev) => prev - pauseDuration);
    }
    setPauseStart(null);
    setIsModelOpen(false);
  };

  return (
    <div className="game-page relative bg-white">
      {showAd && <AdComponent onClose={handleCloseAd} />}
      {showSmallAd && (
        <div className=" max-h-48 overflow-y-auto w-auto">
          <SmallAdComponent onClose={handleCloseSmallAd} />
        </div>
      )}
      <iframe
        src={gameUrl}
        title="Game"
        width="100%"
        height="800px"
        allowFullScreen
      ></iframe>

      {isModelOpen && (
        <Modal
          show={isModelOpen}
          onClose={handleResume}
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
                Are you sure you want to pause the game?
              </h3>
              <div className="flex justify-center gap-4 pb-6">
                <Button
                  className="bg-red-600 hover:bg-red-700"
                  onClick={handleResume}
                >
                  Resume Playing
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default GamePage;
