import { getStandings } from "./getStandings";

export async function getClubStats(teamID) {
  const standings = await getStandings();
  const row = standings.table.find((r) => r.team.id === teamID);

  return {
    position: row.position,
    played: row.playedGames,
    wins: row.won,
    draws: row.draw,
    losses: row.lost,
    points: row.points,
  };
}
