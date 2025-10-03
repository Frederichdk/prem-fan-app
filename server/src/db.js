import { createClient } from "@libsql/client";

const { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } = process.env;
if (!TURSO_DATABASE_URL || !TURSO_AUTH_TOKEN) {
  throw new Error("Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN");
}

export const db = createClient({
  url: TURSO_DATABASE_URL,
  authToken: TURSO_AUTH_TOKEN,
});

export const qAll = async (sql, args = []) =>
  (await db.execute({ sql, args })).rows;

export const qGet = async (sql, args = []) =>
  (await db.execute({ sql, args })).rows[0] ?? null;

export const qRun = async (sql, args = []) => {
  await db.execute({ sql, args });
};

export async function initDb() {
  // favourites
  await qRun(`
    CREATE TABLE IF NOT EXISTS favourites (
      user_id   TEXT PRIMARY KEY,
      team_id   INTEGER NOT NULL
    )
  `);

  // standings_cache
  await qRun(`
    CREATE TABLE IF NOT EXISTS standings_cache (
      competition TEXT PRIMARY KEY,
      payload     TEXT NOT NULL,
      updated_at  INTEGER NOT NULL
    )
  `);

  // news_cache
  await qRun(`
    CREATE TABLE IF NOT EXISTS news_cache (
      team_id     INTEGER PRIMARY KEY,
      payload     TEXT NOT NULL,
      updated_at  INTEGER NOT NULL
    )
  `);

  // games_cache
  await qRun(`
    CREATE TABLE IF NOT EXISTS games_cache (
      team_id     INTEGER PRIMARY KEY,
      payload     TEXT NOT NULL,
      updated_at  INTEGER NOT NULL
    )
  `);
}
