import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

export const getAccessToken = async (code: string): Promise<AxiosResponse> =>
  await api.post("/callback", {
    code,
  });

export const getUserData = ():Promise<AxiosResponse> => api.get('/user')

export const getTopContent = (type: string, time_range: string):Promise<AxiosResponse> => api.get('/user/top', {
  params: {
    type,
    time_range
  }
});

export const getUserPlaylists = ():Promise<AxiosResponse> => api.get('/user/playlists');

export const getCurrentlyPlaying = ():Promise<AxiosResponse> => api.get('/user/currently-playing');