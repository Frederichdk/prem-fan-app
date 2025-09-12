export async function getClubNews(teamID) {
  const result = await fetch(`${import.meta.env.VITE_API_URL}/news/${teamID}`);
  const data = await result.json();
  console.log(data.news, data.updatedAt);
  return { news: data.news, updatedAt: data.updatedAt };
}
