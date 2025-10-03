import { Router } from "express";
import { qGet, qRun } from "../db.js";

const router = Router();

function formatScore(e, isHome) {
  const home = e.score.fullTime.home;
  const away = e.score.fullTime.away;

  if (home == null || away == null) return null;

  return isHome ? `${home}-${away}` : `${away}-${home}`;
}

function formatResult(e, isHome) {
  let result = null;
  const winner = e.score.winner;
  if (winner == "DRAW") {
    return "D";
  }

  if (isHome) {
    if (winner == "HOME_TEAM") {
      result = "W";
    } else {
      result = "L";
    }
  } else {
    if (winner == "HOME_TEAM") {
      result = "L";
    } else {
      result = "W";
    }
  }
  return result;
}

function formatDate(utcDate) {
  const date = new Date(utcDate);
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
  }).format(date);
}

function formatTime(utcDate) {
  const date = new Date(utcDate);
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

function formatPayload(teamId, data) {
  const recentResults = data.matches
    .filter((e) => e.status === "FINISHED")
    .sort((a, b) => Date.parse(b.utcDate) - Date.parse(a.utcDate))
    .slice(0, 3)
    .map((e) => {
      const isHome = e.homeTeam.id === teamId;
      return {
        key: e.id,
        isHome,
        opponent: isHome ? e.awayTeam.shortName : e.homeTeam.shortName,
        date: formatDate(e.utcDate),
        time: formatTime(e.utcDate),
        result: formatResult(e, isHome),
        score: formatScore(e, isHome),
        competition: e.competition.code,
        venue: "Missing",
      };
    });

  const upcoming = data.matches
    .filter((e) => e.status === "TIMED" || e.status === "SCHEDULED")
    .sort((a, b) => Date.parse(a.utcDate) - Date.parse(b.utcDate));

  const nextGame = upcoming[0];
  const isHome = nextGame.homeTeam.id === teamId;
  const nextMatch = {
    date: formatDate(nextGame.utcDate),
    time: formatTime(nextGame.utcDate),
    opponent: isHome
      ? nextGame.awayTeam.shortName
      : nextGame.homeTeam.shortName,
    competition: nextGame.competition.name,
    venue: "Missing",
  };

  return { nextMatch, recentResults };
}

async function refreshGames(teamId) {
  const params = new URLSearchParams({ limit: "100" });
  const response = await fetch(
    `https://api.football-data.org/v4/teams/${teamId}/matches?` +
      params.toString(),
    {
      headers: { "X-Auth-Token": process.env.FD_KEY },
    }
  );
  const data = await response.json();

  await qRun(
    `
    insert into games_cache (team_id, payload, updated_at) 
    values (?, ?, strftime('%s','now'))
    on conflict (team_id) do update 
    set payload = excluded.payload, updated_at = excluded.updated_at
    `,
    [teamId, JSON.stringify(data)]
  );

  return {
    ...formatPayload(teamId, data),
    updatedAt: Math.floor(Date.now() / 1000),
  };
}

router.get("/games/:teamId", async (req, res) => {
  const teamId = Number(req.params.teamId);

  const row = await qGet(
    `select payload, updated_at from games_cache where team_id = ?`,
    [teamId]
  );
  if (row) {
    const data = JSON.parse(row.payload);
    return res.json({
      ...formatPayload(teamId, data),
      updatedAt: row.updated_at,
    });
  } else {
    return res.json(await refreshGames(teamId));
  }
});

router.post("/games/:teamId/refresh", async (req, res) => {
  const teamId = Number(req.params.teamId);
  res.json(await refreshGames(teamId));
});

export default router;
