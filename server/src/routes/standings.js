import { Router } from "express";
import db from "../db.js";

const router = Router();

async function refreshStandings() {
  const result = await fetch(
    "https://api.football-data.org/v4/competitions/PL/standings",
    {
      headers: { "X-Auth-Token": process.env.FD_KEY },
    }
  );
  const data = await result.json();

  db.prepare(
    `
        insert into standings_cache (competition, payload, updated_at)
        values ('PL', ?, strftime('%s','now'))
        ON CONFLICT(competition) DO UPDATE
        SET payload = excluded.payload, updated_at = excluded.updated_at
        `
  ).run(JSON.stringify(data));

  const total = data?.standings?.find((s) => s.type === "TOTAL");

  return {
    table: total.table,
    updatedAt: Math.floor(Date.now() / 1000),
  };
}

router.get("/standings", async (req, res) => {
  const row = db
    .prepare(
      "SELECT payload, updated_at FROM standings_cache WHERE competition = 'PL'"
    )
    .get();

  if (!row) {
    try {
      const fresh = await refreshStandings();
      return res.json(fresh);
    } catch (e) {
      return res.status(502).json({ error: "Upstream unavailable" });
    }
  }

  const json = JSON.parse(row.payload);
  const total = json?.standings?.find((s) => s.type === "TOTAL");

  return res.json({
    table: total.table,
    updatedAt: row.updated_at,
  });
});

router.post("/standings/refresh", async (req, res) => {
  res.json(await refreshStandings());
});

export default router;
