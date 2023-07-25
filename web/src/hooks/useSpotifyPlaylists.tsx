import { useQuery } from 'react-query';
import { Playlists } from '../types/playlists';
import { getUserPlaylists } from '../services/api';
import { getToken } from '../utils/keys';

export default function useSpotifyPlaylists() {
  const token = getToken();

  const { data: playlists, isFetching } = useQuery<Playlists[]>(
    'playlist',
    async () => {
      const { data } = await getUserPlaylists();
      return data.items;
    },
    {
      staleTime: 3000 * 60,
      enabled: token ? true : false,
    },
  );

  return {
    playlists,
    isFetching,
  };
}
