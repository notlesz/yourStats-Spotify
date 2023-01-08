import { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { UserContext } from '../context/userContext';
import {
  getCurrentlyPlaying,
  getPlaylistById,
  getTopContent,
  getUserPlaylists,
} from '../services/api';
import { Artists } from '../types/artists';
import { Playlists } from '../types/playlists';
import { Tracks } from '../types/tracks';

export type TimeRange = 'medium_term' | 'long_term' | 'short_term';

export default function useSpotify() {
  const [timeRangeTracks, setTimeRangeTracks] = useState<TimeRange>('medium_term');
  const [timeRangeArtists, setTimeRangeArtists] = useState<TimeRange>('medium_term');
  const [playlistId, setPlaylistId] = useState<string | null>(null);

  const { user } = useContext(UserContext);

  const token = localStorage.getItem('token_user') || null;

  const { data: playlist, isFetching: isFetchingPlaylist } = useQuery<Playlists[]>(
    'playlist',
    async () => {
      if (token) {
        const { data } = await getUserPlaylists(token);
        return data.items;
      }
    },
    {
      staleTime: 3000 * 60,
    },
  );

  const { data: tracks, isFetching: isFetchingTracks } = useQuery<Tracks[]>(
    ['tracks', timeRangeTracks],
    async () => {
      if (token) {
        const { data } = await getTopContent('tracks', timeRangeTracks, token);
        return data.items;
      }
    },
    {
      staleTime: 3000 * 60,
    },
  );

  const { data: artists, isFetching: isFetchingArtists } = useQuery<Artists[]>(
    ['artists', timeRangeArtists],
    async () => {
      if (token) {
        const { data } = await getTopContent('artists', timeRangeArtists, token);
        return data.items;
      }
    },
    {
      staleTime: 3000 * 60,
    },
  );

  const { data: currentlyPlaying, isFetching: isFetchingCurrently } = useQuery<Tracks>(
    'currentlyPlaying',
    async () => {
      if (token && user) {
        const { data } = await getCurrentlyPlaying(token);
        return data.item;
      }
    },
    {
      refetchInterval: 1000 * 30, // 30 seconds
    },
  );

  const { data: playlistById, isFetching: isFetchingPlaylistById } = useQuery<Playlists>(
    ['playlistId', playlistId],
    async () => {
      if (playlistId && token) {
        const { data } = await getPlaylistById(playlistId, token);
        return data;
      }
    },
    {
      staleTime: 3000 * 60,
    },
  );

  const handleTimeRange = (type: 'tracks' | 'artists', timeRange: TimeRange) => {
    if (type === 'tracks') {
      if (timeRange !== timeRangeTracks) {
        setTimeRangeTracks(timeRange);
      }
    } else {
      if (timeRange !== timeRangeArtists) {
        setTimeRangeArtists(timeRange);
      }
    }
  };

  const handlePlaylistId = (id: string | null) => {
    setPlaylistId(id);
  };

  return {
    artists,
    user,
    tracks,
    playlist,
    playlistById,
    currentlyPlaying,
    timeRangeArtists,
    timeRangeTracks,
    handleTimeRange,
    isFetchingArtists,
    isFetchingCurrently,
    isFetchingPlaylist,
    isFetchingTracks,
    isFetchingPlaylistById,
    handlePlaylistId,
  };
}
