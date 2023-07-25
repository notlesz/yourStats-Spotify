import { useContext } from 'react';
import { getToken } from '../utils/keys';
import { SpotifyContext } from '../context/spotifyContext';
import { useQuery } from 'react-query';
import { Tracks } from '../types/tracks';
import { getTopContent } from '../services/api';

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
