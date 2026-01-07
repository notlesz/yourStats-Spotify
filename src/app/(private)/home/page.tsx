import { spotifyFetch } from '@/lib/spotify';
import DashboardView from '@/components/views/DashboardView';

export default async function Home() {
  // Fetch initial data for SSR with medium_term default (matching the default context state)
  const [tracksRes, artistsRes, playlistsRes] = await Promise.all([
    spotifyFetch('/me/top/tracks?time_range=medium_term&limit=50'),
    spotifyFetch('/me/top/artists?time_range=medium_term&limit=50'),
    spotifyFetch('/me/playlists?limit=50'),
  ]);

  return (
    <DashboardView
      initialTracks={tracksRes.data?.items}
      initialArtists={artistsRes.data?.items}
      initialPlaylists={playlistsRes.data?.items}
    />
  );
}
