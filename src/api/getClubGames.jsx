export async function getClubGames(teamID) {
  const params = new URLSearchParams({ linit: "200" });
  const res = await fetch(
    `/api-football/v4/teams/${teamID}/matches?` + params.toString(),
    {
      headers: { "X-Auth-Token": import.meta.env.VITE_FD_KEY },
    }
  );
  const data = await res.json();
}
