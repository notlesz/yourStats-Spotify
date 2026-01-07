'use client';

import { useState, useContext, useEffect } from 'react';
import { TrackCard } from '@/components/cards/TrackCard';
import { TimeRangeTabs } from '@/components/ui/time-range-tabs';
import { useSpotifyStore, TimeRange } from '@/store/useSpotifyStore';
import useSpotifyTracks from '@/hooks/useSpotifyTracks';

interface TopTracksViewProps {
  initialTracks?: any[];
}

export default function TopTracksView({ initialTracks }: TopTracksViewProps) {
  const timeRangeTracks = useSpotifyStore((state) => state.timeRangeTracks);
  const { handleTimeRange } = useSpotifyStore((state) => state.actions);

  const [localTimeRange, setLocalTimeRange] = useState<string>('6months');

  // Sync local state to context (similar to DashboardView)
  useEffect(() => {
    let contextValue: TimeRange = 'medium_term';
    if (localTimeRange === '1month') contextValue = 'short_term';
    if (localTimeRange === '6months') contextValue = 'medium_term';
    if (localTimeRange === 'year') contextValue = 'long_term';

    // Only update if changed to avoid loop
    if (contextValue !== timeRangeTracks) {
      handleTimeRange('tracks', contextValue);
    }
  }, [localTimeRange, handleTimeRange, timeRangeTracks]);

  // Sync context to local state (for initial load consistency if context was already set)
  useEffect(() => {
    if (timeRangeTracks === 'short_term' && localTimeRange !== '1month')
      setLocalTimeRange('1month');
    if (timeRangeTracks === 'medium_term' && localTimeRange !== '6months')
      setLocalTimeRange('6months');
    if (timeRangeTracks === 'long_term' && localTimeRange !== 'year') setLocalTimeRange('year');
  }, [timeRangeTracks]); // Removed localTimeRange from deps to align one-way mainly? No, ideally bidirectional sync is tricky. Let's stick to local -> context as driver.

  const { tracks } = useSpotifyTracks(initialTracks);

  return (
    <div className='space-y-8 p-8'>
      {/* Header */}
      <div className='gradient-hero -mx-8 -mt-8 px-8 pb-12 pt-8'>
        <h1 className='text-4xl font-bold text-foreground animate-fade-in'>Top Músicas</h1>
        <p
          className='mt-2 text-lg text-muted-foreground animate-fade-in'
          style={{ animationDelay: '100ms' }}
        >
          Suas músicas mais ouvidas
        </p>
      </div>

      {/* Time Range Selector */}
      <div className='flex items-center justify-between'>
        <p className='text-muted-foreground'>Mostrando {tracks?.length || 0} músicas</p>
        <TimeRangeTabs value={localTimeRange} onChange={setLocalTimeRange} />
      </div>

      {/* Tracks List */}
      <div className='space-y-2'>
        {tracks?.map((track, index) => (
          <TrackCard
            key={track.id}
            track={track}
            rank={index + 1}
            delay={Math.min(index * 30, 500)}
          />
        ))}
      </div>
    </div>
  );
}
