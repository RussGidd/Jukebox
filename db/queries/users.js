import db from "#db/client";

export async function createUser(username, password) {
  const sql = `
    INSERT INTO users (username, password)
    VALUES ($1, $2)
    RETURNING id, username;
  `;

  const result = await db.query(sql, [username, password]);
  return result.rows[0];
}

export async function getUserByUsername(username) {
  const sql = `
    SELECT *
    FROM users
    WHERE username = $1;
  `;

  const result = await db.query(sql, [username]);
  return result.rows[0];
}

export async function getUserById(id) {
  const sql = `
    SELECT id, username
    FROM users
    WHERE id = $1;
  `;

  const result = await db.query(sql, [id]);
  return result.rows[0];
}