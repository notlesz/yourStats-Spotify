import axios from "axios";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { api } from "../lib/axios";

dotenv.config();

const redirect_uri = process.env.REDIRECT_URI;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

export const getAccessToken = async (req: Request, res: Response) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({
      message: "Invalid Code",
    });
  }

  try {
    const { data } = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code: code!,
        redirect_uri: redirect_uri!,
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
    if (error.response.data.error.status) {
      return res.status(error.response.data.error.status).json({
        message: error.response.data.error.message,
      });
    }
    return res.status(400).json({
      message: "Falha na conexão com o servidor",
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
    return res.status(200).json(data);
  } catch (error: any) {
    if (error.response.data.error.status) {
      return res.status(error.response.data.error.status).json({
        message: error.response.data.error.message,
      });
    }
    return res.status(400).json({
      message: "Falha na conexão com o servidor",
    });
  }
};

export const getUserTopContent = async (req: Request, res: Response) => {
  const { type, time_range } = req.query;
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
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
    return res.status(200).json(data);
  } catch (error: any) {
    if (error.response.data.error.status) {
      return res.status(error.response.data.error.status).json({
        message: error.response.data.error.message,
      });
    }
    return res.status(400).json({
      message: "Falha na conexão com o servidor",
    });
  }
};

export const getUserPlaylists = async (req: Request, res: Response) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Invalid Access Token",
    });
  }

  try {
    console.log("try", token);

    const { data } = await api.get("/me/playlists", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 50,
      },
    });
    return res.status(200).json(data);
  } catch (error: any) {
    if (error.response.data.error.status) {
      return res.status(error.response.data.error.status).json({
        message: error.response.data.error.message,
      });
    }
    return res.status(400).json({
      message: "Falha na conexão com o servidor",
    });
  }
};

export const getCurrentlyPlaying = async (req: Request, res: Response) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Invalid Access Token",
    });
  }

  try {
    const response = await api.get("/me/player/currently-playing", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.status(response.status).json(response?.data);
  } catch (error: any) {
    console.log(error.response);
    if (error.response.data.error.status) {
      return res.status(error.response.data.error.status).json({
        message: error.response.data.error.message,
      });
    }
    return res.status(400).json({
      message: "Falha na conexão com o servidor",
    });
  }
};

export const getPlaylistById = async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const { id } = req.params;

  try {
    const response = await api.get(`/playlists/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.status(response.status).send(response.data);
  } catch (error: any) {
    if (error.response.data.error.status) {
      return res.status(error.response.data.error.status).json({
        message: error.response.data.error.message,
      });
    }
    return res.status(400).json({
      message: "Falha na conexão com o servidor",
    });
  }
};
