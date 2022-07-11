import axios from "axios";
import Router from "express";
import dotenv from 'dotenv';

import { AccessToken } from "./types/accessToken";
const querystring = require("querystring");

dotenv.config();

let token: AccessToken | "";
const redirect_uri = process.env.REDIRECT_URI;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

export const routes = Router();

routes.post("/callback", async (req, res) => {

  const { code } = req.body;

  try {
    await axios({
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      data: querystring.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirect_uri,
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(
          `${client_id}:${client_secret}`
        ).toString("base64")}`,
      },
    }).then((response) => {
      token = response.data;
    });
    return res.status(200).send("OK");
  } catch (error) {
    console.log(error);
    token = "";
  }
});

routes.get("/user", async (req, res) => {
  if (token) {
    try {
      axios({
        method: "get",
        url: "https://api.spotify.com/v1/me",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token}`,
        },
      }).then((response) => {
        res.send(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }
});

routes.get("/user/top", async (req, res) => {
  const { type, time_range } = req.query;

  if (token) {
    try {
      axios({
        method: "get",
        url: `https://api.spotify.com/v1/me/top/${type}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token}`,
        },
        params: {
          time_range,
        },
      }).then((response) => {
        res.send(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }
});

routes.get("/user/playlists", async (req, res) => {
  if (token) {
    try {
      axios({
        method: "get",
        url: `https://api.spotify.com/v1/me/playlists`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token}`,
        },
        params: {
          limit: 50,
        },
      }).then((response) => res.send(response.data));
    } catch (error) {
      console.log(error);
    }
  }
});

routes.get("/user/currently-playing", async (req, res) => {
  if (token) {
    try {
      axios({
        method: "get",
        url: `https://api.spotify.com/v1/me/player/currently-playing`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token}`,
        },
      }).then((response) => res.send(response.data));
    } catch (error) {
      console.log(error);
    }
  }
});
