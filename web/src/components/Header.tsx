import classNames from 'classnames';
import { useContext, useState } from 'react';
import { MdMenu } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import useMediaQuery from '../hooks/useMediaQuery';
import useSpotify from '../hooks/useSpotify';
import Loading from './Loading';
import { Player } from './Player';

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const { logout } = useContext(UserContext);

  const { user, currentlyPlaying } = useSpotify();

  const matches = useMediaQuery('(max-width:768px)');
  const location = useLocation();

  return (
    <header className='bg-gray-600 pb-8 mb-12'>
      <div className='max-w-[1350px] mx-auto my-0 px-4'>
        <nav className='flex justify-between items-center mb-4'>
          <Link to='/home'>
            <img src='../logo.png' alt='Logo' className='md:w-[180px] w-[260px]' />
          </Link>
          {matches ? (
            <div>
              <button
                type='button'
                className='flex items-center p-2 text-sm relative text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 '
                onClick={() => setShowMenu(!showMenu)}
              >
                <MdMenu className='w-[30px] h-[30px] text-white' />
              </button>
              {showMenu && (
                <ul className='flex flex-col items-center gap-3 w-full mb-4 bg-gray-600 absolute right-0 mt-2 py-4'>
                  <li>
                    <Link
                      to='/home'
                      className={classNames('text-white font-semibold hover:text-green-500', {
                        'text-green-500': location.pathname === '/home',
                      })}
                      onClick={() => setShowMenu(!showMenu)}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/top/artists'
                      className={classNames('text-white font-semibold hover:text-green-600', {
                        'text-green-500': location.pathname === '/top/artists',
                      })}
                      onClick={() => setShowMenu(!showMenu)}
                    >
                      Top Artists
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/top/tracks'
                      className={classNames('text-white font-semibold hover:text-green-600', {
                        'text-green-500': location.pathname === '/top/tracks',
                      })}
                      onClick={() => setShowMenu(!showMenu)}
                    >
                      Top Tracks
                    </Link>
                  </li>
                  <li>
                    <Link
                      to='/playlists/all'
                      className={classNames('text-white font-semibold hover:text-green-600', {
                        'text-green-500': location.pathname === '/playlists/all',
                      })}
                      onClick={() => setShowMenu(!showMenu)}
                    >
                      Playlists
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <ul className='flex gap-3'>
              <li>
                <Link
                  to='/home'
                  className={classNames('text-white font-semibold hover:text-green-500', {
                    'text-green-500': location.pathname === '/home',
                  })}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to='/top/artists'
                  className={classNames('text-white font-semibold hover:text-green-600', {
                    'text-green-500': location.pathname === '/top/artists',
                  })}
                >
                  Top Artists
                </Link>
              </li>
              <li>
                <Link
                  to='/top/tracks'
                  className={classNames('text-white font-semibold hover:text-green-600', {
                    'text-green-500': location.pathname === '/top/tracks',
                  })}
                >
                  Top Tracks
                </Link>
              </li>
              <li>
                <Link
                  to='/playlists/all'
                  className={classNames('text-white font-semibold hover:text-green-600', {
                    'text-green-500': location.pathname === '/playlists/all',
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
