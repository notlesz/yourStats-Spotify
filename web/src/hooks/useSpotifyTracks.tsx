import { SpotifyContext } from '@/context/spotifyContext';
import { getTopContent } from '@/services/api';
import { getToken } from '@/utils/keys';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { Tracks } from '../types/tracks';

export default function useSpotifyTracks() {
  const { timeRangeTracks } = useContext(SpotifyContext);

  const token = getToken();

  const { data: tracks, isFetching } = useQuery<Tracks[]>(
    ['tracks', timeRangeTracks],
    async () => {
      if (token) {
        const { data } = await getTopContent('tracks', timeRangeTracks);
        return data.items;
      }
    },
    {
      staleTime: 3000 * 60,
      enabled: token ? true : false,
    },
  );

  return {
    tracks,
    isFetching,
  };
}
