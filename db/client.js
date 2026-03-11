import pg from "pg";

const connectionString =
  process.env.DATABASE_URL || "postgres://localhost:5432/jukebox";

const db = new pg.Client(connectionString);

export default db;
