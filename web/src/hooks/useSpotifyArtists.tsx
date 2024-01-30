import { SpotifyContext } from '@/context/spotifyContext';
import { getTopContent } from '@/services/api';
import { Artists } from '@/types/artists';
import { getToken } from '@/utils/keys';
import { useContext } from 'react';
import { useQuery } from 'react-query';

export default function useSpotifyArtists() {
  const { timeRangeArtists } = useContext(SpotifyContext);

  const token = getToken();

  const { data: artists, isFetching } = useQuery<Artists[]>(
    ['artists', timeRangeArtists],
    async () => {
      const { data } = await getTopContent('artists', timeRangeArtists);
      return data.items;
    },
    {
      staleTime: 3000 * 60,
      enabled: !!token,
    },
  );

  return {
    artists,
    isFetching,
  };
}
