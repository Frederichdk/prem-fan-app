import { getClubNews } from "./api/getClubNews";
import { getCulbStats } from "./api/getClubStats";
import { getClubGames } from "./api/getClubGames";
import { TEAMS } from "./data/teams";
import "./App.css";
import ClubGames from "./components/ClubGames";
import ClubHeader from "./components/ClubHeader";
import ClubNews from "./components/ClubNews";
import ClubStats from "./components/ClubStats";
import { useEffect, useRef, useState } from "react";

function App() {
  const [stats, setStats] = useState(null);
  const [news, setNews] = useState(null);
  const [game, setGame] = useState(null);
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    async function fetchStats() {
      const data = await getCulbStats(351);
      setStats(data);
    }
    fetchStats();
  }, []);

  useEffect(() => {
    async function fetchNews() {
      const data = await getClubNews(351);
      setNews(data);
    }
    fetchNews();
  }, []);

  useEffect(() => {
    async function fetchGames() {
      const data = await getClubGames(351);
      setGame(data);
    }
    fetchGames();
  }, []);

  return (
    <>
      <div className="h-full w-full flex flex-col gap-10">
        <ClubHeader teamInfo={TEAMS[351]} />
        <div className="w-full h-[70%] flex flex-row gap-10">
          {stats ? (
            <ClubStats
              played={stats.played}
              wins={stats.wins}
              losses={stats.losses}
              draws={stats.draws}
              points={stats.points}
              position={stats.position}
              id={TEAMS[351]}
            />
          ) : (
            <div>LOADING...</div>
          )}
          <div className="w-full h-full flex flex-col gap-10">
            {game ? (
              <ClubGames
                nextMatch={game.nextMatch}
                recentResults={game.recentResults}
              />
            ) : (
              <div>LOADING...</div>
            )}

            {news ? <ClubNews news={news} /> : <div>LOADING...</div>}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
