import "dotenv/config";
import express from "express";
import cors from "cors";
import favouritesRoutes from "./routes/favourites.js";
import standingsRoutes from "./routes/standings.js";
import newsRoutes from "./routes/news.js";
import gamesRoutes from "./routes/games.js";
import { initDb } from "./db.js";

const app = express();

await initDb();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://localhost:5173",
      "http://localhost:8080",
      "https://frontend-757476437737.us-east1.run.app",
    ],
  })
);

app.use(express.json());

app.get("/health", (_req, res) => res.status(200).send("ok"));

app.use("/api/v1", favouritesRoutes);

app.use("/api/v1", standingsRoutes);

app.use("/api/v1", newsRoutes);

app.use("/api/v1", gamesRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
