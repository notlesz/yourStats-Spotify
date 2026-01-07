'use client';

import Image from 'next/image';
import { redirectTo } from '@/utils/document';
import { cn } from '@/utils/cn';
import { Play } from 'lucide-react';

interface TrackRowProps {
  rank: number;
  image: string;
  name: string;
  artist: string;
  album: string;
  duration?: number; // kept for compatibility if needed, though mock uses formatted string
  formattedDuration?: string; // Add this if your data source provides it
  plays?: number;
  externalUrl?: string;
  index?: number;
}

export default function TrackRow({
  rank,
  image,
  name,
  artist,
  album,
  duration,
  plays,
  externalUrl,
  index = 0,
}: TrackRowProps) {
  const formatTime = (ms?: number) => {
    if (!ms) return '-:--';
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
  };

  const delay = Math.min(index * 30, 500); // Match delay logic from example

  return (
    <div
      onClick={() => externalUrl && redirectTo(externalUrl)}
      className={cn(
        'group flex items-center gap-4 rounded-lg bg-card p-3 transition-all duration-300 hover:bg-surface-hover animate-slide-up cursor-pointer',
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className='w-6 text-center text-lg font-bold text-muted-foreground group-hover:hidden'>
        {rank}
      </span>
      <span className='hidden w-6 text-center group-hover:flex justify-center text-primary'>
        <Play className='h-5 w-5 fill-current' />
      </span>

      <div className='relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md'>
        <Image
          src={image}
          alt={name}
          fill
          className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-110'
        />
        <div className='absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
          {/* Overlay icon if needed, but the rank replace is standard spotify behavior too. 
               The example TrackCard has an overlay Play icon AND rank. Let's match example exactly. */}
          <Play className='h-6 w-6 text-primary fill-primary' />
        </div>
      </div>

      <div className='min-w-0 flex-1'>
        <p className='truncate font-medium text-foreground group-hover:text-primary transition-colors'>
          {name}
        </p>
        <p className='truncate text-sm text-muted-foreground'>{artist}</p>
      </div>

      <div className='hidden items-center gap-6 sm:flex mr-4'>
        <span className='text-sm text-muted-foreground truncate max-w-[200px]'>{album}</span>
        <span className='text-sm text-muted-foreground min-w-[40px] text-right'>
          {duration ? formatTime(duration) : '-:--'}
        </span>
      </div>

      <div className='text-right min-w-[60px]'>
        <p className='text-sm font-medium text-primary'>{plays?.toLocaleString() ?? 0}</p>
        <p className='text-xs text-muted-foreground'>plays</p>
      </div>
    </div>
  );
}
