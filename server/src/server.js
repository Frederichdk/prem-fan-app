import "dotenv/config";
import express from "express";
import cors from "cors";
import favouritesRoutes from "./routes/favourites.js";
import standingsRoutes from "./routes/standings.js";
import newsRoutes from "./routes/news.js";
import gamesRoutes from "./routes/games.js";

const app = express();

app.use(cors({ origin: ["http://localhost:3000", "http://localhost:5173"] }));

app.use(express.json());

app.use("/api/v1", favouritesRoutes);

app.use("/api/v1", standingsRoutes);

app.use("/api/v1", newsRoutes);

app.use("/api/v1", gamesRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
