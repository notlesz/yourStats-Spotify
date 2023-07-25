import { useContext } from 'react';
import { SpotifyContext } from '../context/spotifyContext';
import { getPlaylistById } from '../services/api';
import { getToken } from '../utils/keys';
import { useQuery } from 'react-query';
import { Playlists } from '../types/playlists';

export default function useSpotifySinglePlaylist() {
  const { playlistId } = useContext(SpotifyContext);

  const token = getToken();

  const { data, isFetching } = useQuery<Playlists>(
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

  return {
    singlePlaylist: data,
    isFetching,
  };
}
