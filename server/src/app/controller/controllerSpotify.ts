import axios from "axios";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { api } from "../lib/axios";

dotenv.config();

const querystring = require("querystring");
const redirect_uri = process.env.REDIRECT_URI;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

export const getAccessToken = async (req: Request, res: Response) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).send({
      message: "Invalid Code",
    });
  }

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
    res.status(201).json(data);
  } catch (error: any) {
    return res.status(error.response.data.error.status).json({
      message: error.response.data.error.message,
    });
  }
};

export const getUserData = async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({
      message: "Invalid Access Token",
    });
  }
  try {
    const { data } = await api.get("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.status(200).send(data);
  } catch (error: any) {
    return res.status(error.response.data.error.status).json({
      message: error.response.data.error.message,
    });
  }
};

export const getUserTopContent = async (req: Request, res: Response) => {
  const { type, time_range } = req.query;
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({
      message: "Invalid Access Token",
    });
  }

  try {
    const { data } = await api.get(`/me/top/${type}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        time_range,
        limit: 50,
      },
    });
    return res.status(200).send(data);
  } catch (error: any) {
    return res.status(error.response.data.error.status).json({
      message: error.response.data.error.message,
    });
  }
};

export const getUserPlaylists = async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({
      message: "Invalid Access Token",
    });
  }

  try {
    const { data } = await api.get("/me/playlists", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 50,
      },
    });
    return res.status(200).send(data);
  } catch (error: any) {
    return res.status(error.response.data.error.status).json({
      message: error.response.data.error.message,
    });
  }
};

export const getCurrentlyPlaying = async (req: Request, res: Response) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({
      message: "Invalid Access Token",
    });
  }

  try {
    const { data } = await api.get("/me/player/currently-playing", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.status(200).send(data);
  } catch (error: any) {
    return res.status(error.response.data.error.status).json({
      message: error.response.data.error.message,
    });
  }
};
