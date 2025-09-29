export async function getClubNews(teamId) {
  const result = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/news/${teamId}`
  );
  const data = await result.json();
  // console.log(data.news, data.updatedAt);
  return { news: data.news, updatedAt: data.updatedAt };
}

export async function refreshClubNews(teamId) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/v1/news/${teamId}/refresh`,
    { method: "POST" }
  );
  console.log("Club News refreshed");
  return res.json();
}
