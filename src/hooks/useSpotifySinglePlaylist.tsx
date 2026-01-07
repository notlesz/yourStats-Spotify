'use client';

import { useSpotifyStore } from '@/store/useSpotifyStore';
import { getPlaylist } from '@/actions/spotify';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Playlists } from '../types/playlists';

export default function useSpotifySinglePlaylist(id?: string, initialData?: Playlists) {
  const playlistId = useSpotifyStore((state) => state.playlistId);

  const activeId = id || playlistId;

  const { data, isFetching } = useQuery<Playlists>({
    queryKey: ['playlistId', activeId],
    queryFn: async () => {
      if (activeId) {
        const data = await getPlaylist(activeId);
        return data;
      }
      return null;
    },
    staleTime: 3000 * 60,
    enabled: !!activeId,
    initialData: activeId === id ? initialData : undefined,
  });

  return {
    singlePlaylist: data,
    isFetching,
  };
}
