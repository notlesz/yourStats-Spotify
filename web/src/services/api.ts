import axios, { AxiosResponse } from 'axios';
import useToast from '../hooks/useToast';
import { userToken } from '../types/auth';
import removeAllKeys from '../utils/removeKeys';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER,
  timeout: 10 * 1000,
});

const { handleToast } = useToast();

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      handleToast('error', 'É necessário realizar o login novamente! Você será redirecionado...');
      setTimeout(() => {
        document.location.href = document.location.origin;
        removeAllKeys();
      }, 2000);
    }
    return error;
  },
);

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
