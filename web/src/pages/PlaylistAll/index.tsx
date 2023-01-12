import { Fragment, useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { IoEyeSharp } from 'react-icons/io5';
import { MdLibraryMusic } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '../../hooks/useMediaQuery';
import useSpotify from '../../hooks/useSpotify';
import PlaylistFilter from './components/PlaylistFilter';

type FilterProps = 'all' | 'me' | 'others';

export default function PlaylistAll() {
  const [filter, setFilter] = useState<FilterProps>('all');
  const { playlist: allPlaylists, user } = useSpotify();

  const navigate = useNavigate();
  const matches = useMediaQuery('(max-width:580px)');

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
    <main className='mb-8 animate-leftToShow p-4'>
      <h4 className='text-center text-white text-3xl font-russoOne mb-8'>Public Playlists</h4>
      <div className='flex items-center justify-between mb-8'>
        <button
          className='flex items-center gap-2 text-white text-lg font-bold hover:text-green-600'
          onClick={() => navigate('/home')}
        >
          <IoMdArrowRoundBack />
          Back
        </button>
        <PlaylistFilter filter={filter} handleFilter={setFilter} />
      </div>
      <section className='flex flex-col w-full rounded bg-gray-600 p-8 gap-8 md:p-4 md:gap-4'>
        {filteredAllPlaylists?.map((playlist, index) => (
          <Fragment key={playlist.id}>
            <div className='flex items-center justify-between gap-2'>
              <div className='flex items-center gap-6 md:gap-3'>
                <span className='text-white font-semibold md:text-xs flex gap-1'>
                  {index + 1} <strong>#</strong>
                </span>
                {playlist.images.length > 0 ? (
                  <img
                    src={playlist.images[0].url}
                    alt=''
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
                  navigate(`/playlists/${playlist.id}`);
                }}
              >
                <IoEyeSharp className='w-5 h-5' />
                {!matches && 'View'}
              </button>
            </div>
            {index + 1 === filteredAllPlaylists.length ? null : <hr className='border-gray-450' />}
          </Fragment>
        ))}
      </section>
    </main>
  );
}
