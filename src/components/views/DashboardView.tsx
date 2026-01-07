'use client';

import { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { Clock, Music, Users, Disc3, ArrowRight } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout'; // Or verify if we need this or if the layout handles it. The Layout handles basic Sidebar. This wrapper might differ.
import { StatCard } from '@/components/cards/StatCard';
import { TrackCard } from '@/components/cards/TrackCard';
import { ArtistCard } from '@/components/cards/ArtistCard';
import { PlaylistCard } from '@/components/cards/PlaylistCard';
import { GenreChart } from '@/components/charts/GenreChart';
import { TimeRangeTabs } from '@/components/ui/time-range-tabs';
import { useSpotifyStore, TimeRange } from '@/store/useSpotifyStore';
import useSpotifyTracks from '@/hooks/useSpotifyTracks';
import useSpotifyArtists from '@/hooks/useSpotifyArtists';
import useSpotifyPlaylists from '@/hooks/useSpotifyPlaylists';
import { cn } from '@/lib/utils';
// import { topGenres } from '@/data/mockData'; // We need to calculate this

const formatMinutes = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  if (hours >= 1000) {
    return (hours / 1000).toFixed(1) + 'K hrs';
  }
  return hours.toLocaleString() + ' hrs';
};

// Helper to calculate top genre from artists
const getTopGenre = (artists: any[] = []) => {
  if (!artists.length) return 'N/A';
  const genreCounts: Record<string, number> = {};
  artists.forEach((artist) => {
    artist.genres?.forEach((genre: string) => {
      genreCounts[genre] = (genreCounts[genre] || 0) + 1;
    });
  });
  const sortedGenres = Object.entries(genreCounts).sort((a, b) => b[1] - a[1]);
  return sortedGenres[0]?.[0] || 'N/A';
};

// Helper to format genres for chart
const getGenreChartData = (artists: any[] = []) => {
  if (!artists.length) return [];
  const genreCounts: Record<string, number> = {};
  let total = 0;
  artists.forEach((artist) => {
    artist.genres?.forEach((genre: string) => {
      genreCounts[genre] = (genreCounts[genre] || 0) + 1;
      total++;
    });
  });

  return Object.entries(genreCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count], index) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value: Math.round((count / total) * 100),
      color: [
        'hsl(var(--spotify-green))',
        '#a855f7', // Purple
        '#3b82f6', // Blue
        '#f97316', // Orange
        '#eab308', // Yellow
      ][index % 5],
    }));
};

interface DashboardViewProps {
  initialTracks?: any[];
  initialArtists?: any[];
  initialPlaylists?: any[]; // Note: Playlists hook might not support initialData in the same way, but let's check.
}

