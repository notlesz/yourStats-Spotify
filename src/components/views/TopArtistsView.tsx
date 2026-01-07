'use client';

import { useState, useContext, useEffect } from 'react';
import { ArtistCard } from '@/components/cards/ArtistCard';
import { TimeRangeTabs } from '@/components/ui/time-range-tabs';
import { useSpotifyStore, TimeRange } from '@/store/useSpotifyStore';
import useSpotifyArtists from '@/hooks/useSpotifyArtists';

interface TopArtistsViewProps {
  initialArtists?: any[];
}

export default function TopArtistsView({ initialArtists }: TopArtistsViewProps) {
  const timeRangeArtists = useSpotifyStore((state) => state.timeRangeArtists);
  const { handleTimeRange } = useSpotifyStore((state) => state.actions);

  const [localTimeRange, setLocalTimeRange] = useState<string>('6months');

  // Sync local state to context
  useEffect(() => {
    let contextValue: TimeRange = 'medium_term';
    if (localTimeRange === '1month') contextValue = 'short_term';
    if (localTimeRange === '6months') contextValue = 'medium_term';
    if (localTimeRange === 'year') contextValue = 'long_term';

    if (contextValue !== timeRangeArtists) {
      handleTimeRange('artists', contextValue);
    }
  }, [localTimeRange, handleTimeRange, timeRangeArtists]);

  // Sync context to local state
  useEffect(() => {
    if (timeRangeArtists === 'short_term' && localTimeRange !== '1month')
      setLocalTimeRange('1month');
    if (timeRangeArtists === 'medium_term' && localTimeRange !== '6months')
      setLocalTimeRange('6months');
    if (timeRangeArtists === 'long_term' && localTimeRange !== 'year') setLocalTimeRange('year');
  }, [timeRangeArtists]);

  const { artists } = useSpotifyArtists(initialArtists);

  return (
    <div className='space-y-8 p-8'>
      {/* Header */}
      <div className='gradient-hero -mx-8 -mt-8 px-8 pb-12 pt-8'>
        <h1 className='text-4xl font-bold text-foreground animate-fade-in'>Top Artistas</h1>
        <p
          className='mt-2 text-lg text-muted-foreground animate-fade-in'
          style={{ animationDelay: '100ms' }}
        >
          Seus artistas mais ouvidos
        </p>
      </div>

      {/* Time Range Selector */}
      <div className='flex items-center justify-between'>
        <p className='text-muted-foreground'>Mostrando {artists?.length || 0} artistas</p>
        <TimeRangeTabs value={localTimeRange} onChange={setLocalTimeRange} />
      </div>

      {/* Artists List */}
      <div className='space-y-2'>
        {artists?.map((artist, index) => (
          <ArtistCard
            key={artist.id}
            artist={artist}
            rank={index + 1}
            delay={Math.min(index * 30, 500)}
          />
        ))}
      </div>
    </div>
  );
}
