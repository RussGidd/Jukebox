import express from "express";
import { requireUser } from "#api/authentication";
import {
  getTracks,
  getTrackById,
  getPlaylistsByTrackIdAndOwnerId,
} from "#db/queries/tracks";

const tracksRouter = express.Router();

tracksRouter.get("/", async function (request, response, next) {
  try {
    const tracks = await getTracks();
    response.send(tracks);
  } catch (error) {
    next(error);
  }
});

tracksRouter.get("/:id", async function (request, response, next) {
  try {
    const trackId = Number(request.params.id);

    if (!Number.isInteger(trackId)) {
      return response.status(400).send({ error: "Track id must be a number." });
    }

    const track = await getTrackById(trackId);

    if (!track) {
      return response.status(404).send({ error: "Track not found." });
    }

    response.send(track);
  } catch (error) {
    next(error);
  }
});

tracksRouter.get(
  "/:id/playlists",
  requireUser,
  async function (request, response, next) {
    try {
      const trackId = Number(request.params.id);

      if (!Number.isInteger(trackId)) {
        return response
          .status(400)
          .send({ error: "Track id must be a number." });
      }

      const track = await getTrackById(trackId);

      if (!track) {
        return response.status(404).send({ error: "Track not found." });
      }

      const playlists = await getPlaylistsByTrackIdAndOwnerId(
        trackId,
        request.user.id,
      );

      response.send(playlists);
    } catch (error) {
      next(error);
    }
  },
);

export default tracksRouter;