export default function DashboardView({
  initialTracks,
  initialArtists,
  initialPlaylists,
}: DashboardViewProps) {
  const timeRangeTracks = useSpotifyStore((state) => state.timeRangeTracks);
  const { handleTimeRange } = useSpotifyStore((state) => state.actions);

  // Synced local state for the Tabs component
  // In the future, the Tabs component could accept the store values directly if refactored.
  // For now, we keep local state to control the tabs, but update store on change.
  const [localTimeRange, setLocalTimeRange] = useState<string>('6months');

  // Sync local state to store
  useEffect(() => {
    let contextValue: TimeRange = 'medium_term';
    if (localTimeRange === '1month') contextValue = 'short_term';
    if (localTimeRange === '6months') contextValue = 'medium_term';
    if (localTimeRange === 'year') contextValue = 'long_term';

    handleTimeRange('tracks', contextValue);
    handleTimeRange('artists', contextValue);
  }, [localTimeRange, handleTimeRange]);

  const { tracks } = useSpotifyTracks(initialTracks);
  const { artists } = useSpotifyArtists(initialArtists);
  const { playlists } = useSpotifyPlaylists(); // Hook doesn't seem to take initialData in the file I checked, but I can check again.

  // Stats Calculation
  const totalMinutes = tracks
    ? Math.floor(tracks.reduce((acc: number, track: any) => acc + track.duration_ms, 0) / 1000 / 60)
    : 0;
  const totalTracksCount = tracks?.length || 0;
  const totalArtistsCount = artists?.length || 0;
  const topGenre = getTopGenre(artists);
  const genreChartData = getGenreChartData(artists);

  return (
    <div className='space-y-8 p-8'>
      {/* Header */}
      <div className='gradient-hero -mx-8 -mt-8 px-8 pb-8 pt-8'>
        <h1 className='text-4xl font-bold text-foreground animate-fade-in'>Suas Estatísticas</h1>
        <p
          className='mt-2 text-lg text-muted-foreground animate-fade-in'
          style={{ animationDelay: '100ms' }}
        >
          Descubra suas músicas e artistas mais ouvidos
        </p>

        {/* Stats Grid */}
        <div className='mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          <StatCard
            icon={Clock}
            label='Tempo Total'
            value={formatMinutes(totalMinutes)} // Note: This depends on the "limit" of tracks fetched (50). Real total time needs "recently played" or full history which API doesn't give easily. Keeping "Top 50 duration" logic as per existing app.
            subtitle='de música (Top 50)'
            delay={200}
          />
          <StatCard
            icon={Music}
            label='Músicas Ouvidas'
            value={totalTracksCount.toLocaleString()}
            subtitle='faixas diferentes (Top 50)'
            delay={300}
          />
          <StatCard
            icon={Users}
            label='Artistas'
            value={totalArtistsCount}
            subtitle='artistas únicos (Top 50)'
            delay={400}
          />
          <StatCard
            icon={Disc3}
            label='Gênero Favorito'
            value={topGenre}
            subtitle='mais ouvido'
            delay={500}
          />
        </div>
      </div>

      {/* Time Range Selector */}
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold text-foreground'>Top Músicas</h2>
        <TimeRangeTabs value={localTimeRange} onChange={setLocalTimeRange} />
      </div>

      {/* Top Tracks Preview */}
      <div className='space-y-2'>
        {tracks?.slice(0, 5).map((track: any, index: number) => (
          <TrackCard key={track.id} track={track} rank={index + 1} delay={index * 50} />
        ))}
        <Link
          href='/top/tracks'
          className='mt-4 flex items-center justify-center gap-2 rounded-lg bg-secondary py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface-hover hover:text-foreground'
        >
          Ver todas as músicas
          <ArrowRight className='h-4 w-4' />
        </Link>
      </div>

      {/* Top Artists Section */}
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold text-foreground'>Top Artistas</h2>
      </div>

      <div className='space-y-2'>
        {artists?.slice(0, 5).map((artist: any, index: number) => (
          <ArtistCard key={artist.id} artist={artist} rank={index + 1} delay={index * 50} />
        ))}
        <Link
          href='/top/artists'
          className='mt-4 flex items-center justify-center gap-2 rounded-lg bg-secondary py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface-hover hover:text-foreground'
        >
          Ver todos os artistas
          <ArrowRight className='h-4 w-4' />
        </Link>
      </div>

      {/* Genres Section */}
      <div className='grid gap-8 lg:grid-cols-2'>
        <div className='rounded-xl bg-card p-6 shadow-card'>
          <h2 className='mb-6 text-xl font-bold text-foreground'>Seus Gêneros</h2>
          <GenreChart genres={genreChartData} />
          <Link
            href='/genres'
            className='mt-6 flex items-center justify-center gap-2 rounded-lg bg-secondary py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface-hover hover:text-foreground'
          >
            Ver análise completa
            <ArrowRight className='h-4 w-4' />
          </Link>
        </div>

        {/* Playlists Preview */}
        <div className='rounded-xl bg-card p-6 shadow-card'>
          <div className='mb-6 flex items-center justify-between'>
            <h2 className='text-xl font-bold text-foreground'>Suas Playlists</h2>
            <Link
              href='/playlists'
              className='flex items-center gap-1 text-sm font-medium text-primary hover:underline'
            >
              Ver todas
              <ArrowRight className='h-4 w-4' />
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            {playlists?.slice(0, 4).map((playlist: any, index: number) => (
              <PlaylistCard key={playlist.id} playlist={playlist} delay={index * 100} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
