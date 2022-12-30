import axios, { AxiosResponse } from "axios";
import { userToken } from "../types/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER ?? "http://localhost:3333",
});

export const getAccessToken = async (
  code: string
): Promise<AxiosResponse<userToken>> =>
  await api.post("/callback", {
    code,
  });

export const getUserData = (token: string): Promise<AxiosResponse> =>
  api.get("/user", {
    headers: {
      Authorization: token,
    },
  });

export const getTopContent = (
  type: string,
  time_range: string,
  token: string
): Promise<AxiosResponse> =>
  api.get("/user/top", {
    headers: {
      Authorization: token,
    },
    params: {
      type,
      time_range,
    },
  });

export const getUserPlaylists = (token: string): Promise<AxiosResponse> =>
  api.get("/user/playlists", {
    headers: {
      Authorization: token,
    },
  });

export const getCurrentlyPlaying = (token: string): Promise<AxiosResponse> =>
  api.get("/user/currently-playing", {
    headers: {
      Authorization: token,
    },
  });
