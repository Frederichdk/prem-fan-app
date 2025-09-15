export async function getStandings() {
  const result = await fetch(`${import.meta.env.VITE_API_URL}/standings`);
  const data = await result.json();

  return { table: data.table, updatedAt: data.updatedAt };
}

export async function refreshStandings() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/standings/refresh`, {
    method: "POST",
  });
  return res.json();
}
