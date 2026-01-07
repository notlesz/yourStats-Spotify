import { create } from 'zustand';

export type TimeRange = 'medium_term' | 'long_term' | 'short_term';
export type PlaylistFilter = 'all' | 'others' | 'me';

interface SpotifyState {
  timeRangeTracks: TimeRange;
  timeRangeArtists: TimeRange;
  playlistFilter: PlaylistFilter;
  playlistId: string | null;

  actions: {
    handleTimeRange: (type: 'tracks' | 'artists', timeRange: TimeRange) => void;
    handlePlaylistId: (id: string | null) => void;
    handlePlaylistFilter: (filter: PlaylistFilter) => void;
  };
}

export const useSpotifyStore = create<SpotifyState>((set) => ({
  timeRangeTracks: 'medium_term',
  timeRangeArtists: 'medium_term',
  playlistFilter: 'all',
  playlistId: null,

  actions: {
    handleTimeRange: (type, timeRange) =>
      set((state) => ({
        [type === 'tracks' ? 'timeRangeTracks' : 'timeRangeArtists']: timeRange,
      })),
    handlePlaylistId: (id) => set({ playlistId: id }),
    handlePlaylistFilter: (filter) => set({ playlistFilter: filter }),
  },
}));
