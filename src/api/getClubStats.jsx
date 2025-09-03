import { getStandings } from "./getStandings";

export async function getClubStats(teamID) {
  const table = await getStandings();
  const row = table.find((r) => r.team.id === teamID);

  return {
    position: row.position,
    played: row.playedGames,
    wins: row.won,
    draws: row.draw,
    losses: row.lost,
    points: row.points,
  };
}
