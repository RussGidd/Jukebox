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

export async function getPlaylistsByTrackIdAndOwnerId(trackId, ownerId) {
  const sql = `
    SELECT playlists.*
    FROM playlists
    JOIN playlists_tracks
      ON playlists.id = playlists_tracks.playlist_id
    WHERE playlists_tracks.track_id = $1
      AND playlists.owner_id = $2
    ORDER BY playlists.id;
  `;

  const result = await db.query(sql, [trackId, ownerId]);
  return result.rows;
}
