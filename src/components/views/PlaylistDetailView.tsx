'use client';

import Link from 'next/link';
import { ArrowLeft, Clock, Play } from 'lucide-react';
import { TrackCard } from '@/components/cards/TrackCard';

interface PlaylistDetailViewProps {
  playlist: any;
}

export default function PlaylistDetailView({ playlist }: PlaylistDetailViewProps) {
  if (!playlist) {
    return (
      <div className='flex min-h-[60vh] flex-col items-center justify-center p-8'>
        <h1 className='mt-4 text-2xl font-bold text-foreground'>Playlist não encontrada</h1>
        <Link
          href='/playlists'
          className='mt-4 flex items-center gap-2 text-primary hover:underline'
        >
          <ArrowLeft className='h-4 w-4' />
          Voltar às playlists
        </Link>
      </div>
    );
  }

  // Map Spotify API track structure to TrackCard expected structure
  // Spotify API: playlist.tracks.items[i].track
  // TrackCard expects: track object directly
  const tracks = playlist.tracks?.items?.map((item: any) => item.track).filter(Boolean) || [];

  return (
    <div className='space-y-8 p-8'>
      {/* Back Button */}
      <Link
        href='/playlists'
        className='inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors'
      >
        <ArrowLeft className='h-4 w-4' />
        Voltar às playlists
      </Link>

      {/* Header */}
      <div className='flex flex-col gap-6 lg:flex-row lg:items-end'>
        <div className='relative h-56 w-56 flex-shrink-0 overflow-hidden rounded-xl shadow-card animate-fade-in'>
          {playlist.images?.[0]?.url ? (
            <img
              src={playlist.images[0].url}
              alt={playlist.name}
              className='h-full w-full object-cover'
            />
          ) : (
            <div className='h-full w-full bg-secondary flex items-center justify-center text-muted-foreground'>
              No Image
            </div>
          )}

          <div className='absolute inset-0 flex items-center justify-center bg-background/40 opacity-0 transition-opacity duration-200 hover:opacity-100'>
            <button className='flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg transition-transform duration-200 hover:scale-105 animate-pulse-glow'>
              <Play className='h-6 w-6 text-primary-foreground fill-primary-foreground ml-0.5' />
            </button>
          </div>
        </div>

        <div className='animate-slide-up'>
          <p className='text-sm font-medium uppercase text-muted-foreground'>Playlist</p>
          <h1 className='mt-2 text-4xl font-bold text-foreground lg:text-5xl'>{playlist.name}</h1>
          <p className='mt-2 text-lg text-muted-foreground'>{playlist.description}</p>
          <div className='mt-4 flex items-center gap-4 text-sm text-muted-foreground'>
            <span className='font-medium text-foreground'>{playlist.owner?.display_name}</span>
            <span>•</span>
            <span>{playlist.tracks?.total} músicas</span>
            {/* <span>•</span>
              <div className='flex items-center gap-1'>
                <Clock className='h-4 w-4' />
                <span>~{Math.floor(playlist.tracks?.total * 3.5)} min</span>
              </div> */}
          </div>
        </div>
      </div>

      {/* Play Button */}
      <button className='inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all duration-200 hover:scale-105 hover:bg-spotify-green-hover'>
        <Play className='h-5 w-5 fill-current' />
        Reproduzir
      </button>

      {/* Tracks */}
      <div className='space-y-2'>
        <div className='mb-4 grid grid-cols-[auto_1fr_auto] gap-4 border-b border-border px-4 pb-2 text-sm font-medium text-muted-foreground'>
          <span className='w-6 text-center'>#</span>
          <span>Título</span>
          <span>Duração</span>
        </div>
        {tracks.map((track: any, index: number) => (
          <TrackCard key={track.id} track={track} rank={index + 1} delay={index * 50} />
        ))}
      </div>
    </div>
  );
}
