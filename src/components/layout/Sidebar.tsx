import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Music, Users, ListMusic, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import useSpotifyProfile from '@/hooks/useSpotifyProfile';

const navItems = [
  { icon: Home, label: 'Dashboard', path: '/home' },
  { icon: Music, label: 'Top Músicas', path: '/top/tracks' },
  { icon: Users, label: 'Top Artistas', path: '/top/artists' },
  { icon: BarChart3, label: 'Gêneros', path: '/genres' },
  { icon: ListMusic, label: 'Playlists', path: '/playlists' },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { user } = useSpotifyProfile();

  return (
    <aside className='fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border'>
      <div className='flex h-full flex-col'>
        {/* Logo */}
        <div className='flex items-center gap-3 p-6'>
          <div className='flex h-10 w-10 items-center justify-center rounded-full gradient-spotify'>
            <Music className='h-5 w-5 text-primary-foreground' />
          </div>
          <span className='text-xl font-bold text-foreground'>Spotify Stats</span>
        </div>

        {/* Navigation */}
        <nav className='flex-1 space-y-1 px-3'>
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-surface-hover hover:text-foreground',
                )}
                prefetch={true}
              >
                <item.icon className={cn('h-5 w-5', isActive && 'text-primary')} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className='border-t border-sidebar-border p-4'>
          {user ? (
            <div className='flex items-center gap-3'>
              {user.images?.[0]?.url ? (
                <img
                  src={user.images[0].url}
                  alt={user.display_name}
                  className='h-10 w-10 rounded-full object-cover'
                />
              ) : (
                <div className='h-10 w-10 rounded-full bg-surface-elevated flex items-center justify-center'>
                  <Users className='h-5 w-5 text-muted-foreground' />
                </div>
              )}
              <div className='overflow-hidden'>
                <p className='truncate text-sm font-medium text-foreground'>{user.display_name}</p>
              </div>
            </div>
          ) : (
            <div className='flex items-center gap-3 animate-pulse'>
              <div className='h-10 w-10 rounded-full bg-surface-elevated' />
              <div className='space-y-2'>
                <div className='h-3 w-20 rounded bg-surface-elevated' />
                <div className='h-2 w-16 rounded bg-surface-elevated' />
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
