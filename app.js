import express from "express";
import tracksRouter from "#api/tracks";
import playlistsRouter from "#api/playlists";

const app = express();

app.use(express.json());

app.use("/tracks", tracksRouter);
app.use("/playlists", playlistsRouter);

app.use(function (error, request, response, next) {
  if (error.code === "23505") {
    return response.status(400).send({
      error: "That track is already in this playlist.",
    });
  }

  console.error(error);

  response.status(500).send({
    error: "Something went wrong on the server.",
  });
});

export default app;
