import axios from "axios";
import dotenv from "dotenv";
import { api } from "../lib/axios";

dotenv.config();

const querystring = require("querystring");
const redirect_uri = process.env.REDIRECT_URI;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

export const getAccessToken = async (code: string) => {
  const accessToken = await axios({
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
  })
    .then((response) => response)
    .catch((error) => error);

  return accessToken;
};

export const getUserData = async (token: string) => {
  const response = await api
    .get("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response)
    .catch((error) => error);

  return response;
};

export const getUserTopContent = async (
  token: string,
  type: string,
  time_range: string,
) => {
  const response = await api
    .get(`/me/top/${type}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        time_range,
      },
    })
    .then((response) => response)
    .catch((error) => error);

  return response;
};

export const getUserPlaylists = async (token: string) => {
  const response = await api
    .get("/me/playlists", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 50,
      },
    })
    .then((response) => response)
    .catch((error) => error);

  return response;
};

export const getCurrentlyPlaying = async (token: string) => {
  const response = await api
    .get("/me/player/currently-playing", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response)
    .then((error) => error);

  return response;
};
