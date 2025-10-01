import Database from "better-sqlite3";

const isCloudRun = Boolean(process.env.K_SERVICE); // set automatically in Cloud Run
const DB_PATH = isCloudRun ? "/tmp/app.db" : "app.db";

const db = new Database(DB_PATH);

db.exec(`
  create table if not exists favourites (
    user_id text primary key,
    team_id integer not null
  )
`);

db.exec(`
  create table if not exists standings_cache (
    competition text primary key,
    payload     text not null,
    updated_at  integer not null
  )
`);

db.exec(`
  create table if not exists news_cache (
    team_id integer primary key,
    payload     text not null,
    updated_at  integer not null
  )
`);

db.exec(`
  create table if not exists games_cache (
    team_id integer primary key,
    payload     text not null,
    updated_at  integer not null
  )
`);

export default db;
