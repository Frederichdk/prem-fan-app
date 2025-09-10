import "dotenv/config";
import express from "express";
import db from "./db.js";
import cors from "cors";

const app = express();

app.use(cors({ origin: ["http://localhost:3000", "http://localhost:5173"] }));

app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get("/favourites/:userId", (req, res) => {
  const { userId } = req.params;
  console.log("Get /favourites for", userId);

  const row = db
    .prepare("select team_id from favourites where user_id = ?")
    .get(userId);

  res.json({ teamId: row ? row.team_id : null });
});

app.post("/favourites", (req, res) => {
  const { userId, teamId } = req.body;

  if (!userId || !teamId) {
    return res.status(400).json({ error: "userId and teamId are required" });
  }

  db.prepare(
    `
    insert into favourites (user_id, team_id)
    values (?, ?)
    on conflict(user_id) do update set team_id = excluded.team_id
    `
  ).run(userId, teamId);

  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
