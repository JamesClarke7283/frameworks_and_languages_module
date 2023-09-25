import {DB}  from "../deps.ts";

// Create an in-memory SQLite database
const db = new DB(":memory:");

db.query(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    keywords TEXT,
    description TEXT,
    lat REAL,
    lon REAL,
    date_from TEXT,
    date_to TEXT
  );
`);

export default db;
