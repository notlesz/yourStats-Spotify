import { Fragment, useContext, useMemo, useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { IoEyeSharp } from 'react-icons/io5';
import { MdLibraryMusic } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '../../hooks/useMediaQuery';
import useSpotifyPlaylists from '../../hooks/useSpotifyPlaylists';
import { UserContext } from '../../context/userContext';
import { Filter, Loading } from '../../components';
import { SpotifyContext } from '../../context/spotifyContext';

export default function PlaylistAll() {
  const { user } = useContext(UserContext);

  const { playlistFilter } = useContext(SpotifyContext);

  const { playlists, isFetching } = useSpotifyPlaylists();

  const navigate = useNavigate();
  const matches = useMediaQuery('(max-width:580px)');

  const filteredPlaylists = useMemo(
    () =>
      playlists?.filter((playlist) => {
        switch (playlistFilter) {
          case 'all':
            return playlist;
          case 'me':
            return playlist.owner.id === user?.id;
          case 'others':
            return playlist.owner.id !== user?.id;
          default:
            return playlist;
        }
      }),
    [playlistFilter],
  );

  const handleNavigate = (route: string) => navigate(route);

  return (
    <div className='animate-leftToShow px-4 my-20 md:my-10'>
      <h4 className='text-center text-white font-bold text-4xl md:text-2xl mb-8'>
        Public Playlists
      </h4>
      <div className='flex items-center justify-between mb-8'>
        <button
          className='flex items-center gap-2 text-white text-lg font-bold hover:text-green-600'
          onClick={() => handleNavigate('/home')}
        >
          <IoMdArrowRoundBack />
          Back
        </button>
        <Filter typeContent='playlist' />
      </div>
      <section className='flex flex-col w-full rounded bg-gray-600 p-8 gap-8 md:p-4 md:gap-4'>
        {isFetching ? (
          <div className='w-full h-[600px] flex justify-center items-center m-auto'>
            <Loading size='medium' />
          </div>
        ) : (
          filteredPlaylists?.map((playlist, index) => (
            <Fragment key={playlist.id}>
              <div className='flex items-center justify-between gap-2 animate-hideToShow'>
                <div className='flex items-center gap-6 md:gap-3'>
                  <span className='text-white font-semibold md:text-xs flex gap-1'>
                    {index + 1} <strong>#</strong>
                  </span>
                  {playlist.images.length > 0 ? (
                    <img
                      src={playlist.images[0].url}
                      alt={playlist.name}
                      className='w-[80px] h-[80px] rounded-md object-cover md:w-[60px] md:h-[60px] xs:w-[40px] xs:h-[40px]'
                    />
                  ) : (
                    <div className='w-[80px] h-[80px] rounded-md md:w-[60px] md:h-[60px] xs:w-[40px] xs:h-[40px] bg-black flex justify-center items-center'>
                      <MdLibraryMusic className='w-6 h-6 text-white' />
                    </div>
                  )}

                  <p className='text-white font-semibold md:text-sm max-w-sm xs:max-w-[90px] md:max-w-[200px] text-ellipsis whitespace-nowrap overflow-hidden '>
                    {playlist.name}
                  </p>
                </div>
                <button
                  type='button'
                  className='font-bold flex items-center gap-2 text-sm text-green-600 px-3 py-2 cursor-pointer hover:text-green-800 md:text-xs'
                  onClick={() => {
                    handleNavigate(`/playlists/${playlist.id}`);
                  }}
                >
                  <IoEyeSharp className='w-6 h-6' />
                  {!matches && 'View'}
                </button>
              </div>
              {index + 1 === filteredPlaylists.length ? null : <hr className='border-gray-450' />}
            </Fragment>
          ))
        )}
      </section>
    </div>
  );
}
