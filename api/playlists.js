import express from "express";
import { requireUser } from "#api/authentication";
import {
  getPlaylistsByOwnerId,
  getPlaylistById,
  createPlaylist,
  getTracksByPlaylistId,
  addTrackToPlaylist,
} from "#db/queries/playlists";
import { getTrackById } from "#db/queries/tracks";

const playlistsRouter = express.Router();

playlistsRouter.use(requireUser);

playlistsRouter.get("/", async function (request, response, next) {
  try {
    const playlists = await getPlaylistsByOwnerId(request.user.id);
    response.send(playlists);
  } catch (error) {
    next(error);
  }
});

playlistsRouter.post("/", async function (request, response, next) {
  try {
    const name = request.body?.name?.trim();
    const description = request.body?.description?.trim();

    if (!name || !description) {
      return response
        .status(400)
        .send({ error: "Name and description are required." });
    }

    const playlist = await createPlaylist(name, description, request.user.id);

    response.status(201).send(playlist);
  } catch (error) {
    next(error);
  }
});

playlistsRouter.get("/:id", async function (request, response, next) {
  try {
    const playlistId = Number(request.params.id);

    if (!Number.isInteger(playlistId)) {
      return response
        .status(400)
        .send({ error: "Playlist id must be a number." });
    }

    const playlist = await getPlaylistById(playlistId);

    if (!playlist) {
      return response.status(404).send({ error: "Playlist not found." });
    }

    if (playlist.owner_id !== request.user.id) {
      return response.status(403).send({ error: "Forbidden." });
    }

    const tracks = await getTracksByPlaylistId(playlistId);

    response.send({
      ...playlist,
      tracks,
    });
  } catch (error) {
    next(error);
  }
});

playlistsRouter.get("/:id/tracks", async function (request, response, next) {
  try {
    const playlistId = Number(request.params.id);

    if (!Number.isInteger(playlistId)) {
      return response
        .status(400)
        .send({ error: "Playlist id must be a number." });
    }

    const playlist = await getPlaylistById(playlistId);

    if (!playlist) {
      return response.status(404).send({ error: "Playlist not found." });
    }

    if (playlist.owner_id !== request.user.id) {
      return response.status(403).send({ error: "Forbidden." });
    }

    const tracks = await getTracksByPlaylistId(playlistId);
    response.send(tracks);
  } catch (error) {
    next(error);
  }
});

playlistsRouter.post("/:id/tracks", async function (request, response, next) {
  try {
    const playlistId = Number(request.params.id);
    const trackId = Number(request.body?.trackId);

    if (!Number.isInteger(playlistId)) {
      return response
        .status(400)
        .send({ error: "Playlist id must be a number." });
    }

    if (!Number.isInteger(trackId)) {
      return response.status(400).send({ error: "Track id must be a number." });
    }

    const playlist = await getPlaylistById(playlistId);
    if (!playlist) {
      return response.status(404).send({ error: "Playlist not found." });
    }

    if (playlist.owner_id !== request.user.id) {
      return response.status(403).send({ error: "Forbidden." });
    }

    const track = await getTrackById(trackId);
    if (!track) {
      return response.status(400).send({ error: "Track not found." });
    }

    const playlistTrack = await addTrackToPlaylist(playlistId, trackId);
    response.status(201).send(playlistTrack);
  } catch (error) {
    next(error);
  }
});

export default playlistsRouter;
