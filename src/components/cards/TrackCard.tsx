import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrackCardProps {
  track: any;
  rank: number;
  delay?: number;
}

const formatDuration = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
};

export const TrackCard = ({ track, rank, delay = 0 }: TrackCardProps) => {
  const imageUrl = track.album?.images?.[0]?.url || '/placeholder.png'; // Fallback
  const artistName = track.artists?.map((a: any) => a.name).join(', ') || 'Unknown Artist';
  const albumName = track.album?.name || 'Unknown Album';
  const duration = track.duration_ms ? formatDuration(track.duration_ms) : '--:--';

  return (
    <div
      className={cn(
        'group flex items-center gap-4 rounded-lg bg-card p-3 transition-all duration-300 hover:bg-surface-hover animate-slide-up',
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className='w-6 text-center text-lg font-bold text-muted-foreground'>{rank}</span>

      <div className='relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md'>
        <img
          src={imageUrl}
          alt={albumName}
          className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-110'
        />
        <div className='absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
          <Play className='h-6 w-6 text-primary fill-primary' />
        </div>
      </div>

      <div className='min-w-0 flex-1'>
        <p className='truncate font-medium text-foreground'>{track.name}</p>
        <p className='truncate text-sm text-muted-foreground'>{artistName}</p>
      </div>

      <div className='hidden items-center gap-6 sm:flex'>
        <span className='text-sm text-muted-foreground max-w-[200px] truncate'>{albumName}</span>
        <span className='text-sm text-muted-foreground'>{duration}</span>
      </div>

      <div className='text-right'>
        {/* Play count is not available in standard Spotify Web API "Top Tracks" endpoint, usually requires "recently played" or scrapping. Mock had it. We can show popularity or omit. Showing popularity for now or blank. */}
        <p className='text-sm font-medium text-primary'>
          {track.popularity ? `${track.popularity}%` : ''}
        </p>
        <p className='text-xs text-muted-foreground'>{track.popularity ? 'popularity' : ''}</p>
      </div>
    </div>
  );
};
