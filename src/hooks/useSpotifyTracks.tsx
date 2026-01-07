'use client';

import { useSpotifyStore } from '@/store/useSpotifyStore';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tracks } from '../types/tracks';
import { getTopItems } from '@/actions/spotify';

export default function useSpotifyTracks(initialData?: Tracks[]) {
  const timeRangeTracks = useSpotifyStore((state) => state.timeRangeTracks);

  const { data: tracks, isFetching } = useQuery<Tracks[]>({
    queryKey: ['tracks', timeRangeTracks],
    queryFn: async () => {
      const data = await getTopItems({ type: 'tracks', time_range: timeRangeTracks });
      return data.items;
    },
    staleTime: 3000 * 60,
    initialData: timeRangeTracks === 'medium_term' ? initialData : undefined,
  });

  return {
    tracks,
    isFetching,
  };
}
