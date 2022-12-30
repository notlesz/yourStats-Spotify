import axios from "axios";
import Router from "express";
import {
  getCurrentlyPlaying,
  getUserData,
  getUserPlaylists,
  getUserTopContent,
} from "./app/controller/controllerSpotify";

const redirect_uri = process.env.REDIRECT_URI;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

const querystring = require("querystring");

export const routes = Router();

routes.post("/callback", async (req, res) => {
  const { code } = req.body;

  try {
    const { data } = await axios.post(
      "https://accounts.spotify.com/api/token",
      querystring.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirect_uri,
      }),
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            `${client_id}:${client_secret}`
          ).toString("base64")}`,
        },
      }
    );
    console.log(data);
  } catch (error) {
    console.error(error);
  }
});

routes.get("/user", async (req, res) => {
  const authToken = req.headers.authorization!;
  const response = await getUserData(authToken);
  return res.status(response.status).send(response.data);
});

routes.get("/user/top", async (req, res) => {
  const query = {
    type: req.query.type as string,
    time_range: req.query.time_range as string,
  };
  const authToken = req.headers.authorization!;
  const response = await getUserTopContent(
    authToken,
    query.type,
    query.time_range
  );

  return res.status(response.status).send(response.data);
});

routes.get("/user/playlists", async (req, res) => {
  const authToken = req.headers.authorization!;
  const response = await getUserPlaylists(authToken);

  return res.status(response.status).send(response.data);
});

routes.get("/user/currently-playing", async (req, res) => {
  const authToken = req.headers.authorization!;
  const response = await getCurrentlyPlaying(authToken);

  return res.status(response.status).send(response.data);
});
