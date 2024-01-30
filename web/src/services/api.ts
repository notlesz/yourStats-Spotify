import useToast from '@/hooks/useToast';
import { userToken } from '@/types/auth';
import { getToken, removeAllKeys } from '@/utils/keys';
import axios, { AxiosResponse } from 'axios';

const token = getToken();

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER,
  timeout: 30 * 1000,
});

api.defaults.headers.common['Authorization'] = token?.access_token!;

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
    if (error.response.status >= 500) {
      handleToast('error', 'Falha na comunicação com servidor, tente mais tarde!');
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

export const getUserData = async (): Promise<AxiosResponse> => await api.get('/user');

export const getTopContent = async (type: string, time_range: string): Promise<AxiosResponse> =>
  await api.get('/user/top', {
    params: {
      type,
      time_range,
    },
  });

export const getUserPlaylists = async (): Promise<AxiosResponse> =>
  await api.get('/user/playlists');

export const getCurrentlyPlaying = async (): Promise<AxiosResponse> =>
  await api.get('/user/currently-playing');

export const getPlaylistById = async (id: string): Promise<AxiosResponse> =>
  await api.get(`/playlists/${id}`);
