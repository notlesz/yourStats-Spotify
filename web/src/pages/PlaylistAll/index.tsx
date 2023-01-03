import classNames from 'classnames';
import { useContext, useState } from 'react';
import { FaSpotify } from 'react-icons/fa';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import { UserContext } from '../../context/userContext';
import useSpotify from '../../hooks/useSpotify';

type FilterProps = 'all' | 'me' | 'others';

export default function PlaylistAll() {
  const [loadingButton, setLoadingButton] = useState(false);
  const [filter, setFilter] = useState<FilterProps>('all');
  const { playlist: allPlaylists, user } = useSpotify();
  const { logout } = useContext(UserContext);

  const navigate = useNavigate();

  const filteredAllPlaylists = allPlaylists?.filter((playlist) => {
    switch (filter) {
      case 'all':
        return playlist;
      case 'me':
        return playlist.owner.id === user?.id;
      case 'others':
        return playlist.owner.id !== user?.id;
      default:
        return playlist;
    }
  });

  return (
    <div className='w-full min-h-screen'>
      <div className='max-w-[1350px] mx-auto my-0 flex flex-col justify-center gap-[30px]'>
        <header
          className={`px-6 flex items-center gap-4 pt-20 pb-10 animate-hideToShow sm:flex-col sm:gap-6`}
        >
          {user && (
            <div className='flex items-center gap-5 sm:flex-col'>
              <img
                className='rounded-full w-[200px] h-[200px] sm:w-[100px] sm:h-[100px] object-cover'
                src={user.images[0].url}
                alt={user.display_name}
              />
              <div className='flex flex-col gap-1 items-start sm:items-center sm:gap-3'>
                <a
                  className='text-white text-2xl font-bold hover:text-slate-400 transition-colors sm:text-center sm:text-xl'
                  href={user.external_urls.spotify}
                  target={'_blank'}
                >
                  {user.display_name}
                </a>
                <span className='text-neutral-100 text-base font-bold'>
                  Followers: {user.followers.total}
                </span>
                <div>
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
            </div>
          )}
        </header>
        <main className='mb-8 animate-leftToShow'>
          <h4 className='text-center text-white text-3xl font-russoOne'>Public Playlists</h4>
          <div className='flex items-center justify-between mb-8'>
            <button
              className='flex items-center gap-2 text-white text-lg font-bold hover:text-green-600'
              onClick={() => navigate('/home')}
            >
              <IoMdArrowRoundBack />
              Back
            </button>
            <div className='flex gap-3'>
              <span
                className={classNames(
                  'cursor-pointer text-white text-sm font-bold py-[5px] px-[10px] flex items-center justify-center rounded border border-white hover:text-black hover:bg-white transition-colors',
                  {
                    'bg-white text-black': filter === 'all',
                  },
                )}
                onClick={() => {
                  setFilter('all');
                }}
              >
                All
              </span>
              <span
                className={classNames(
                  'cursor-pointer text-white text-sm font-bold py-[5px] px-[10px] flex items-center justify-center rounded border border-white hover:text-black hover:bg-white transition-colors',
                  {
                    'bg-white text-black': filter === 'me',
                  },
                )}
                onClick={() => {
                  setFilter('me');
                }}
              >
                Me
              </span>
              <span
                className={classNames(
                  'cursor-pointer text-white text-sm font-bold py-[5px] px-[10px] flex items-center justify-center rounded border border-white hover:text-black hover:bg-white transition-colors',
                  {
                    'bg-white text-black': filter === 'others',
                  },
                )}
                onClick={() => {
                  setFilter('others');
                }}
              >
                Others
              </span>
            </div>
          </div>
          <section className='flex flex-col w-full rounded bg-gray-600 py-8 px-8 gap-8'>
            {filteredAllPlaylists?.map((playlist, index) => (
              <>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-6'>
                    <span className='text-white font-semibold'>
                      {index + 1} <strong>#</strong>
                    </span>
                    <img
                      src={playlist.images[0].url}
                      alt=''
                      className='w-[80px] h-[80px] rounded-md object-cover'
                    />
                    <p className='text-white font-semibold'>{playlist.name}</p>
                  </div>
                  <button
                    type='button'
                    className='font-bold flex items-center gap-2 text-sm text-green-600 px-3 py-2 cursor-pointer hover:text-green-800'
                    onClick={() => {
                      window.open(playlist.external_urls.spotify, '__blank');
                    }}
                  >
                    <FaSpotify className='w-5 h-5 sm:w-4 sm:h-4' />
                    Open in Spotify
                  </button>
                </div>
                {index + 1 === filteredAllPlaylists.length ? null : (
                  <hr className='border-gray-450' />
                )}
              </>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}
