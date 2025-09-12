import ClubStats from "../components/ClubStats";
import ClubGames from "../components/ClubGames";
import ClubHeader from "../components/ClubHeader";
import ClubNews from "../components/ClubNews";
import { getClubNews } from "../api/getClubNews";
import { getClubStats } from "../api/getClubStats";
import { getClubGames } from "../api/getClubGames";
import { useEffect, useRef, useState } from "react";
import { TEAMS } from "../data/teams";
import { useParams } from "react-router-dom";
import { useTeamTheme } from "../utility/useTeamTheme";
import "../App.css";

function ClubPage() {
  const { id } = useParams();
  const teamID = Number(id);
  const [stats, setStats] = useState(null);
  const [news, setNews] = useState(null);
  //to show when last updated to know when to refresh not implemented yet
  const [newsUpdate, setNewsUpdate] = useState(null);
  const [game, setGame] = useState(null);
  const fetched = useRef(false);

  useTeamTheme(teamID);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;

    (async () => {
      const newsData = await getClubNews(teamID);
      setStats(await getClubStats(teamID));
      setNews(newsData.news);
      setNewsUpdate(newsData.updatedAt);
      setGame(await getClubGames(teamID));
    })();
  }, [teamID]);

  return (
    <>
      <div className="h-full w-full flex flex-col gap-10 pb-10">
        <ClubHeader teamInfo={TEAMS[teamID]} teamID={teamID} />
        <div className="w-full h-full flex flex-row gap-10">
          {stats ? (
            <ClubStats
              played={stats.played}
              wins={stats.wins}
              losses={stats.losses}
              draws={stats.draws}
              points={stats.points}
              position={stats.position}
              id={TEAMS[teamID]}
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

export default ClubPage;
