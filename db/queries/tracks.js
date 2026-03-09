import db from "#db/client";

export async function getTracks() {
  const sql = `
    SELECT *
    FROM tracks
    ORDER BY id;
  `;

  const result = await db.query(sql);
  return result.rows;
}

export async function getTrackById(id) {
  const sql = `
    SELECT *
    FROM tracks
    WHERE id = $1;
  `;

  const result = await db.query(sql, [id]);
  return result.rows[0];
}