import { spotifyFetch } from '@/lib/spotify';
import { Playlists } from '@/types/playlists';
import { Metadata } from 'next';
import PlaylistDetailView from '@/components/views/PlaylistDetailView';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const { data } = await spotifyFetch<Playlists>(`/playlists/${id}`);

  return {
    title: `${data?.name || 'Playlist'} | yourStats`,
    description: data?.description || 'View playlist details',
  };
}

export default async function SinglePlaylist({ params }: PageProps) {
  const { id } = await params;
  const { data } = await spotifyFetch<Playlists>(`/playlists/${id}`);

  return <PlaylistDetailView playlist={data} />;
}
