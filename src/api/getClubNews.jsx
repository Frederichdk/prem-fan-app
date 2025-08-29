export async function getClubNews(teamName) {
  const serachTeamName = teamName.trim().toLowerCase().replace(/\s+/g, "");
  const res = await fetch(
    `https://content.guardianapis.com/search?tag=football%2F${serachTeamName}&order-by=newest&page-size=2&api-key=${
      import.meta.env.VITE_TG_KEY
    }`
  );

  const data = await res.json();

  const news = data.response.results.map((e) => ({
    key: e.webTitle,
    title: e.webTitle,
    source: "The Gardian",
    publishedAt: e.webPublicationDate,
    url: e.webUrl,
  }));

  return news;
}
