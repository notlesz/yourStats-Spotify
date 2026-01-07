import { spotifyFetch } from '@/lib/spotify';
import { Metadata } from 'next';
import TopTracksView from '@/components/views/TopTracksView';
import TopArtistsView from '@/components/views/TopArtistsView';

interface PageProps {
  params: Promise<{ type: 'artists' | 'tracks' }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type } = await params;
  const title = type === 'artists' ? 'Top Artists' : 'Top Tracks';
  return {
    title: `${title} | yourStats`,
    description: `View your top ${type} on Spotify`,
  };
}

export default async function TopContent({ params }: PageProps) {
  const { type } = await params;

  // Fetch initial data (medium_term is default in hooks, so we match it here)
  const endpoint =
    type === 'artists'
      ? '/me/top/artists?time_range=medium_term&limit=50'
      : '/me/top/tracks?time_range=medium_term&limit=50';

  const { data } = await spotifyFetch(endpoint);

  if (type === 'tracks') {
    return <TopTracksView initialTracks={data?.items} />;
  }

  return <TopArtistsView initialArtists={data?.items} />;
}
