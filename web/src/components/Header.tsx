import classNames from 'classnames';
import { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';
import useSpotify from '../hooks/useSpotify';
import Loading from './Loading';
import { Player } from './Player';

export default function Header() {
  const { user, currentlyPlaying } = useSpotify();
  const { logout } = useContext(UserContext);
  const [loadingButton, setLoadingButton] = useState(false);

  return (
    <header
      className={classNames(
        'px-6 flex items-center gap-4 py-20 animate-hideToShow md:flex-col md:gap-6 md:py-10',
        {
          'justify-around': currentlyPlaying,
          'justify-center': !currentlyPlaying,
        },
      )}
    >
      {user && (
        <>
          <div className='flex items-center gap-5 md:flex-col'>
            <img
              className='rounded-full w-[200px] h-[200px] md:w-[100px] md:h-[100px]'
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
        </>
      )}
    </header>
  );
}
