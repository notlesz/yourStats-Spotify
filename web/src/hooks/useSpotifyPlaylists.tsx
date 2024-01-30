import { getUserPlaylists } from '@/services/api';
import { Playlists } from '@/types/playlists';
import { getToken } from '@/utils/keys';
import { useQuery } from 'react-query';

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
      enabled: !!token,
    },
  );

  return {
    playlists,
    isFetching,
  };
}
