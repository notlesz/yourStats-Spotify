'use client';

import { useSpotifyStore } from '@/store/useSpotifyStore';
import { Artists } from '@/types/artists';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTopItems } from '@/actions/spotify';

export default function useSpotifyArtists(initialData?: Artists[]) {
  const timeRangeArtists = useSpotifyStore((state) => state.timeRangeArtists);

  const { data: artists, isFetching } = useQuery<Artists[]>({
    queryKey: ['artists', timeRangeArtists],
    queryFn: async () => {
      const data = await getTopItems({ type: 'artists', time_range: timeRangeArtists });
      return data.items;
    },
    staleTime: 3000 * 60,
    initialData: timeRangeArtists === 'medium_term' ? initialData : undefined,
  });

  return {
    artists,
    isFetching,
  };
}
