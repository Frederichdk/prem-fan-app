import Database from "better-sqlite3";

const db = new Database("app.db");

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

export default db;
