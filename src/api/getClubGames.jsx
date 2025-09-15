export async function getClubGames(teamId) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/games/${teamId}`
  );
  const data = await response.json();
  console.log(data.nextMatch, data.recentResults, data.updatedAt);
  return {
    nextMatch: data.nextMatch,
    recentResults: data.recentResults,
    updatedAt: data.updatedAt,
  };
}
