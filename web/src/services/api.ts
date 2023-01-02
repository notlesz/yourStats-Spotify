import axios, { AxiosResponse } from 'axios';
import { userToken } from '../types/auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER,
});

export const getAccessToken = async (code: string): Promise<AxiosResponse<userToken>> =>
  await api.post('/callback', {
    code,
  });

export const getUserData = async (token: string): Promise<AxiosResponse> =>
  await api.get('/user', {
    headers: {
      Authorization: token,
    },
  });

export const getTopContent = async (
  type: string,
  time_range: string,
  token: string,
): Promise<AxiosResponse> =>
  await api.get('/user/top', {
    headers: {
      Authorization: token,
    },
    params: {
      type,
      time_range,
    },
  });

export const getUserPlaylists = async (token: string): Promise<AxiosResponse> =>
  await api.get('/user/playlists', {
    headers: {
      Authorization: token,
    },
  });

export const getCurrentlyPlaying = async (token: string): Promise<AxiosResponse> =>
  await api.get('/user/currently-playing', {
    headers: {
      Authorization: token,
    },
  });
