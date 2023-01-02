import { useContext, useState } from 'react';
import Artists from '../../components/Artists';
import Loading from '../../components/Loading';
import { Player } from '../../components/Player';
import Playlists from '../../components/Playlists';
import Tracks from '../../components/Tracks';
import { UserContext } from '../../context/userContext';
import useSpotify from '../../hooks/useSpotify';

export default function Home() {
  const {
    user,
    isFetchingArtists,
    isFetchingCurrently,
    isFetchingPlaylist,
    isFetchingTracks,
    currentlyPlaying,
  } = useSpotify();
  const { logout } = useContext(UserContext);
  const [loadingButton, setLoadingButton] = useState(false);

  return (
    <div className='w-full min-h-screen'>
      {isFetchingArtists && isFetchingCurrently && isFetchingPlaylist && isFetchingTracks ? (
        <div className='h-screen w-screen flex justify-center items-center'>
          <Loading />
        </div>
      ) : (
        <div className='max-w-[1350px] mx-auto my-0 flex flex-col justify-center gap-[30px]'>
          <header
            className={`px-6 flex ${
              currentlyPlaying ? 'justify-around' : 'justify-center'
            } items-center gap-4 py-20 animate-hideToShow sm:flex-col sm:gap-6`}
          >
            {user && (
              <>
                <div className='flex items-center gap-5 sm:flex-col'>
                  <img
                    className={`rounded-full w-[200px] h-[200px] sm:w-[100px] sm:h-[100px]`}
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
          <main className='flex flex-col gap-14 mb-10 px-4 '>
            <Tracks />
            <Artists />
            <Playlists />
          </main>
        </div>
      )}
    </div>
  );
}
