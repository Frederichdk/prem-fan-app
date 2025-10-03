import { Router } from "express";
import { qRun, qGet } from "../db.js";

const router = Router();

router.get("/favourites/:userId", async (req, res) => {
  const { userId } = req.params;

  const row = await qGet("select team_id from favourites where user_id = ?", [
    userId,
  ]);

  res.json({ teamId: row ? row.team_id : null });
});

router.post("/favourites", async (req, res) => {
  const { userId, teamId } = req.body;

  if (!userId || !teamId) {
    return res.status(400).json({ error: "userId and teamId are required" });
  }

  await qRun(
    `
    insert into favourites (user_id, team_id)
    values (?, ?)
    on conflict(user_id) do update set team_id = excluded.team_id
    `,
    [userId, teamId]
  );
  console.log("Set", userId, "favourite team to", teamId);
  res.json({ ok: true });
});

router.delete("/favourites", async (req, res) => {
  const { userId, teamId } = req.body;

  if (!userId || !teamId) {
    return res.status(400).json({ error: "userId and teamId are required" });
  }

  await qRun(
    `
    delete from favourites where user_id = ? and team_id = ?
    `,
    [userId, teamId]
  );
  console.log("Removed", userId, "favourite team", teamId);
  res.json({ ok: true });
});

export default router;
