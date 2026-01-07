'use client';

import { getUserPlaylists } from '@/actions/spotify';
import { Playlists } from '@/types/playlists';
import { useQuery } from '@tanstack/react-query';

export default function useSpotifyPlaylists(initialData?: Playlists[]) {
  const { data: playlists, isFetching } = useQuery<Playlists[]>({
    queryKey: ['playlist'],
    queryFn: async () => {
      const data = await getUserPlaylists();
      return data.items;
    },
    staleTime: 3000 * 60,
    initialData,
  });

  return {
    playlists,
    isFetching,
  };
}
