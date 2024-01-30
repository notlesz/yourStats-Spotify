'use client';

import { UserContext } from '@/context/userContext';
import useMediaQuery from '@/hooks/useMediaQuery';
import useSpotifyPlayingNow from '@/hooks/useSpotifyPlayingNow';
import tsx from '@/utils/tsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext, useState } from 'react';
import { MdClose, MdMenu } from 'react-icons/md';
import { Player } from './';
import Loading from './Loading';

export default function Header() {
  const { logout, user } = useContext(UserContext);
  const { currentlyPlaying } = useSpotifyPlayingNow();

  const [showMenu, setShowMenu] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  const matches = useMediaQuery('(max-width:768px)');
  const pathname = usePathname();

  const handleShowMenu = () => setShowMenu(!showMenu);

  return (
    <header className='bg-gray-600 pb-8'>
      <div className='max-w-[1350px] mx-auto my-0 px-4'>
        <nav className='flex justify-between items-center mb-4'>
          <Link href='/home'>
            <img src='../logo.png' alt='Logo' className='md:w-[180px] w-[260px]' />
          </Link>
          {matches ? (
            <div>
              <button
                type='button'
                className='flex items-center p-2 text-sm relative text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 '
                onClick={handleShowMenu}
              >
                {showMenu ? (
                  <MdClose className='w-[30px] h-[30px] text-white' />
                ) : (
                  <MdMenu className='w-[30px] h-[30px] text-white' />
                )}
              </button>
              {showMenu && (
                <ul className='flex flex-col text-lg items-center gap-3 w-full mb-4 bg-gray-600 absolute right-0 mt-2 py-4'>
                  <li>
                    <Link
                      href='/home'
                      className={tsx('text-white font-semibold hover:text-green-500', {
                        'text-green-500': pathname === '/home',
                      })}
                      onClick={handleShowMenu}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/top/artists'
                      className={tsx('text-white font-semibold hover:text-green-600', {
                        'text-green-500': pathname === '/top/artists',
                      })}
                      onClick={handleShowMenu}
                    >
                      Top Artists
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/top/tracks'
                      className={tsx('text-white font-semibold hover:text-green-600', {
                        'text-green-500': pathname === '/top/tracks',
                      })}
                      onClick={handleShowMenu}
                    >
                      Top Tracks
                    </Link>
                  </li>
                  <li>
                    <Link
                      href='/playlists/all'
                      className={tsx('text-white font-semibold hover:text-green-600', {
                        'text-green-500': pathname === '/playlists/all',
                      })}
                      onClick={handleShowMenu}
                    >
                      Playlists
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <ul className='flex gap-3 text-lg'>
              <li>
                <Link
                  href='/home'
                  className={tsx('text-white font-semibold hover:text-green-500', {
                    'text-green-500': pathname === '/home',
                  })}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href='/top/artists'
                  className={tsx('text-white font-semibold hover:text-green-600', {
                    'text-green-500': pathname === '/top/artists',
                  })}
                >
                  Top Artists
                </Link>
              </li>
              <li>
                <Link
                  href='/top/tracks'
                  className={tsx('text-white font-semibold hover:text-green-600', {
                    'text-green-500': pathname === '/top/tracks',
                  })}
                >
                  Top Tracks
                </Link>
              </li>
              <li>
                <Link
                  href='/playlists/all'
                  className={tsx('text-white font-semibold hover:text-green-600', {
                    'text-green-500': pathname === '/playlists/all',
                  })}
                >
                  Playlists
                </Link>
              </li>
            </ul>
          )}
        </nav>

        {user && (
          <div className='flex justify-between items-center mb-4 md:flex-col md:gap-8'>
            <div className='flex items-center gap-5 md:flex-col'>
              <img
                className='rounded-full w-[130px] h-[130px] md:w-[100px] md:h-[100px]'
                src={user.images[0].url}
                alt={user.display_name}
              />
              <div className='flex flex-col gap-1 items-start md:items-center md:gap-3'>
                <a
                  className='text-white text-2xl font-bold hover:text-slate-400 transition-colors md:text-center md:text-xl'
                  href={user.external_urls.spotify}
                  target={'_blank'}
                >
                  {user.display_name}
                </a>
                <span className='text-neutral-100 text-base font-bold'>
                  Followers: {user.followers.total}
                </span>
                {!loadingButton ? (
                  <button
                    type='button'
                    onClick={() => {
                      setLoadingButton(true);
                      logout();
                    }}
                    className='bg-green-600 py-1 px-3 rounded text-neutral-100 font-medium'
                  >
                    Sign Out
                  </button>
                ) : (
                  <Loading size='small' />
                )}
              </div>
            </div>
            {currentlyPlaying ? <Player /> : null}
          </div>
        )}
      </div>
    </header>
  );
}
