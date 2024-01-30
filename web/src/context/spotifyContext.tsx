'use client';

import { ReactNode, createContext, useState } from 'react';

export type TimeRange = 'medium_term' | 'long_term' | 'short_term';
export type PlaylistFilter = 'all' | 'others' | 'me';

interface SpotifyContextProps {
  timeRangeTracks: TimeRange;
  timeRangeArtists: TimeRange;
  playlistFilter: PlaylistFilter;
  playlistId: string | null;
  handleTimeRange: (type: 'tracks' | 'artists', timeRange: TimeRange) => void;
  handlePlaylistId: (id: string | null) => void;
  handlePlaylistFilter: (filter: PlaylistFilter) => void;
}

const INITIAL_STATE: SpotifyContextProps = {
  timeRangeTracks: 'medium_term',
  timeRangeArtists: 'medium_term',
  playlistFilter: 'all',
  playlistId: null,
  handleTimeRange: () => {},
  handlePlaylistId: () => {},
  handlePlaylistFilter: () => {},
};

export const SpotifyContext = createContext<SpotifyContextProps>(INITIAL_STATE);

export default function SpotifyProvider({ children }: { children: ReactNode }) {
  const [timeRangeTracks, setTimeRangeTracks] = useState<TimeRange>('medium_term');
  const [timeRangeArtists, setTimeRangeArtists] = useState<TimeRange>('medium_term');
  const [playlistFilter, setPlaylistFilter] = useState<PlaylistFilter>('all');
  const [playlistId, setPlaylistId] = useState<string | null>(null);

  const handleTimeRange = (type: 'tracks' | 'artists', timeRange: TimeRange) => {
    if (type === 'tracks' && timeRange !== timeRangeTracks) {
      setTimeRangeTracks(timeRange);
    } else if (timeRange !== timeRangeArtists) {
      setTimeRangeArtists(timeRange);
    }
  };

  const handlePlaylistFilter = (filter: PlaylistFilter) => setPlaylistFilter(filter);

  const handlePlaylistId = (id: string | null) => setPlaylistId(id);

  return (
    <SpotifyContext.Provider
      value={{
        playlistId,
        timeRangeArtists,
        timeRangeTracks,
        playlistFilter,
        handleTimeRange,
        handlePlaylistId,
        handlePlaylistFilter,
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
}
