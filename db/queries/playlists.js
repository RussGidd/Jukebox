import db from "#db/client";

export async function getPlaylistsByOwnerId(ownerId) {
  const sql = `
    SELECT *
    FROM playlists
    WHERE owner_id = $1
    ORDER BY id;
  `;

  const result = await db.query(sql, [ownerId]);
  return result.rows;
}

export async function getPlaylistById(id) {
  const sql = `
    SELECT *
    FROM playlists
    WHERE id = $1;
  `;

  const result = await db.query(sql, [id]);
  return result.rows[0];
}

export async function createPlaylist(name, description, ownerId) {
  const sql = `
    INSERT INTO playlists (name, description, owner_id)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const result = await db.query(sql, [name, description, ownerId]);
  return result.rows[0];
}

export async function getTracksByPlaylistId(playlistId) {
  const sql = `
    SELECT tracks.*
    FROM tracks
    JOIN playlists_tracks
      ON tracks.id = playlists_tracks.track_id
    WHERE playlists_tracks.playlist_id = $1
    ORDER BY tracks.id;
  `;

  const result = await db.query(sql, [playlistId]);
  return result.rows;
}

export async function addTrackToPlaylist(playlistId, trackId) {
  const sql = `
    INSERT INTO playlists_tracks (playlist_id, track_id)
    VALUES ($1, $2)
    RETURNING *;
  `;

  const result = await db.query(sql, [playlistId, trackId]);
  return result.rows[0];
}
