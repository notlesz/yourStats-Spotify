import { spotifyFetch } from '@/lib/spotify';
import GenresView from '@/components/views/GenresView';

export default async function GenresPage() {
  // Fetch top artists to calculate genres
  const { data } = await spotifyFetch('/me/top/artists?time_range=medium_term&limit=50');

  return <GenresView artists={data?.items || []} />;
}
