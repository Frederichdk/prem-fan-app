export async function getStandings() {
  const result = await fetch("/api-football/v4/competitions/PL/standings", {
    headers: { "X-Auth-Token": import.meta.env.VITE_FD_KEY },
  });
  const data = await result.json();

  const total = data.standings.find((s) => s.type === "TOTAL");

  return total.table;
}
