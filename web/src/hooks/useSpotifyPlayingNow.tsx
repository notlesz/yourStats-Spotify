import { UserContext } from '@/context/userContext';
import { getCurrentlyPlaying } from '@/services/api';
import { getToken } from '@/utils/keys';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { Tracks } from '../types/tracks';

export default function useSpotifyPlayingNow() {
  const { user } = useContext(UserContext);
  const token = getToken();

  const { data: currentlyPlaying, isFetching } = useQuery<Tracks>(
    'currentlyPlaying',
    async () => {
      const { data } = await getCurrentlyPlaying();
      return data.item;
    },
    {
      refetchInterval: 1000 * 60,
      enabled: token && user ? true : false,
    },
  );

  return {
    currentlyPlaying,
    isFetching,
  };
}
