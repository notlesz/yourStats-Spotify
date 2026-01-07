import { spotifyFetch } from '@/lib/spotify';
import PlaylistsView from '@/components/views/PlaylistsView';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Playlists | yourStats',
  description: 'Explore your top playlists',
};

export default async function PlaylistAll() {
  const { data } = await spotifyFetch('/me/playlists?limit=50');

  return <PlaylistsView playlists={data?.items} />;
}
