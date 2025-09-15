import ClubStats from "../components/ClubStats";
import ClubGames from "../components/ClubGames";
import ClubHeader from "../components/ClubHeader";
import ClubNews from "../components/ClubNews";
import { getClubNews } from "../api/getClubNews";
import { getClubStats } from "../api/getClubStats";
import { getClubGames } from "../api/getClubGames";
import { useEffect, useState } from "react";
import { TEAMS } from "../data/teams";
import { useParams } from "react-router-dom";
import { useTeamTheme } from "../utility/useTeamTheme";
import "../App.css";
import { useNews } from "../context/NewsContext";

function ClubPage() {
  const { id } = useParams();
  const teamId = Number(id);
  const [stats, setStats] = useState(null);
  const { news, setNews } = useNews();
  //to show when last updated to know when to refresh not implemented yet
  const [game, setGame] = useState(null);

  useTeamTheme(teamId);

  useEffect(() => {
    (async () => {
      const newsData = await getClubNews(teamId);
      setNews(newsData.news);
      setStats(await getClubStats(teamId));
      setGame(await getClubGames(teamId));
    })();
  }, [teamId]);

  return (
    <>
      <div className="h-full w-full flex flex-col gap-10 pb-10">
        <ClubHeader teamInfo={TEAMS[teamId]} teamId={teamId} />
        <div className="w-full h-full flex flex-row gap-10">
          {stats ? (
            <ClubStats
              played={stats.played}
              wins={stats.wins}
              losses={stats.losses}
              draws={stats.draws}
              points={stats.points}
              position={stats.position}
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
