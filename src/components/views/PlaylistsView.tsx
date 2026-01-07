'use client';

import { PlaylistCard } from '@/components/cards/PlaylistCard';
import { ListMusic } from 'lucide-react';

interface PlaylistsViewProps {
  playlists: any[];
}

export default function PlaylistsView({ playlists = [] }: PlaylistsViewProps) {
  const totalTracks = playlists.reduce(
    (acc: number, p: any) => acc + (p.tracks?.total || p.trackCount || 0),
    0,
  );
  const playlistCount = playlists.length;

  return (
    <div className='space-y-8 p-8'>
      {/* Header */}
      <div className='gradient-hero -mx-8 -mt-8 px-8 pb-12 pt-8'>
        <h1 className='text-4xl font-bold text-foreground animate-fade-in'>Suas Playlists</h1>
        <p
          className='mt-2 text-lg text-muted-foreground animate-fade-in'
          style={{ animationDelay: '100ms' }}
        >
          {playlistCount} playlists · {totalTracks} músicas no total
        </p>
      </div>

      {/* Stats */}
      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2'>
          <ListMusic className='h-5 w-5 text-primary' />
          <span className='font-medium text-foreground'>{playlistCount} Playlists</span>
        </div>
      </div>

      {/* Playlists Grid */}
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {playlists.map((playlist: any, index: number) => (
          <PlaylistCard key={playlist.id} playlist={playlist} delay={index * 100} />
        ))}
      </div>
    </div>
  );
}
