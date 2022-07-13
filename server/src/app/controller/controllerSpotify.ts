import axios from "axios";
import dotenv from "dotenv";
import { AccessToken } from "../../types/accessToken";

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
  }).then((response) => response.data);

  return accessToken;
};

export const getUserData = async (token: AccessToken) => {
  const userData = await axios({
    method: "get",
    url: "https://api.spotify.com/v1/me",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.access_token}`,
    },
  }).then((response) => response.data);

  return userData;
};

export const getUserTopContent = async (
  token: AccessToken,
  query: { type: string; time_range: string }
) => {
  const { time_range, type } = query;

  const topContent = await axios({
    method: "get",
    url: `https://api.spotify.com/v1/me/top/${type}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.access_token}`,
    },
    params: {
      time_range,
    },
  }).then((response) => response.data);

  return topContent;
};

export const getUserPlaylists = async ({ access_token }: AccessToken) => {
  const playlists = await axios({
    method: "get",
    url: `https://api.spotify.com/v1/me/playlists`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    params: {
      limit: 50,
    },
  }).then((response) => response.data);

  return playlists;
};

export const getCurrentlyPlaying = async (token: AccessToken) => {
  const currentlyPlaying = await axios({
    method: "get",
    url: `https://api.spotify.com/v1/me/player/currently-playing`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.access_token}`,
    },
  }).then((response) => response.data );

  return currentlyPlaying;
};
