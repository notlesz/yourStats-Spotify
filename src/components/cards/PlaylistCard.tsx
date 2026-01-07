import { Play, Music } from 'lucide-react';
import Link from 'next/link'; // Use next/link
import { cn } from '@/lib/utils';

interface PlaylistCardProps {
  playlist: any;
  delay?: number;
}

export const PlaylistCard = ({ playlist, delay = 0 }: PlaylistCardProps) => {
  const imageUrl = playlist.images?.[0]?.url || '/placeholder.png';
  const trackCount = playlist.tracks?.total || 0;

  return (
    <Link
      href={`/playlists/${playlist.id}`}
      className={cn(
        'group block rounded-xl bg-card p-4 transition-all duration-300 hover:bg-surface-hover hover:shadow-card animate-slide-up',
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className='relative aspect-square overflow-hidden rounded-lg'>
        <img
          src={imageUrl}
          alt={playlist.name}
          className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-105'
        />
        <div className='absolute inset-0 flex items-center justify-center bg-background/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
          <button className='flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-lg transition-transform duration-200 hover:scale-105'>
            <Play className='h-5 w-5 text-primary-foreground fill-primary-foreground ml-0.5' />
          </button>
        </div>
      </div>

      <div className='mt-4'>
        <h3 className='truncate font-semibold text-foreground group-hover:text-primary transition-colors'>
          {playlist.name}
        </h3>
        {/* playlist.description can be HTML encoded string from Spotify, but we render as text for safety now */}
        <p
          className='mt-1 truncate text-sm text-muted-foreground'
          dangerouslySetInnerHTML={{ __html: playlist.description || '' }}
        />
        <div className='mt-2 flex items-center gap-2 text-xs text-muted-foreground'>
          <Music className='h-3 w-3' />
          <span>{trackCount} músicas</span>
        </div>
      </div>
    </Link>
  );
};
