import Router from "express";
import {
  getAccessToken,
  getCurrentlyPlaying,
  getUserData,
  getUserPlaylists,
  getUserTopContent,
} from "./app/controller/controllerSpotify";

export const routes = Router();

routes.post("/callback", getAccessToken);

routes.get("/user", getUserData);

routes.get("/user/top", getUserTopContent);

routes.get("/user/playlists", getUserPlaylists);

routes.get("/user/currently-playing", getCurrentlyPlaying);
