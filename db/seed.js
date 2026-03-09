import db from "#db/client";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const tracks = [
    { name: "Morning Energy", duration_ms: 180000 },
    { name: "City Lights", duration_ms: 210000 },
    { name: "Ocean Drive", duration_ms: 195000 },
    { name: "Late Night Walk", duration_ms: 200000 },
    { name: "Golden Hour", duration_ms: 175000 },
    { name: "Neon Dreams", duration_ms: 220000 },
    { name: "Soft Rain", duration_ms: 190000 },
    { name: "Quiet Thoughts", duration_ms: 205000 },
    { name: "Highway Run", duration_ms: 215000 },
    { name: "Chill Breeze", duration_ms: 185000 },
    { name: "Deep Focus", duration_ms: 240000 },
    { name: "Weekend Escape", duration_ms: 230000 },
    { name: "Night Drive", duration_ms: 210000 },
    { name: "Slow Sunrise", duration_ms: 200000 },
    { name: "Dream Sequence", duration_ms: 225000 },
    { name: "Electric Pulse", duration_ms: 210000 },
    { name: "Mountain Air", duration_ms: 195000 },
    { name: "Coffee Break", duration_ms: 180000 },
    { name: "After Hours", duration_ms: 205000 },
    { name: "Calm Horizon", duration_ms: 215000 },
  ];

  for (const track of tracks) {
    await db.query(
      `INSERT INTO tracks (name, duration_ms)
       VALUES ($1, $2)`,
      [track.name, track.duration_ms],
    );
  }

  console.log("Tracks seeded.");

  const playlists = [
    {
      name: "Morning Motivation",
      description: "Upbeat songs to start the day",
    },
    {
      name: "Late Night Coding",
      description: "Focus music for programming sessions",
    },
    { name: "Chill Vibes", description: "Relaxing tracks for unwinding" },
    { name: "Road Trip", description: "Music for long drives" },
    { name: "Rainy Day", description: "Calm songs for quiet afternoons" },
    { name: "Workout Energy", description: "High energy tracks for the gym" },
    { name: "Deep Focus", description: "Minimal distraction background music" },
    {
      name: "Evening Wind Down",
      description: "Slower music for relaxing evenings",
    },
    { name: "Creative Flow", description: "Songs to help creative thinking" },
    { name: "Weekend Relax", description: "Easy listening for free time" },
  ];

  for (const playlist of playlists) {
    await db.query(
      `INSERT INTO playlists (name, description)
       VALUES ($1, $2)`,
      [playlist.name, playlist.description],
    );
  }

  console.log("Playlists seeded.");

  const playlistsTracks = [
    { playlist_id: 1, track_id: 1 },
    { playlist_id: 1, track_id: 2 },
    { playlist_id: 1, track_id: 3 },

    { playlist_id: 2, track_id: 4 },
    { playlist_id: 2, track_id: 5 },

    { playlist_id: 3, track_id: 6 },
    { playlist_id: 3, track_id: 7 },

    { playlist_id: 4, track_id: 8 },
    { playlist_id: 4, track_id: 9 },

    { playlist_id: 5, track_id: 10 },

    { playlist_id: 6, track_id: 11 },
    { playlist_id: 7, track_id: 12 },
    { playlist_id: 8, track_id: 13 },
    { playlist_id: 9, track_id: 14 },
    { playlist_id: 10, track_id: 15 },
  ];

  for (const entry of playlistsTracks) {
    await db.query(
      `INSERT INTO playlists_tracks (playlist_id, track_id)
       VALUES ($1, $2)`,
      [entry.playlist_id, entry.track_id],
    );
  }

  console.log("Playlists_tracks seeded.");
}
