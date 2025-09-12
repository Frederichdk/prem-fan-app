import { Router } from "express";
import db from "../db.js";
import { TEAMS } from "../data/teams.js";

const router = Router();

async function refreshNews(teamIdRaw) {
  const teamId = Number(teamIdRaw);
  const guardianTagId = TEAMS[teamId].guardianTagId;
  const result = await fetch(
    `https://content.guardianapis.com/search?tag=${encodeURIComponent(
      guardianTagId
    )}&order-by=newest&page-size=2&api-key=${process.env.TG_KEY}`
  );
  const data = await result.json();

  db.prepare(
    `insert into news_cache (team_id, payload, updated_at) 
    values (?, ?, strftime('%s','now')) 
    on conflict (team_id) do update 
    set payload = excluded.payload, updated_at = excluded.updated_at`
  ).run(Number(teamId), JSON.stringify(data));

  const news = data.response.results.map((e) => ({
    key: e.webTitle,
    title: e.webTitle,
    source: "The Guardian",
    publishedAt: e.webPublicationDate,
    url: e.webUrl,
  }));

  return {
    news: news,
    updatedAt: Math.floor(Date.now() / 1000),
  };
}

router.get("/news/:teamId", async (req, res) => {
  const teamId = Number(req.params.teamId);
  const row = db
    .prepare(`select payload, updated_at from news_cache where team_id = ?`)
    .get(teamId);

  if (row) {
    const data = JSON.parse(row.payload);
    const news = data.response.results.map((e) => ({
      key: e.webTitle,
      title: e.webTitle,
      source: "The Guardian",
      publishedAt: e.webPublicationDate,
      url: e.webUrl,
    }));
    res.json({ news: news, updatedAt: row.updated_at });
  } else {
    const fresh = await refreshNews(teamId);
    return res.json(fresh);
  }
});

router.post("/news/:teamId/refresh", async (req, res) => {
  const { teamId } = req.params;
  //a different way of doing this just good to know
  res.json(await refreshNews(Number(teamId)));
});

export default router;
