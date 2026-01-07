import { cn } from '@/lib/utils';

interface ArtistCardProps {
  artist: any;
  rank: number;
  delay?: number;
}

const formatFollowers = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + 'K';
  }
  return num.toString();
};

export const ArtistCard = ({ artist, rank, delay = 0 }: ArtistCardProps) => {
  const imageUrl = artist.images?.[0]?.url || '/placeholder.png'; // Fallback
  const followers = artist.followers?.total || 0;

  return (
    <div
      className={cn(
        'group flex items-center gap-4 rounded-lg bg-card p-4 transition-all duration-300 hover:bg-surface-hover animate-slide-up',
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className='w-6 text-center text-lg font-bold text-muted-foreground'>{rank}</span>

      <div className='relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full'>
        <img
          src={imageUrl}
          alt={artist.name}
          className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-110'
        />
      </div>

      <div className='min-w-0 flex-1'>
        <p className='truncate font-semibold text-foreground'>{artist.name}</p>
        <div className='mt-1 flex flex-wrap gap-1'>
          {artist.genres?.slice(0, 2).map((genre: string) => (
            <span
              key={genre}
              className='rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary'
            >
              {genre}
            </span>
          ))}
        </div>
      </div>

      <div className='text-right'>
        <p className='text-sm font-medium text-foreground'>{formatFollowers(followers)}</p>
        <p className='text-xs text-muted-foreground'>seguidores</p>
      </div>

      <div className='hidden w-20 sm:block'>
        <div className='flex items-center gap-2'>
          <div className='h-2 flex-1 overflow-hidden rounded-full bg-secondary'>
            <div
              className='h-full rounded-full bg-primary transition-all duration-500'
              style={{ width: `${artist.popularity}%` }}
            />
          </div>
          <span className='text-xs text-muted-foreground'>{artist.popularity}</span>
        </div>
      </div>
    </div>
  );
};
