import { DB } from "../deps.ts";

// Create an in-memory SQLite database
const db = new DB(":memory:");

const sql = await Deno.readTextFile("src/db/sql/create_tables.sql");
const sqlStatements = sql.split(";").map((s) => s.trim()).filter((s) =>
  s.length > 0
);

for (const statement of sqlStatements) {
  db.query(statement);
}

export default db;
