import { TEAMS } from "../data/teams";

export async function getClubNews(teamID) {
  const guardianTagId = TEAMS[teamID].guardianTagId;
  const res = await fetch(
    `https://content.guardianapis.com/search?tag=${encodeURIComponent(
      guardianTagId
    )}&order-by=newest&page-size=2&api-key=${import.meta.env.VITE_TG_KEY}`
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
