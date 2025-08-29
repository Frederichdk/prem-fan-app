export async function getCulbStats(teamName) {
  const result = await fetch("/api-football/v4/competitions/PL/standings", {
    headers: { "X-Auth-Token": import.meta.env.VITE_FD_KEY },
  });
  const data = await result.json();

  const total = data.standings.find((s) => s.type === "TOTAL");
  const row = total.table.find((r) => r.team.name === teamName);

  return {
    position: row.position,
    played: row.playedGames,
    wins: row.won,
    draws: row.draw,
    losses: row.lost,
    points: row.points,
  };
}
