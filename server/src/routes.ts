import Router from "express";
import { AccessToken } from "./types/accessToken";
import {
  getAccessToken,
  getCurrentlyPlaying,
  getUserData,
  getUserPlaylists,
  getUserTopContent,
} from "./app/controller/controllerSpotify";


let token: AccessToken | "";

export const routes = Router();

routes.post("/callback", async (req, res) => {
  const { code } = req.body;

  const response = await getAccessToken(code);

  if (token !== "") {
    token = response;
    return res.status(200).send("OK");
  } else {
    token = response;
  }
  
});

routes.get("/user", async (req, res) => {
  if (token !== "") {
    const response = await getUserData(token);
    return res.send(response);
  }
});

routes.get("/user/top", async (req, res) => {
  const query = {
    type: req.query.type as string,
    time_range: req.query.time_range as string,
  };

  if (token !== "") {
    const response = await getUserTopContent(token, query);
    return res.send(response);
  }
});

routes.get("/user/playlists", async (req, res) => {
  if (token !== "") {
    const response = await getUserPlaylists(token);
    return res.send(response);
  }
});

routes.get("/user/currently-playing", async (req, res) => {
  if (token !== "") {
    const response = await getCurrentlyPlaying(token);
    return res.send(response);
  }
});
