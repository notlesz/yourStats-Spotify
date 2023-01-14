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
import { getToken } from '../utils/keys';

export type TimeRange = 'medium_term' | 'long_term' | 'short_term';

export default function useSpotify() {
  const [timeRangeTracks, setTimeRangeTracks] = useState<TimeRange>('medium_term');
  const [timeRangeArtists, setTimeRangeArtists] = useState<TimeRange>('medium_term');
  const [playlistId, setPlaylistId] = useState<string | null>(null);

  const { user } = useContext(UserContext);
  const token = getToken();

  const { data: playlist, isFetching: isFetchingPlaylist } = useQuery<Playlists[]>(
    'playlist',
    async () => {
      const { data } = await getUserPlaylists();
      return data.items;
    },
    {
      staleTime: 3000 * 60,
      enabled: token ? true : false,
    },
  );

  const { data: tracks, isFetching: isFetchingTracks } = useQuery<Tracks[]>(
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

  const { data: artists, isFetching: isFetchingArtists } = useQuery<Artists[]>(
    ['artists', timeRangeArtists],
    async () => {
      const { data } = await getTopContent('artists', timeRangeArtists);
      return data.items;
    },
    {
      staleTime: 3000 * 60,
      enabled: token ? true : false,
    },
  );

  const { data: currentlyPlaying, isFetching: isFetchingCurrently } = useQuery<Tracks>(
    'currentlyPlaying',
    async () => {
      const { data } = await getCurrentlyPlaying();
      return data.item;
    },
    {
      refetchInterval: 1000 * 60, // 1 min
      enabled: token && user ? true : false,
    },
  );

  const { data: playlistById, isFetching: isFetchingPlaylistById } = useQuery<Playlists>(
    ['playlistId', playlistId],
    async () => {
      if (playlistId) {
        const { data } = await getPlaylistById(playlistId);
        return data;
      }
    },
    {
      staleTime: 3000 * 60,
      enabled: token ? true : false,
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
